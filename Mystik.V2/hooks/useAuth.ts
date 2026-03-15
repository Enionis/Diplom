import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkServerConnection } from './useNetworkStatus';

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
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const userStr = await AsyncStorage.getItem('auth_user');
      
      if (userStr) {
        const user = JSON.parse(userStr);
        
        // Проверяем доступность сервера для авторизованного пользователя
        const serverAvailable = await checkServerConnection();
        
        if (serverAvailable) {
          // Проверяем, что пользователь все еще существует на сервере
          try {
            const response = await fetch(`http://localhost:3001/api/user/${user.id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            const data = await response.json();

            if (data.ok && data.user) {
              // Обновляем данные пользователя с сервера
              await AsyncStorage.setItem('auth_user', JSON.stringify(data.user));
              setAuthState({
                user: data.user,
                token: null,
                isAuthenticated: true,
                loading: false,
              });
            } else {
              // Пользователь не найден на сервере, очищаем локальные данные
              await AsyncStorage.removeItem('auth_user');
              setAuthState(prev => ({ ...prev, loading: false }));
            }
          } catch (error) {
            console.error('Error verifying user on server:', error);
            // Если не можем проверить на сервере, используем локальные данные
            setAuthState({
              user,
              token: null,
              isAuthenticated: true,
              loading: false,
            });
          }
        } else {
          // Сервер недоступен, но пользователь есть локально
          // Можно либо использовать локальные данные, либо требовать переавторизацию
          setAuthState({
            user,
            token: null,
            isAuthenticated: true,
            loading: false,
          });
        }
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
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login: email, password }),
      });

      const data = await response.json();

      if (data.ok && data.user) {
        // Сохраняем пользователя без токена, так как сервер не использует токены
        await AsyncStorage.setItem('auth_user', JSON.stringify(data.user));
        
        setAuthState({
          user: data.user,
          token: null, // Сервер не использует токены
          isAuthenticated: true,
          loading: false,
        });
        
        return true;
      } else {
        console.error('Login failed:', data.error);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name?: string, username?: string, birthDate?: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password, 
          name,
          username,
          birthDate 
        }),
      });

      const data = await response.json();

      if (data.ok && data.user) {
        // Сохраняем пользователя без токена
        await AsyncStorage.setItem('auth_user', JSON.stringify(data.user));
        
        setAuthState({
          user: data.user,
          token: null, // Сервер не использует токены
          isAuthenticated: true,
          loading: false,
        });
        
        return true;
      } else {
        console.error('Registration failed:', data.error);
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('auth_user');
      
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
      const response = await fetch(`http://localhost:3001/api/user/${authState.user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (data.ok && data.user) {
        await AsyncStorage.setItem('auth_user', JSON.stringify(data.user));
        
        setAuthState(prev => ({
          ...prev,
          user: data.user,
        }));
        
        return true;
      } else {
        console.error('Profile update failed:', data.error);
        return false;
      }
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  };

  const changePassword = async (oldPassword: string, newPassword: string, confirmPassword: string): Promise<boolean> => {
    if (!authState.user) return false;

    try {
      const response = await fetch(`http://localhost:3001/api/user/${authState.user.id}/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          oldPassword, 
          newPassword, 
          confirmPassword 
        }),
      });

      const data = await response.json();

      if (data.ok) {
        return true;
      } else {
        console.error('Password change failed:', data.error);
        return false;
      }
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