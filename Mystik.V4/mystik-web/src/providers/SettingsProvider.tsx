import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type MenuPosition = 'bottom' | 'side';

interface SettingsContextType {
  menuPosition: MenuPosition;
  setMenuPosition: (position: MenuPosition) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

interface SettingsProviderProps {
  children: ReactNode;
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [menuPosition, setMenuPositionState] = useState<MenuPosition>('bottom');

  // Загружаем настройки из localStorage при инициализации
  useEffect(() => {
    const savedPosition = localStorage.getItem('menuPosition') as MenuPosition;
    if (savedPosition && (savedPosition === 'bottom' || savedPosition === 'side')) {
      setMenuPositionState(savedPosition);
    }
  }, []);

  // Сохраняем настройки в localStorage при изменении
  const setMenuPosition = (position: MenuPosition) => {
    setMenuPositionState(position);
    localStorage.setItem('menuPosition', position);
  };

  return (
    <SettingsContext.Provider value={{ menuPosition, setMenuPosition }}>
      {children}
    </SettingsContext.Provider>
  );
}