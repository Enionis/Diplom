import React, { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuthContext } from '../providers/AuthProvider';
import { View, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, isAuthenticated, loading } = useAuthContext();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return; // Ждем загрузки состояния авторизации

    const inAuthGroup = segments[0] === 'auth';
    const inTabsGroup = segments[0] === '(tabs)';

    if (!isAuthenticated && !inAuthGroup) {
      // Пользователь не авторизован и не на странице авторизации - перенаправляем на auth
      router.replace('/auth');
    } else if (isAuthenticated && inAuthGroup) {
      // Пользователь авторизован и на странице авторизации - перенаправляем на главную
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, loading, segments, router]);

  // Показываем загрузку пока проверяем авторизацию
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LinearGradient
          colors={['#2196f3', '#3f51b5']}
          style={{ 
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center',
            width: '100%'
          }}
        >
          <ActivityIndicator size="large" color="#ffd700" />
        </LinearGradient>
      </View>
    );
  }

  return <>{children}</>;
}