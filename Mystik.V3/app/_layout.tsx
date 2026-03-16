import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SubscriptionProvider } from "@/providers/SubscriptionProvider";
import { UserProvider } from "@/providers/UserProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { useBackgroundSync } from "@/hooks/useBackgroundSync";
import AuthGuard from "@/components/AuthGuard";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  // Инициализируем фоновую синхронизацию
  useBackgroundSync();

  return (
    <Stack screenOptions={{ headerBackTitle: "Назад", headerStyle: { backgroundColor: "#1a1a2e" }, headerTintColor: "#fff" }}>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false,
          gestureEnabled: false
        }} 
      />
      <Stack.Screen 
        name="auth" 
        options={{ 
          headerShown: false,
          gestureEnabled: false
        }} 
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="subscription"
        options={{
          presentation: "modal",
          title: "Премиум подписка",
        }}
      />
      <Stack.Screen
        name="quiz/[id]"
        options={{
          presentation: "modal",
          title: "Тест",
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <AuthGuard>
            <UserProvider>
              <SubscriptionProvider>
                <RootLayoutNav />
              </SubscriptionProvider>
            </UserProvider>
          </AuthGuard>
        </AuthProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}