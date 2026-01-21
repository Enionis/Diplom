import * as SQLite from 'expo-sqlite';

const getDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  return await SQLite.openDatabaseAsync('mystic.db');
};

const hashPassword = (password: string): string => {
  // Простая хеш-функция для демонстрации
  // В реальном приложении используйте bcrypt или подобное
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Преобразование в 32-bit integer
  }
  return Math.abs(hash).toString(16) + 'mystic_salt';
};

export const authDatabase = {
  async registerUser(email: string, password: string, name: string): Promise<boolean> {
    try {
      const db = await getDatabase();
      
      // Дополнительная проверка на null
      if (!db) {
        console.error('Database is null in registerUser - cannot proceed');
        return false;
      }
      
      const passwordHash = hashPassword(password);
      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const now = new Date().toISOString();

      await db.runAsync(
        `INSERT INTO users (id, email, name, password_hash, is_guest, created_at, last_login)
         VALUES (?, ?, ?, ?, 0, ?, ?)`,
        [userId, email, name, passwordHash, now, now]
      );

      return true;
    } catch (error) {
      console.error('Error registering user:', error);
      return false;
    }
  },

  async loginUser(email: string, password: string): Promise<{ id: string; email: string; name: string } | null> {
    try {
      const db = await getDatabase();
      
      // Дополнительная проверка на null
      if (!db) {
        console.error('Database is null in loginUser - cannot proceed');
        return null;
      }
      
      const passwordHash = hashPassword(password);
      const now = new Date().toISOString();

      const result = await db.getFirstAsync<{
        id: string;
        email: string;
        name: string;
      }>(
        `SELECT id, email, name FROM users 
         WHERE email = ? AND password_hash = ? AND is_guest = 0`,
        [email, passwordHash]
      );

      if (result) {
        // Обновляем время последнего входа
        await db.runAsync(
          `UPDATE users SET last_login = ? WHERE id = ?`,
          [now, result.id]
        );
      }

      return result;
    } catch (error) {
      console.error('Error logging in user:', error);
      return null;
    }
  },

  async getUserByEmail(email: string): Promise<{ id: string; email: string; name: string } | null> {
    try {
      const db = await getDatabase();
      
      // Дополнительная проверка на null
      if (!db) {
        console.error('Database is null in getUserByEmail - cannot proceed');
        return null;
      }
      
      const result = await db.getFirstAsync<{
        id: string;
        email: string;
        name: string;
      }>(
        `SELECT id, email, name FROM users WHERE email = ? AND is_guest = 0`,
        [email]
      );

      return result;
    } catch (error) {
      console.error('Error getting user by email:', error);
      return null;
    }
  },

  async updateUserProfile(userId: string, name: string): Promise<boolean> {
    try {
      const db = await getDatabase();
      
      // Дополнительная проверка на null
      if (!db) {
        console.error('Database is null in updateUserProfile - cannot proceed');
        return false;
      }
      
      await db.runAsync(
        `UPDATE users SET name = ? WHERE id = ?`,
        [name, userId]
      );

      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  },

  async deleteUserAccount(userId: string): Promise<boolean> {
    try {
      const db = await getDatabase();
      
      // Дополнительная проверка на null
      if (!db) {
        console.error('Database is null in deleteUserAccount - cannot proceed');
        return false;
      }
      
      // Удаляем все связанные данные пользователя
      await db.runAsync(`DELETE FROM user_actions WHERE user_id = ?`, [userId]);
      await db.runAsync(`DELETE FROM users WHERE id = ?`, [userId]);

      return true;
    } catch (error) {
      console.error('Error deleting user account:', error);
      return false;
    }
  },

  async getUserStats(userId: string): Promise<{
    totalActions: number;
    registrationDate: string;
    lastLogin: string;
  } | null> {
    try {
      const db = await getDatabase();
      
      // Дополнительная проверка на null
      if (!db) {
        console.error('Database is null in getUserStats - cannot proceed');
        return null;
      }
      
      const statsResult = await db.getFirstAsync<{
        totalActions: number;
        registrationDate: string;
        lastLogin: string;
      }>(
        `SELECT 
           COUNT(*) as totalActions,
           created_at as registrationDate,
           last_login as lastLogin
         FROM users u
         LEFT JOIN user_actions ua ON u.id = ua.user_id
         WHERE u.id = ?
         GROUP BY u.id`,
        [userId]
      );

      return statsResult;
    } catch (error) {
      console.error('Error getting user stats:', error);
      return null;
    }
  }
};
