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
  username: string;
  name: string;
  birthDate?: string;
}

export async function apiRegister(
  email: string,
  username: string,
  password: string,
  name: string,
  birthDate?: string
): Promise<{ ok: true; user: ApiUser } | { ok: false; error: string }> {
  if (!API_BASE) return { ok: false, error: 'API не настроен' };
  try {
    const res = await fetch(`${API_BASE}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password, name, birthDate }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok && data.user) return { ok: true, user: data.user };
    return { ok: false, error: data.error || 'Ошибка регистрации' };
  } catch (_) {
    return { ok: false, error: 'Сервер недоступен' };
  }
}

export async function apiLogin(
  login: string,
  password: string
): Promise<{ ok: true; user: ApiUser } | { ok: false; error: string }> {
  if (!API_BASE) return { ok: false, error: 'API не настроен' };
  try {
    const res = await fetch(`${API_BASE}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password }),
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

export async function apiUpdateProfile(
  id: string,
  name: string,
  birthDate?: string
): Promise<{ ok: true; user: ApiUser } | { ok: false; error: string }> {
  if (!API_BASE) return { ok: false, error: 'API не настроен' };
  try {
    const res = await fetch(`${API_BASE}/api/user/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, birthDate }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok && data.user) return { ok: true, user: data.user };
    return { ok: false, error: data.error || 'Ошибка обновления профиля' };
  } catch (_) {
    return { ok: false, error: 'Сервер недоступен' };
  }
}

export async function apiChangePassword(
  id: string,
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
): Promise<{ ok: boolean; error?: string }> {
  if (!API_BASE) return { ok: false, error: 'API не настроен' };
  try {
    const res = await fetch(`${API_BASE}/api/user/${encodeURIComponent(id)}/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) return { ok: true };
    return { ok: false, error: data.error || 'Ошибка смены пароля' };
  } catch (_) {
    return { ok: false, error: 'Сервер недоступен' };
  }
}

export function isApiEnabled(): boolean {
  return Boolean(API_BASE);
}
