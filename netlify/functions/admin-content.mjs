import { getSession, json, requireSameOrigin } from '../lib/security.mjs';

export const config = { path: '/api/admin/content' };

export default async (request) => {
  if (request.method !== 'GET') return json({ error: 'Method not allowed.' }, 405);
  if (!requireSameOrigin(request)) return json({ error: 'Request origin is not allowed.' }, 403);
  if (!await getSession(request)) return json({ error: 'Admin session expired. Log in again.' }, 401);
  try {
    const response = await fetch(new URL('/content/site-content.json', request.url), { cache: 'no-store' });
    if (!response.ok) return json({ error: 'Published catalog could not be loaded.' }, 502);
    return json(await response.json());
  } catch {
    return json({ error: 'Published catalog could not be loaded.' }, 502);
  }
};
