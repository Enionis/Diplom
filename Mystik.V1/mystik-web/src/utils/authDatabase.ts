interface User {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  is_guest: number;
  created_at: string;
  last_login: string;
}

interface DatabaseData {
  users: User[];
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

const initDatabase = (): DatabaseData => {
  if (typeof window === 'undefined') return { users: [] };
  try {
    const stored = localStorage.getItem(DB_KEY);
    if (stored) return JSON.parse(stored);
  } catch (_) {}
  return { users: [] };
};

const saveDatabase = (data: DatabaseData): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  } catch (_) {}
};

const getDatabase = (): DatabaseData => initDatabase();

export const authDatabase = {
  async registerUser(email: string, password: string, name: string): Promise<boolean> {
    try {
      const db = getDatabase();
      const existingUser = db.users.find(u => u.email === email && u.is_guest === 0);
      if (existingUser) return false;
      const passwordHash = hashPassword(password);
      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const now = new Date().toISOString();
      db.users.push({
        id: userId,
        email,
        name,
        password_hash: passwordHash,
        is_guest: 0,
        created_at: now,
        last_login: now,
      });
      saveDatabase(db);
      return true;
    } catch (_) {
      return false;
    }
  },

  async loginUser(email: string, password: string): Promise<{ id: string; email: string; name: string } | null> {
    try {
      const db = getDatabase();
      const passwordHash = hashPassword(password);
      const user = db.users.find(
        u => u.email === email && u.password_hash === passwordHash && u.is_guest === 0
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
};
