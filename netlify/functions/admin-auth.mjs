import { createHash } from 'node:crypto';
import { createSession, destroySession, getPasswordCredentials, getSession, hashPassword, json, passwordMatches, requireSameOrigin, sessionCookie, privateStore } from '../lib/security.mjs';

export const config = { path: '/api/admin/auth' };

export default async (request, context) => {
  if (!requireSameOrigin(request)) return json({ error: 'Request origin is not allowed.' }, 403);

  if (request.method === 'POST') {
    const { password } = await request.json().catch(() => ({}));
    const credentials = await getPasswordCredentials();
    if (!credentials) return json({ error: 'Admin password is not configured. Set ADMIN_PASSWORD_HASH in Netlify environment variables.' }, 503);
    const address = context?.ip || request.headers.get('x-nf-client-connection-ip') || 'unknown';
    const attemptKey = `admin/login-attempts/${createHash('sha256').update(address).digest('hex')}`;
    const attempts = await privateStore.get(attemptKey, { type: 'json' }) || { count: 0, resetAt: Date.now() + 15 * 60 * 1000 };
    if (attempts.resetAt < Date.now()) { attempts.count = 0; attempts.resetAt = Date.now() + 15 * 60 * 1000; }
    if (attempts.count >= 8) return json({ error: 'Too many attempts. Wait 15 minutes and try again.' }, 429);
    if (typeof password !== 'string' || !(await passwordMatches(password, credentials))) {
      attempts.count += 1;
      await privateStore.setJSON(attemptKey, attempts);
      return json({ error: 'Incorrect password.' }, 401);
    }
    await privateStore.delete(attemptKey);
    const session = await createSession();
    return json({ authenticated: true, expiresAt: session.expiresAt }, 200, { 'set-cookie': sessionCookie(session.token, request) });
  }

  const session = await getSession(request);
  if (!session) return json({ authenticated: false }, 401);

  if (request.method === 'GET') return json({ authenticated: true, expiresAt: session.expiresAt });

  if (request.method === 'DELETE') {
    await destroySession(session);
    return json({ authenticated: false }, 200, { 'set-cookie': sessionCookie('', request, 0) });
  }

  if (request.method === 'PUT') {
    const { currentPassword, newPassword, confirmPassword } = await request.json().catch(() => ({}));
    const credentials = await getPasswordCredentials();
    if (!await passwordMatches(String(currentPassword || ''), credentials)) return json({ error: 'Current password is incorrect.' }, 403);
    if (typeof newPassword !== 'string' || newPassword.length < 12) return json({ error: 'Use at least 12 characters for the new password.' }, 400);
    if (newPassword !== confirmPassword) return json({ error: 'New password confirmation does not match.' }, 400);
    await privateStore.setJSON('admin/password', await hashPassword(newPassword));
    const sessionVersion = await privateStore.get('admin/session-version', { type: 'json' }) || 0;
    await privateStore.setJSON('admin/session-version', sessionVersion + 1);
    await destroySession(session);
    return json({ passwordChanged: true }, 200, { 'set-cookie': sessionCookie('', request, 0) });
  }

  return json({ error: 'Method not allowed.' }, 405, { allow: 'GET, POST, PUT, DELETE' });
};
