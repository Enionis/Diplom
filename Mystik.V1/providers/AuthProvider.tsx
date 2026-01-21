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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
