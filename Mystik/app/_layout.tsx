import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SubscriptionProvider } from "@/providers/SubscriptionProvider";
import { UserProvider } from "@/providers/UserProvider";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Назад", headerStyle: { backgroundColor: "#1a1a2e" }, headerTintColor: "#fff" }}>
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
      <Stack.Screen
        name="admin"
        options={{
          title: "Админ",
          presentation: "modal",
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
        <UserProvider>
          <SubscriptionProvider>
            <RootLayoutNav />
          </SubscriptionProvider>
        </UserProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}