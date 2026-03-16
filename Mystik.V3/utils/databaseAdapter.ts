import { Platform } from 'react-native';

// Веб-совместимая база данных на основе localStorage
class WebDatabase {
  private dbKey = 'mystik_mobile_web_db';

  private getData() {
    if (typeof window === 'undefined') return {};
    try {
      const stored = localStorage.getItem(this.dbKey);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  private saveData(data: any) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(this.dbKey, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  async init() {
    console.log('Web database initialized');
  }

  async registerUser(email: string, password: string, name: string, username?: string, birthDate?: string) {
    const data = this.getData();
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const passwordHash = this.hashPassword(password);
    
    if (!data.users) data.users = [];
    
    // Проверяем существующего пользователя
    const existingUser = data.users.find((u: any) => u.email === email);
    if (existingUser) {
      return null;
    }

    const user = {
      id: userId,
      email,
      username: username || '',
      name,
      birthDate,
      isGuest: false,
      password_hash: passwordHash,
      created_at: new Date().toISOString()
    };

    data.users.push(user);
    this.saveData(data);

    return user;
  }

  async loginUser(login: string, password: string) {
    const data = this.getData();
    if (!data.users) return null;

    const passwordHash = this.hashPassword(password);
    const user = data.users.find((u: any) => 
      (u.email === login || u.username === login) && u.password_hash === passwordHash
    );

    return user ? {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      birthDate: user.birthDate,
      isGuest: false
    } : null;
  }

  async saveQuizResult(userId: string, quizId: string, result: any) {
    const data = this.getData();
    if (!data.quizResults) data.quizResults = [];

    data.quizResults.push({
      id: `quiz_${Date.now()}`,
      userId,
      quizId,
      result,
      timestamp: new Date().toISOString()
    });

    this.saveData(data);
    return true;
  }

  async saveTarotReading(userId: string, spreadId: string, cards: any[], interpretation: string) {
    const data = this.getData();
    if (!data.tarotReadings) data.tarotReadings = [];

    data.tarotReadings.push({
      id: `tarot_${Date.now()}`,
      userId,
      spreadId,
      cards,
      interpretation,
      timestamp: new Date().toISOString()
    });

    this.saveData(data);
    return true;
  }

  async getUserQuizResults(userId: string) {
    const data = this.getData();
    if (!data.quizResults) return [];

    return data.quizResults.filter((r: any) => r.userId === userId);
  }

  async getUserTarotReadings(userId: string) {
    const data = this.getData();
    if (!data.tarotReadings) return [];

    return data.tarotReadings.filter((r: any) => r.userId === userId);
  }

  async syncWithServer() {
    console.log('Web sync - not implemented yet');
  }

  private hashPassword(password: string): string {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16) + 'mystic_salt';
  }
}

// Адаптер базы данных
class DatabaseAdapter {
  private database: any;

  async init() {
    if (Platform.OS === 'web') {
      this.database = new WebDatabase();
    } else {
      // Динамический импорт для мобильных платформ
      const { localDatabase } = await import('./localDatabase');
      this.database = localDatabase;
    }
    
    await this.database.init();
  }

  async registerUser(email: string, password: string, name: string, username?: string, birthDate?: string) {
    return this.database.registerUser(email, password, name, username, birthDate);
  }

  async loginUser(login: string, password: string) {
    return this.database.loginUser(login, password);
  }

  async saveQuizResult(userId: string, quizId: string, result: any) {
    return this.database.saveQuizResult(userId, quizId, result);
  }

  async saveTarotReading(userId: string, spreadId: string, cards: any[], interpretation: string) {
    return this.database.saveTarotReading(userId, spreadId, cards, interpretation);
  }

  async getUserQuizResults(userId: string) {
    return this.database.getUserQuizResults(userId);
  }

  async getUserTarotReadings(userId: string) {
    return this.database.getUserTarotReadings(userId);
  }

  async syncWithServer() {
    return this.database.syncWithServer();
  }
}

export const databaseAdapter = new DatabaseAdapter();