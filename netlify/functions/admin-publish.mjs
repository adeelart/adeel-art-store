import { getSession, json, requireSameOrigin } from '../lib/security.mjs';

export const config = { path: '/api/admin/publish' };
const CONTENT_PATH = 'content/site-content.json';

async function githubRequest(path, options = {}) {
  const token = process.env.GITHUB_PUBLISH_TOKEN;
  const repository = process.env.GITHUB_REPOSITORY;
  if (!token || !repository) throw new Error('Publishing is not configured. Set GITHUB_PUBLISH_TOKEN and GITHUB_REPOSITORY in Netlify environment variables.');
  const response = await fetch(`https://api.github.com/repos/${repository}${path}`, {
    ...options,
    headers: { accept: 'application/vnd.github+json', authorization: `Bearer ${token}`, 'x-github-api-version': '2022-11-28', ...(options.headers || {}) }
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.message || `GitHub publishing request failed (${response.status}).`);
  return body;
}

export default async (request) => {
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
  if (!requireSameOrigin(request)) return json({ error: 'Request origin is not allowed.' }, 403);
  if (!await getSession(request)) return json({ error: 'Admin session expired. Log in again.' }, 401);

  let content;
  try { content = await request.json(); } catch { return json({ error: 'Invalid content JSON.' }, 400); }
  if (!Array.isArray(content.products) || !Array.isArray(content.categories) || !content.settings) return json({ error: 'Catalog, categories, or settings are missing.' }, 400);
  if (content.products.length > 500 || content.categories.length > 100 || JSON.stringify(content).length > 1_500_000) return json({ error: 'Published content exceeds the allowed size.' }, 413);
  if (content.categories.some((category) => typeof category !== 'string' || !category.trim()) || new Set(content.categories).size !== content.categories.length) {
    return json({ error: 'Categories must be non-empty and unique.' }, 400);
  }
  const productIds = new Set();
  for (const product of content.products) {
    const paymentOptions = ['COD Available', 'Online Payment Available', 'Both Available'];
    if (!product.id || productIds.has(product.id) || !product.name?.trim() || !content.categories.includes(product.category) ||
        !Number.isFinite(Number(product.originalPrice)) || Number(product.originalPrice) < 0 ||
        !Number.isFinite(Number(product.salePrice)) || Number(product.salePrice) < 0 ||
        !['In Stock', 'Out of Stock'].includes(product.availability) || !paymentOptions.includes(product.paymentAvailability) ||
        !Array.isArray(product.imageUrls) || product.imageUrls.length < 1 || product.imageUrls.length > 3 || product.imageUrls.some((url) => !/^https?:\/\//i.test(url))) {
      return json({ error: `Product "${product.name || 'unknown'}" has missing fields or an invalid image URL.` }, 400);
    }
    productIds.add(product.id);
  }

  try {
    const branch = process.env.GITHUB_BRANCH || 'main';
    const existing = await githubRequest(`/contents/${CONTENT_PATH}?ref=${encodeURIComponent(branch)}`).catch((error) => {
      if (String(error.message).includes('Not Found')) return null;
      throw error;
    });
    const now = new Date().toISOString();
    const published = { ...content, publishedAt: now, version: now };
    const serialized = `${JSON.stringify(published, null, 2)}\n`;
    const encoded = Buffer.from(serialized).toString('base64');

    if (existing?.content) {
      const previous = Buffer.from(existing.content.replace(/\n/g, ''), 'base64').toString('utf8');
      const backupPath = `content/backups/${now.replace(/[:.]/g, '-')}.json`;
      await githubRequest('/contents/' + backupPath, {
        method: 'PUT',
        body: JSON.stringify({ message: `Backup published catalog ${now}`, content: Buffer.from(previous).toString('base64'), branch })
      });
    }

    const updated = await githubRequest(`/contents/${CONTENT_PATH}`, {
      method: 'PUT',
      body: JSON.stringify({ message: `Publish ADEEL ART content ${now}`, content: encoded, branch, ...(existing?.sha ? { sha: existing.sha } : {}) })
    });
    return json({ published: true, publishedAt: now, commit: updated.commit?.sha || null });
  } catch (error) {
    return json({ error: 'Publishing failed. Your current live website is still unchanged.', detail: error.message }, 502);
  }
};
