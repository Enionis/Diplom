import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TAROT_CARDS, TarotCard } from "@/constants/tarot";

interface DailyCardData {
  card: TarotCard;
  date: string;
}

export function useDailyCard() {
  const [card, setCard] = useState<TarotCard | null>(null);
  const [isNewDay, setIsNewDay] = useState(false);

  useEffect(() => {
    loadDailyCard();
  }, []);

  const loadDailyCard = async () => {
    try {
      const stored = await AsyncStorage.getItem("dailyCard");
      const today = new Date().toDateString();
      
      if (stored) {
        const data: DailyCardData = JSON.parse(stored);
        if (data.date === today) {
          setCard(data.card);
          setIsNewDay(false);
        } else {
          setIsNewDay(true);
        }
      } else {
        setIsNewDay(true);
      }
    } catch (error) {
      console.error("Error loading daily card:", error);
      setIsNewDay(true);
    }
  };

  const drawDailyCard = () => {
    const randomCard = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];
    const today = new Date().toDateString();
    
    const data: DailyCardData = {
      card: randomCard,
      date: today,
    };
    
    AsyncStorage.setItem("dailyCard", JSON.stringify(data));
    setCard(randomCard);
    setIsNewDay(false);
    
    return randomCard;
  };

  return { card, isNewDay, drawDailyCard };
}