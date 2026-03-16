import * as SQLite from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from '../constants/api';

const DB_NAME = "mystic_local.db";

export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  birthDate?: string;
  isGuest?: boolean;
  password_hash?: string;
  created_at?: string;
  last_login?: string;
}

export interface QuizResult {
  id: string;
  userId: string;
  quizId: string;
  result: any;
  timestamp: string;
  synced: boolean;
}

export interface TarotReading {
  id: string;
  userId: string;
  spreadId: string;
  cards: any[];
  interpretation: string;
  timestamp: string;
  synced: boolean;
}

class LocalDatabase {
  private db: SQLite.SQLiteDatabase | null = null;
  private initialized = false;

  async init(): Promise<void> {
    if (this.initialized) return;

    try {
      this.db = await SQLite.openDatabaseAsync(DB_NAME);
      await this.createTables();
      this.initialized = true;
      console.log('Local database initialized successfully');
    } catch (error) {
      console.error('Error initializing local database:', error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    // Таблица пользователей
    await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE,
        name TEXT NOT NULL,
        birth_date TEXT,
        is_guest INTEGER DEFAULT 0,
        password_hash TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        last_login TEXT DEFAULT CURRENT_TIMESTAMP,
        synced INTEGER DEFAULT 0
      );
    `);

    // Таблица результатов квизов
    await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS quiz_results (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        quiz_id TEXT NOT NULL,
        result TEXT NOT NULL,
        timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
        synced INTEGER DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users (id)
      );
    `);

    // Таблица таро чтений
    await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS tarot_readings (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        spread_id TEXT NOT NULL,
        cards TEXT NOT NULL,
        interpretation TEXT NOT NULL,
        timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
        synced INTEGER DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users (id)
      );
    `);

    // Таблица для синхронизации
    await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS sync_queue (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        table_name TEXT NOT NULL,
        record_id TEXT NOT NULL,
        action TEXT NOT NULL,
        data TEXT,
        timestamp TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  // Простая хеш-функция для паролей
  private hashPassword(password: string): string {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16) + 'mystic_salt';
  }

  // Генерация UUID
  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // Регистрация пользователя
  async registerUser(email: string, password: string, name: string, username?: string, birthDate?: string): Promise<User | null> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      const userId = this.generateUUID();
      const passwordHash = this.hashPassword(password);
      const now = new Date().toISOString();

      await this.db.runAsync(`
        INSERT INTO users (id, email, username, name, birth_date, password_hash, created_at, last_login)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [userId, email, username || null, name, birthDate || null, passwordHash, now, now]);

      // Добавляем в очередь синхронизации
      await this.addToSyncQueue('users', userId, 'INSERT', {
        id: userId,
        email,
        username,
        name,
        birthDate,
        password: password // Отправляем оригинальный пароль на сервер
      });

      return {
        id: userId,
        email,
        username: username || '',
        name,
        birthDate,
        isGuest: false
      };
    } catch (error) {
      console.error('Error registering user:', error);
      return null;
    }
  }

  // Вход пользователя
  async loginUser(login: string, password: string): Promise<User | null> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      const passwordHash = this.hashPassword(password);
      const now = new Date().toISOString();

      const user = await this.db.getFirstAsync(`
        SELECT * FROM users 
        WHERE (email = ? OR username = ?) AND password_hash = ? AND is_guest = 0
      `, [login, login, passwordHash]) as any;

      if (user) {
        // Обновляем время последнего входа
        await this.db.runAsync(`
          UPDATE users SET last_login = ? WHERE id = ?
        `, [now, user.id]);

        return {
          id: user.id,
          email: user.email,
          username: user.username || '',
          name: user.name,
          birthDate: user.birth_date,
          isGuest: false
        };
      }

      return null;
    } catch (error) {
      console.error('Error logging in user:', error);
      return null;
    }
  }

  // Сохранение результата квиза
  async saveQuizResult(userId: string, quizId: string, result: any): Promise<boolean> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      const resultId = this.generateUUID();
      const now = new Date().toISOString();

      await this.db.runAsync(`
        INSERT INTO quiz_results (id, user_id, quiz_id, result, timestamp)
        VALUES (?, ?, ?, ?, ?)
      `, [resultId, userId, quizId, JSON.stringify(result), now]);

      // Добавляем в очередь синхронизации
      await this.addToSyncQueue('quiz_results', resultId, 'INSERT', {
        id: resultId,
        userId,
        quizId,
        result,
        timestamp: now
      });

      return true;
    } catch (error) {
      console.error('Error saving quiz result:', error);
      return false;
    }
  }

  // Сохранение таро чтения
  async saveTarotReading(userId: string, spreadId: string, cards: any[], interpretation: string): Promise<boolean> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      const readingId = this.generateUUID();
      const now = new Date().toISOString();

      await this.db.runAsync(`
        INSERT INTO tarot_readings (id, user_id, spread_id, cards, interpretation, timestamp)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [readingId, userId, spreadId, JSON.stringify(cards), interpretation, now]);

      // Добавляем в очередь синхронизации
      await this.addToSyncQueue('tarot_readings', readingId, 'INSERT', {
        id: readingId,
        userId,
        spreadId,
        cards,
        interpretation,
        timestamp: now
      });

      return true;
    } catch (error) {
      console.error('Error saving tarot reading:', error);
      return false;
    }
  }

  // Получение результатов квизов пользователя
  async getUserQuizResults(userId: string): Promise<QuizResult[]> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      const results = await this.db.getAllAsync(`
        SELECT * FROM quiz_results WHERE user_id = ? ORDER BY timestamp DESC
      `, [userId]) as any[];

      return results.map(row => ({
        id: row.id,
        userId: row.user_id,
        quizId: row.quiz_id,
        result: JSON.parse(row.result),
        timestamp: row.timestamp,
        synced: row.synced === 1
      }));
    } catch (error) {
      console.error('Error getting user quiz results:', error);
      return [];
    }
  }

  // Получение таро чтений пользователя
  async getUserTarotReadings(userId: string): Promise<TarotReading[]> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      const readings = await this.db.getAllAsync(`
        SELECT * FROM tarot_readings WHERE user_id = ? ORDER BY timestamp DESC
      `, [userId]) as any[];

      return readings.map(row => ({
        id: row.id,
        userId: row.user_id,
        spreadId: row.spread_id,
        cards: JSON.parse(row.cards),
        interpretation: row.interpretation,
        timestamp: row.timestamp,
        synced: row.synced === 1
      }));
    } catch (error) {
      console.error('Error getting user tarot readings:', error);
      return [];
    }
  }

  // Добавление в очередь синхронизации
  private async addToSyncQueue(tableName: string, recordId: string, action: string, data: any): Promise<void> {
    if (!this.db) return;

    try {
      await this.db.runAsync(`
        INSERT INTO sync_queue (table_name, record_id, action, data)
        VALUES (?, ?, ?, ?)
      `, [tableName, recordId, action, JSON.stringify(data)]);
    } catch (error) {
      console.error('Error adding to sync queue:', error);
    }
  }

  // Синхронизация с сервером
  async syncWithServer(): Promise<void> {
    if (!this.db) return;

    try {
      // Проверяем доступность сервера
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`${API_BASE_URL}/api/health`, {
        method: 'GET',
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.log('Server not available, skipping sync');
        return;
      }

      // Получаем все несинхронизированные записи
      const syncItems = await this.db.getAllAsync(`
        SELECT * FROM sync_queue ORDER BY timestamp ASC
      `) as any[];

      for (const item of syncItems) {
        try {
          const data = JSON.parse(item.data);
          let endpoint = '';
          let method = 'POST';

          switch (item.table_name) {
            case 'users':
              endpoint = item.action === 'INSERT' ? '/api/register' : `/api/user/${item.record_id}`;
              method = item.action === 'INSERT' ? 'POST' : 'PUT';
              break;
            case 'quiz_results':
              endpoint = '/api/quiz-result';
              break;
            case 'tarot_readings':
              endpoint = '/api/tarot-reading';
              break;
          }

          if (endpoint) {
            const syncResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
              method,
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });

            if (syncResponse.ok) {
              // Удаляем из очереди синхронизации
              await this.db.runAsync(`
                DELETE FROM sync_queue WHERE id = ?
              `, [item.id]);

              // Помечаем запись как синхронизированную
              await this.db.runAsync(`
                UPDATE ${item.table_name} SET synced = 1 WHERE id = ?
              `, [item.record_id]);

              console.log(`Synced ${item.table_name} record ${item.record_id}`);
            }
          }
        } catch (error) {
          console.error(`Error syncing item ${item.id}:`, error);
        }
      }
    } catch (error) {
      console.log('Sync failed, will retry later:', error);
    }
  }
}

export const localDatabase = new LocalDatabase();