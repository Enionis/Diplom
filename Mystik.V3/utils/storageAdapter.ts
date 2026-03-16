import { Platform } from 'react-native';

// Веб-совместимая версия AsyncStorage
class WebStorage {
  async getItem(key: string): Promise<string | null> {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error setting item in localStorage:', error);
    }
  }

  async removeItem(key: string): Promise<void> {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from localStorage:', error);
    }
  }
}

// Адаптер хранилища
class StorageAdapter {
  private storage: any;

  constructor() {
    if (Platform.OS === 'web') {
      this.storage = new WebStorage();
    } else {
      // Динамический импорт для мобильных платформ
      this.storage = require('@react-native-async-storage/async-storage').default;
    }
  }

  async getItem(key: string): Promise<string | null> {
    return this.storage.getItem(key);
  }

  async setItem(key: string, value: string): Promise<void> {
    return this.storage.setItem(key, value);
  }

  async removeItem(key: string): Promise<void> {
    return this.storage.removeItem(key);
  }
}

export const storageAdapter = new StorageAdapter();