/**
 * Клиент API авторизации.
 * Если задан VITE_API_URL (сервер с mystic.db), все запросы идут на сервер (БД с защитой bcrypt).
 * Иначе используется localStorage через authDatabase.
 */

const API_BASE = typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/$/, '')
  : '';

export interface ApiUser {
  id: string;
  email: string;
  name: string;
}

export async function apiRegister(
  email: string,
  password: string,
  name: string
): Promise<{ ok: true; user: ApiUser } | { ok: false; error: string }> {
  if (!API_BASE) return { ok: false, error: 'API не настроен' };
  try {
    const res = await fetch(`${API_BASE}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok && data.user) return { ok: true, user: data.user };
    return { ok: false, error: data.error || 'Ошибка регистрации' };
  } catch (_) {
    return { ok: false, error: 'Сервер недоступен' };
  }
}

export async function apiLogin(
  email: string,
  password: string
): Promise<{ ok: true; user: ApiUser } | { ok: false; error: string }> {
  if (!API_BASE) return { ok: false, error: 'API не настроен' };
  try {
    const res = await fetch(`${API_BASE}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok && data.user) return { ok: true, user: data.user };
    return { ok: false, error: data.error || 'Ошибка входа' };
  } catch (_) {
    return { ok: false, error: 'Сервер недоступен' };
  }
}

export async function apiGetUser(id: string): Promise<ApiUser | null> {
  if (!API_BASE) return null;
  try {
    const res = await fetch(`${API_BASE}/api/user/${encodeURIComponent(id)}`);
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok && data.user) return data.user;
    return null;
  } catch (_) {
    return null;
  }
}

export function isApiEnabled(): boolean {
  return Boolean(API_BASE);
}
