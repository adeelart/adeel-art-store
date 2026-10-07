import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { getStore } from '@netlify/blobs';

const scrypt = promisify(scryptCallback);
const store = getStore({ name: 'adeel-art-private', consistency: 'strong' });
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

export function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers }
  });
}

export function requireSameOrigin(request) {
  const origin = request.headers.get('origin');
  return !origin || origin === new URL(request.url).origin;
}

export async function hashPassword(password, salt = randomBytes(16).toString('hex')) {
  const derived = await scrypt(password, salt, 64);
  return { salt, hash: Buffer.from(derived).toString('hex') };
}

export async function passwordMatches(password, credentials) {
  if (!credentials?.salt || !credentials?.hash) return false;
  const attempt = await hashPassword(password, credentials.salt);
  const expected = Buffer.from(credentials.hash, 'hex');
  const actual = Buffer.from(attempt.hash, 'hex');
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export async function getPasswordCredentials() {
  const changed = await store.get('admin/password', { type: 'json' });
  if (changed) return changed;
  const [salt, hash] = (process.env.ADMIN_PASSWORD_HASH || '').split(':');
  return salt && hash ? { salt, hash } : null;
}

export async function createSession() {
  const token = randomBytes(32).toString('base64url');
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const version = await store.get('admin/session-version', { type: 'json' }) || 0;
  await store.setJSON(`admin/session/${token}`, { expiresAt, version });
  return { token, expiresAt };
}

export async function getSession(request) {
  const token = request.headers.get('cookie')?.match(/(?:^|;\s*)adeel_admin_session=([^;]+)/)?.[1];
  if (!token) return null;
  const session = await store.get(`admin/session/${token}`, { type: 'json' });
  if (!session || session.expiresAt < Date.now()) {
    if (session) await store.delete(`admin/session/${token}`);
    return null;
  }
  const version = await store.get('admin/session-version', { type: 'json' }) || 0;
  if (session.version !== version) {
    await store.delete(`admin/session/${token}`);
    return null;
  }
  return { token, ...session };
}

export async function requireAdmin(request) {
  return getSession(request);
}

export function sessionCookie(token, request, maxAge = SESSION_TTL_MS / 1000) {
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return `adeel_admin_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${secure}`;
}

export async function destroySession(session) {
  if (session?.token) await store.delete(`admin/session/${session.token}`);
}

export { store as privateStore };
