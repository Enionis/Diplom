import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuthContext } from '@/providers/AuthProvider';
import { View, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function IndexPage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuthContext();

  useEffect(() => {
    if (loading) return;

    if (isAuthenticated) {
      router.replace('/(tabs)');
    } else {
      router.replace('/auth');
    }
  }, [isAuthenticated, loading, router]);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#2196f3', '#3f51b5']}
        style={{ 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center'
        }}
      >
        <ActivityIndicator size="large" color="#ffd700" />
      </LinearGradient>
    </View>
  );
}