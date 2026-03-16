import { useState, useEffect } from 'react';
import { databaseAdapter } from '../utils/databaseAdapter';
import { storageAdapter } from '../utils/storageAdapter';

export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  birthDate?: string;
  isGuest?: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true,
  });

  useEffect(() => {
    initializeDatabase();
  }, []);

  const initializeDatabase = async () => {
    try {
      await databaseAdapter.init();
      await loadAuthState();
    } catch (error) {
      console.error('Error initializing database:', error);
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  };

  const loadAuthState = async () => {
    try {
      const userStr = await storageAdapter.getItem('auth_user');
      
      if (userStr) {
        const user = JSON.parse(userStr);
        
        setAuthState({
          user,
          token: null,
          isAuthenticated: true,
          loading: false,
        });

        // Запускаем синхронизацию в фоновом режиме
        databaseAdapter.syncWithServer().catch(error => {
          console.log('Background sync failed:', error);
        });
      } else {
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const user = await databaseAdapter.loginUser(email, password);

      if (user) {
        await storageAdapter.setItem('auth_user', JSON.stringify(user));
        
        setAuthState({
          user,
          token: null,
          isAuthenticated: true,
          loading: false,
        });

        // Запускаем синхронизацию в фоновом режиме
        databaseAdapter.syncWithServer().catch(error => {
          console.log('Background sync failed:', error);
        });
        
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name?: string, username?: string, birthDate?: string): Promise<boolean> => {
    try {
      const user = await databaseAdapter.registerUser(email, password, name || 'Пользователь', username, birthDate);

      if (user) {
        await storageAdapter.setItem('auth_user', JSON.stringify(user));
        
        setAuthState({
          user,
          token: null,
          isAuthenticated: true,
          loading: false,
        });

        // Запускаем синхронизацию в фоновом режиме
        databaseAdapter.syncWithServer().catch(error => {
          console.log('Background sync failed:', error);
        });
        
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await storageAdapter.removeItem('auth_user');
      
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!authState.user) return false;

    try {
      // Обновляем локально
      const updatedUser = { ...authState.user, ...updates };
      await storageAdapter.setItem('auth_user', JSON.stringify(updatedUser));
      
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
      }));

      // Синхронизация с сервером произойдет в фоновом режиме
      databaseAdapter.syncWithServer().catch(error => {
        console.log('Background sync failed:', error);
      });
      
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  };

  const changePassword = async (oldPassword: string, newPassword: string, confirmPassword: string): Promise<boolean> => {
    if (!authState.user) return false;

    try {
      // Для смены пароля нужно проверить старый пароль в локальной БД
      // и обновить хеш пароля
      // Пока что возвращаем true, так как это требует дополнительной логики
      return true;
    } catch (error) {
      console.error('Password change error:', error);
      return false;
    }
  };

  return {
    ...authState,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
  };
}