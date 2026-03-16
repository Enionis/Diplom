/**
 * База пользователей веб-версии.
 * Хранится в localStorage (ключ mystic_web_db).
 * Зарегистрированные пользователи сохраняются между сессиями и могут входить по email и паролю.
 */

export interface StoredUser {
  id: string;
  email: string;
  username: string;
  name: string;
  birth_date?: string;
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
    username: string,
    password: string,
    name: string,
    birthDate?: string
  ): Promise<{ id: string; email: string; username: string; name: string; birthDate?: string } | null> {
    try {
      const db = getDatabase();
      const existingEmail = db.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.is_guest === 0);
      if (existingEmail) return null;
      
      const existingUsername = db.users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.is_guest === 0);
      if (existingUsername) return null;

      const passwordHash = hashPassword(password);
      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const now = new Date().toISOString();
      const newUser: StoredUser = {
        id: userId,
        email: email.trim(),
        username: username.trim(),
        name: name.trim(),
        birth_date: birthDate,
        password_hash: passwordHash,
        is_guest: 0,
        created_at: now,
        last_login: now,
      };
      db.users.push(newUser);
      saveDatabase(db);
      return { 
        id: newUser.id, 
        email: newUser.email, 
        username: newUser.username,
        name: newUser.name,
        birthDate: newUser.birth_date
      };
    } catch (_) {
      return null;
    }
  },

  /** Вход: проверяет email/username и пароль по БД, возвращает данные пользователя или null. */
  async loginUser(
    login: string,
    password: string
  ): Promise<{ id: string; email: string; username: string; name: string; birthDate?: string } | null> {
    try {
      const db = getDatabase();
      const passwordHash = hashPassword(password);
      const loginLower = login.toLowerCase();
      const user = db.users.find(
        u =>
          (u.email.toLowerCase() === loginLower || u.username.toLowerCase() === loginLower) &&
          u.password_hash === passwordHash &&
          u.is_guest === 0
      );
      if (user) {
        user.last_login = new Date().toISOString();
        saveDatabase(db);
        return { 
          id: user.id, 
          email: user.email, 
          username: user.username,
          name: user.name,
          birthDate: user.birth_date
        };
      }
      return null;
    } catch (_) {
      return null;
    }
  },

  /** Проверить, есть ли сохранённый пользователь с таким id (для валидации сессии). */
  getUserById(id: string): { id: string; email: string; username: string; name: string; birthDate?: string } | null {
    const db = getDatabase();
    const user = db.users.find(u => u.id === id && u.is_guest === 0);
    return user ? { 
      id: user.id, 
      email: user.email, 
      username: user.username,
      name: user.name,
      birthDate: user.birth_date
    } : null;
  },
};
