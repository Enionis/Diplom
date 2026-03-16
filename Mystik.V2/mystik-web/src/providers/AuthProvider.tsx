import React, { createContext, useContext, useState, useEffect } from 'react';
import { authDatabase } from '@/utils/authDatabase';
import { apiLogin, apiRegister, apiGetUser, apiUpdateProfile, apiChangePassword, isApiEnabled } from '@/utils/apiAuth';

interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  birthDate?: string;
  isGuest: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (login: string, password: string) => Promise<boolean>;
  register: (email: string, username: string, password: string, name: string, birthDate?: string) => Promise<boolean>;
  updateProfile: (name: string, birthDate?: string) => Promise<boolean>;
  changePassword: (oldPassword: string, newPassword: string, confirmPassword: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const GUEST_USER: User = {
  id: 'guest',
  email: 'guest@mystic.com',
  username: 'guest',
  name: 'Мистический странник',
  isGuest: true,
  createdAt: new Date().toISOString(),
};

const STORAGE_KEY = 'mystic_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as User;
        if (parsed.isGuest) {
          setUser(null);
          localStorage.removeItem(STORAGE_KEY);
        } else {
          const checkUser = async () => {
            if (isApiEnabled()) {
              const u = await apiGetUser(parsed.id);
              if (u) {
                setUser({ ...parsed, email: u.email, name: u.name });
                return;
              }
            } else {
              const inDb = authDatabase.getUserById(parsed.id);
              if (inDb) {
                setUser({ ...parsed, email: inDb.email, name: inDb.name });
                return;
              }
            }
            setUser(null);
            localStorage.removeItem(STORAGE_KEY);
          };
          checkUser().finally(() => setIsLoading(false));
          return;
        }
      } catch {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (login: string, password: string): Promise<boolean> => {
    if (isApiEnabled()) {
      const result = await apiLogin(login, password);
      if (result.ok && result.user) {
        const loggedInUser: User = {
          id: result.user.id,
          email: result.user.email,
          username: result.user.username,
          name: result.user.name,
          birthDate: result.user.birthDate,
          isGuest: false,
          createdAt: new Date().toISOString(),
        };
        setUser(loggedInUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));
        return true;
      }
    }
    const userData = await authDatabase.loginUser(login, password);
    if (userData) {
      const loggedInUser: User = {
        id: userData.id,
        email: userData.email,
        username: userData.username || login,
        name: userData.name,
        birthDate: userData.birthDate,
        isGuest: false,
        createdAt: new Date().toISOString(),
      };
      setUser(loggedInUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  };

  const register = async (email: string, username: string, password: string, name: string, birthDate?: string): Promise<boolean> => {
    if (isApiEnabled()) {
      const result = await apiRegister(email, username, password, name, birthDate);
      if (result.ok && result.user) {
        const registeredUser: User = {
          id: result.user.id,
          email: result.user.email,
          username: result.user.username,
          name: result.user.name,
          birthDate: result.user.birthDate,
          isGuest: false,
          createdAt: new Date().toISOString(),
        };
        setUser(registeredUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(registeredUser));
        return true;
      }
    }
    const userData = await authDatabase.registerUser(email, username, password, name, birthDate);
    if (userData) {
      const registeredUser: User = {
        id: userData.id,
        email: userData.email,
        username: userData.username,
        name: userData.name,
        birthDate: userData.birthDate,
        isGuest: false,
        createdAt: new Date().toISOString(),
      };
      setUser(registeredUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(registeredUser));
      return true;
    }
    return false;
  };

  const updateProfile = async (name: string, birthDate?: string): Promise<boolean> => {
    if (!user || user.isGuest) return false;
    
    if (isApiEnabled()) {
      const result = await apiUpdateProfile(user.id, name, birthDate);
      if (result.ok && result.user) {
        const updatedUser = { ...user, name: result.user.name, birthDate: result.user.birthDate };
        setUser(updatedUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
        return true;
      }
      // Если пользователь не найден на сервере, выходим
      if (!result.ok) {
        await logout();
        window.alert('Сессия истекла. Пожалуйста, войдите снова.');
      }
      return false;
    }
    
    // Fallback to local database
    const success = authDatabase.updateUser(user.id, { name, birthDate });
    if (success) {
      const updatedUser = { ...user, name, birthDate };
      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  const changePassword = async (oldPassword: string, newPassword: string, confirmPassword: string): Promise<boolean> => {
    if (!user || user.isGuest) return false;
    
    if (isApiEnabled()) {
      const result = await apiChangePassword(user.id, oldPassword, newPassword, confirmPassword);
      return result.ok;
    }
    
    // Fallback to local database
    return authDatabase.changePassword(user.id, oldPassword, newPassword);
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, updateProfile, changePassword, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
