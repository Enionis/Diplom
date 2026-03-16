import { useState, useEffect } from "react";
import { databaseAdapter } from "../utils/databaseAdapter";
import { storageAdapter } from "../utils/storageAdapter";
import { useAuthContext } from "../providers/AuthProvider";

interface ReadingsData {
  count: number;
  date: string;
}

export function useTarotReadings() {
  const [readingsToday, setReadingsToday] = useState(0);
  const [userReadings, setUserReadings] = useState<any[]>([]);
  const { user } = useAuthContext();
  const MAX_FREE_READINGS = 3;

  useEffect(() => {
    loadReadings();
    if (user) {
      loadUserReadings();
    }
  }, [user]);

  const loadReadings = async () => {
    try {
      const stored = await storageAdapter.getItem("tarotReadings");
      const today = new Date().toDateString();
      
      if (stored) {
        const data: ReadingsData = JSON.parse(stored);
        if (data.date === today) {
          setReadingsToday(data.count);
        } else {
          setReadingsToday(0);
        }
      }
    } catch (error) {
      console.error("Error loading readings:", error);
    }
  };

  const loadUserReadings = async () => {
    if (!user) return;
    
    try {
      const readings = await databaseAdapter.getUserTarotReadings(user.id);
      setUserReadings(readings);
    } catch (error) {
      console.error("Error loading user readings:", error);
    }
  };

  const performReading = async (spreadId?: string, cards?: any[], interpretation?: string) => {
    const today = new Date().toDateString();
    const newCount = readingsToday + 1;
    
    const data: ReadingsData = {
      count: newCount,
      date: today,
    };
    
    await storageAdapter.setItem("tarotReadings", JSON.stringify(data));
    setReadingsToday(newCount);

    // Если пользователь авторизован и предоставлены данные чтения, сохраняем в БД
    if (user && spreadId && cards && interpretation) {
      await databaseAdapter.saveTarotReading(user.id, spreadId, cards, interpretation);
      await loadUserReadings(); // Обновляем список чтений пользователя
    }
  };

  const canRead = readingsToday < MAX_FREE_READINGS;

  return { 
    readingsToday, 
    canRead, 
    performReading, 
    userReadings,
    loadUserReadings 
  };
}