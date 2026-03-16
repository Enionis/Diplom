import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { databaseAdapter } from '../utils/databaseAdapter';

export function useBackgroundSync() {
  const appState = useRef(AppState.currentState);
  const syncInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Запускаем периодическую синхронизацию каждые 5 минут
    startPeriodicSync();

    // Слушаем изменения состояния приложения
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription?.remove();
      stopPeriodicSync();
    };
  }, []);

  const startPeriodicSync = () => {
    // Синхронизируем сразу
    performSync();
    
    // Затем каждые 5 минут
    syncInterval.current = setInterval(() => {
      performSync();
    }, 5 * 60 * 1000); // 5 минут
  };

  const stopPeriodicSync = () => {
    if (syncInterval.current) {
      clearInterval(syncInterval.current);
      syncInterval.current = null;
    }
  };

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      // Приложение стало активным - синхронизируем
      performSync();
    }
    
    appState.current = nextAppState;
  };

  const performSync = async () => {
    try {
      await databaseAdapter.syncWithServer();
    } catch (error) {
      console.log('Background sync failed:', error);
    }
  };

  // Возвращаем функцию для ручной синхронизации
  return {
    syncNow: performSync
  };
}