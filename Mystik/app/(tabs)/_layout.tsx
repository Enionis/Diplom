import { Tabs } from "expo-router";
import { Home, Star, User, Sparkles, BookOpen } from "lucide-react-native";
import { Platform } from "react-native";
import { useDatabase } from "@/hooks/useDatabase";

export default function TabsLayout() {
  const { logTabClick, deviceId } = useDatabase();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffd700",
        tabBarInactiveTintColor: "#8b7aa8",
        tabBarStyle: {
          backgroundColor: "#1a1a2e",
          borderTopColor: "#2a2a3e",
          paddingBottom: Platform.OS === "ios" ? 0 : 5,
          height: Platform.OS === "ios" ? 85 : 60,
        },
        headerStyle: {
          backgroundColor: "#1a1a2e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "600",
        },
      }}
      screenListeners={{
        tabPress: (e) => {
          // Используем tabPress вместо focus для более надежного логирования
          const routeName = e.target?.split("-")[0] || "unknown";
          if (deviceId) {
            logTabClick(routeName);
          }
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Главная",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tarot"
        options={{
          title: "Таро",
          tabBarIcon: ({ color }) => <Sparkles size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="horoscope"
        options={{
          title: "Эзотерика",
          tabBarIcon: ({ color }) => <Star size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tests"
        options={{
          title: "Тесты",
          tabBarIcon: ({ color }) => <BookOpen size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Профиль",
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}