import React, { createContext, useContext, useState, useEffect } from 'react';
import { authDatabase } from '@/utils/authDatabase';
import { apiLogin, apiRegister, apiGetUser, isApiEnabled } from '@/utils/apiAuth';

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
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const GUEST_USER: User = {
  id: 'guest',
  email: 'guest@mystic.com',
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
          setUser(parsed);
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
            setUser(GUEST_USER);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(GUEST_USER));
          };
          checkUser().finally(() => setIsLoading(false));
          return;
        }
      } catch {
        setUser(GUEST_USER);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(GUEST_USER));
      }
    } else {
      setUser(GUEST_USER);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(GUEST_USER));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (isApiEnabled()) {
      const result = await apiLogin(email, password);
      if (result.ok && result.user) {
        const loggedInUser: User = {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          isGuest: false,
          createdAt: new Date().toISOString(),
        };
        setUser(loggedInUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));
        return true;
      }
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    if (isApiEnabled()) {
      const result = await apiRegister(email, password, name);
      if (result.ok && result.user) {
        const registeredUser: User = {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          isGuest: false,
          createdAt: new Date().toISOString(),
        };
        setUser(registeredUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(registeredUser));
        return true;
      }
    }
    const userData = await authDatabase.registerUser(email, password, name);
    if (userData) {
      const registeredUser: User = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        isGuest: false,
        createdAt: new Date().toISOString(),
      };
      setUser(registeredUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(registeredUser));
      return true;
    }
    return false;
  };

  const logout = async () => {
    setUser(GUEST_USER);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(GUEST_USER));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
