/**
 * База пользователей веб-версии.
 * Хранится в localStorage (ключ mystic_web_db).
 * Зарегистрированные пользователи сохраняются между сессиями и могут входить по email и паролю.
 */

export interface StoredUser {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  is_guest: number;
  created_at: string;
  last_login: string;
}

interface DatabaseData {
  users: StoredUser[];
}

const DB_KEY = 'mystic_web_db';

const hashPassword = (password: string): string => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16) + 'mystic_salt';
};

function getDatabase(): DatabaseData {
  if (typeof window === 'undefined') return { users: [] };
  try {
    const stored = localStorage.getItem(DB_KEY);
    if (stored) return JSON.parse(stored);
  } catch (_) {}
  return { users: [] };
}

function saveDatabase(data: DatabaseData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  } catch (_) {}
}

export const authDatabase = {
  /** Регистрация: добавляет пользователя в БД. Возвращает данные пользователя или null при ошибке (например, email уже занят). */
  async registerUser(
    email: string,
    password: string,
    name: string
  ): Promise<{ id: string; email: string; name: string } | null> {
    try {
      const db = getDatabase();
      const existingUser = db.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.is_guest === 0);
      if (existingUser) return null;

      const passwordHash = hashPassword(password);
      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const now = new Date().toISOString();
      const newUser: StoredUser = {
        id: userId,
        email: email.trim(),
        name: name.trim(),
        password_hash: passwordHash,
        is_guest: 0,
        created_at: now,
        last_login: now,
      };
      db.users.push(newUser);
      saveDatabase(db);
      return { id: newUser.id, email: newUser.email, name: newUser.name };
    } catch (_) {
      return null;
    }
  },

  /** Вход: проверяет email и пароль по БД, возвращает данные пользователя или null. */
  async loginUser(
    email: string,
    password: string
  ): Promise<{ id: string; email: string; name: string } | null> {
    try {
      const db = getDatabase();
      const passwordHash = hashPassword(password);
      const user = db.users.find(
        u =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password_hash === passwordHash &&
          u.is_guest === 0
      );
      if (user) {
        user.last_login = new Date().toISOString();
        saveDatabase(db);
        return { id: user.id, email: user.email, name: user.name };
      }
      return null;
    } catch (_) {
      return null;
    }
  },

  /** Проверить, есть ли сохранённый пользователь с таким id (для валидации сессии). */
  getUserById(id: string): { id: string; email: string; name: string } | null {
    const db = getDatabase();
    const user = db.users.find(u => u.id === id && u.is_guest === 0);
    return user ? { id: user.id, email: user.email, name: user.name } : null;
  },
};
