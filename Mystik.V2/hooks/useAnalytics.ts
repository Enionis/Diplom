import * as SQLite from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";

async function getDb() {
  const db = SQLite.openDatabaseSync("mystic.db");
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT,
      event_name TEXT,
      timestamp INTEGER
    );
    CREATE TABLE IF NOT EXISTS subscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT,
      is_premium INTEGER,
      revenue INTEGER,
      timestamp INTEGER
    );
  `);
  return db;
}

export const trackEvent = async (eventName: string) => {
  try {
    const db = await getDb();
    const userId = await AsyncStorage.getItem("userId");
    await db.runAsync(
      `INSERT INTO events (user_id, event_name, timestamp) VALUES (?, ?, ?)`,
      [userId || "unknown", eventName, Date.now()]
    );
  } catch (error) {
    console.error("Error tracking event:", error);
  }
};

export const trackSubscription = async (
  isPremium: boolean,
  revenue: number,
  userId: string
) => {
  try {
    const db = await getDb();
    await db.runAsync(
      `INSERT INTO subscriptions (user_id, is_premium, revenue, timestamp) VALUES (?, ?, ?, ?)`,
      [userId, isPremium ? 1 : 0, revenue, Date.now()]
    );
  } catch (error) {
    console.error("Error tracking subscription:", error);
  }
};

export const getStats = async () => {
  try {
    const db = await getDb();
    const events = await db.getAllAsync(
      `SELECT event_name, COUNT(*) as count FROM events GROUP BY event_name`
    );
    const subscriptions = await db.getAllAsync(
      `SELECT SUM(revenue) as total_revenue, SUM(is_premium) as premium_count, COUNT(*) as total_count FROM subscriptions`
    );
    return {
      events: events.map((e: any) => ({ name: e.event_name, count: e.count })),
      revenue: subscriptions[0]?.total_revenue || 0,
      premiumRatio: subscriptions[0]?.total_count
        ? (subscriptions[0].premium_count / subscriptions[0].total_count) * 100
        : 0,
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return { events: [], revenue: 0, premiumRatio: 0 };
  }
};

export const seedTestData = async (userId: string) => {
  try {
    await trackEvent("quiz_click_bread");
    await trackEvent("quiz_click_strengths");
    await trackEvent("quiz_click_paei");
    await trackEvent("quiz_click_attachment");
    await trackEvent("quiz_click_archetype");
    await trackEvent("tarot_click_daily");
    await trackEvent("tarot_click_three_card");
    await trackSubscription(true, 990, userId);
    await trackSubscription(false, 0, userId);
  } catch (error) {
    console.error("Error seeding test data:", error);
  }
};

export const useAnalytics = () => {
  const { data: stats, refetch } = useQuery({
    queryKey: ["analytics"],
    queryFn: getStats,
    initialData: { events: [], revenue: 0, premiumRatio: 0 },
  });

  return { stats, refetch };
};