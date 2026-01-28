import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserState {
  birthDate: string;
  setBirthDate: (date: string) => void;
  clearUserData: () => void;
}

const UserContext = createContext<UserState | undefined>(undefined);
const STORAGE_KEY = 'birthDate';

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [birthDate, setBirthDateState] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setBirthDateState(stored);
  }, []);

  const setBirthDate = (date: string) => {
    setBirthDateState(date);
    localStorage.setItem(STORAGE_KEY, date);
  };

  const clearUserData = () => {
    setBirthDateState('');
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <UserContext.Provider value={{ birthDate, setBirthDate, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error('useUser must be used within UserProvider');
  return context;
}
