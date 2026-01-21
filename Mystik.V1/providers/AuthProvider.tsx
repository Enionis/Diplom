import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authDatabase } from '@/utils/authDatabase';

interface User {
  id: string;
  email: string;
  name: string;
  isGuest: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const GUEST_USER: User = {
  id: 'guest',
  email: 'guest@mystic.com',
  name: 'Гость',
  isGuest: true,
  createdAt: new Date().toISOString(),
};

const DEVICE_ID_KEY = 'device_id';

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDatabaseReady, setIsDatabaseReady] = useState(false);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [db, setDb] = useState<any | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    async function initDb() {
      try {
        // Даем время на инициализацию базы данных
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (!isMounted) return;
        
        console.log("Starting database initialization...");
        
        // Проверяем что база уже инициализирована
        if (isDatabaseReady) {
          console.log("Database already initialized, skipping...");
          return;
        }
        
        // Сначала получаем deviceId
        let storedDeviceId = await AsyncStorage.getItem(DEVICE_ID_KEY);
        if (!storedDeviceId) {
          storedDeviceId = generateUUID();
          await AsyncStorage.setItem(DEVICE_ID_KEY, storedDeviceId);
        }
        
        if (!isMounted) return;
        setDeviceId(storedDeviceId);
        console.log("Device ID ready:", storedDeviceId);
        
        // Затем инициализируем базу данных
        const database = await authDatabase.initDatabaseAsync('mystic.db');
        
        if (!isMounted) return;
        console.log("Database opened successfully");
        setDb(database);

        // Создание таблиц по одной с проверками
        console.log("Creating tables...");
        
        setIsDatabaseReady(true);
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    }

    initDb();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('mystic_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(GUEST_USER);
        await AsyncStorage.setItem('mystic_user', JSON.stringify(GUEST_USER));
      }
    } catch (error) {
      console.error('Error loading user:', error);
      setUser(GUEST_USER);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      if (!user) {
        console.error('AuthProvider: user is null during login attempt');
        return false;
      }
      
      const userData = await authDatabase.loginUser(email, password);
      
      if (userData) {
        const loggedInUser: User = {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          isGuest: false,
          createdAt: new Date().toISOString(),
        };
        
        setUser(loggedInUser);
        await AsyncStorage.setItem('mystic_user', JSON.stringify(loggedInUser));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      if (!user) {
        console.error('AuthProvider: user is null during register attempt');
        return false;
      }
      
      const success = await authDatabase.registerUser(email, password, name);
      
      if (success) {
        const registeredUser: User = {
          id: `user_${Date.now()}`,
          email,
          name,
          isGuest: false,
          createdAt: new Date().toISOString(),
        };
        
        setUser(registeredUser);
        await AsyncStorage.setItem('mystic_user', JSON.stringify(registeredUser));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('mystic_user');
      setUser(GUEST_USER);
      await AsyncStorage.setItem('mystic_user', JSON.stringify(GUEST_USER));
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
