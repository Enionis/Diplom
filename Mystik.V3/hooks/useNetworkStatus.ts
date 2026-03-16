import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

export interface NetworkStatus {
  isConnected: boolean;
  isInternetReachable: boolean;
  type: string | null;
  loading: boolean;
}

export function useNetworkStatus() {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isConnected: false,
    isInternetReachable: false,
    type: null,
    loading: true,
  });

  useEffect(() => {
    // Получаем текущее состояние сети
    const getCurrentNetworkState = async () => {
      try {
        const state = await NetInfo.fetch();
        setNetworkStatus({
          isConnected: state.isConnected ?? false,
          isInternetReachable: state.isInternetReachable ?? false,
          type: state.type,
          loading: false,
        });
      } catch (error) {
        console.error('Error fetching network state:', error);
        setNetworkStatus(prev => ({ ...prev, loading: false }));
      }
    };

    getCurrentNetworkState();

    // Подписываемся на изменения состояния сети
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetworkStatus({
        isConnected: state.isConnected ?? false,
        isInternetReachable: state.isInternetReachable ?? false,
        type: state.type,
        loading: false,
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return networkStatus;
}

// Функция для проверки доступности сервера
export async function checkServerConnection(url?: string): Promise<boolean> {
  // Импортируем API_BASE_URL динамически, чтобы избежать циклических зависимостей
  const { API_BASE_URL } = await import('../constants/api');
  const serverUrl = url || API_BASE_URL;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 секунд таймаут

    console.log('Checking server connection to:', `${serverUrl}/api/health`);
    
    const response = await fetch(`${serverUrl}/api/health`, {
      method: 'GET',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const isOk = response.ok;
    console.log('Server connection result:', isOk);
    return isOk;
  } catch (error) {
    console.log('Server connection check failed:', error);
    return false;
  }
}