import { useState, useEffect } from 'react';
import { TAROT_CARDS, TarotCard } from '@/constants/tarot';

interface DailyCardData {
  card: TarotCard;
  date: string;
}

const STORAGE_KEY = 'dailyCard';

export function useDailyCard() {
  const [card, setCard] = useState<TarotCard | null>(null);
  const [isNewDay, setIsNewDay] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const today = new Date().toDateString();
    if (stored) {
      try {
        const data: DailyCardData = JSON.parse(stored);
        if (data.date === today) {
          setCard(data.card);
          setIsNewDay(false);
        } else setIsNewDay(true);
      } catch {
        setIsNewDay(true);
      }
    } else setIsNewDay(true);
  }, []);

  const drawDailyCard = () => {
    const randomCard = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];
    const today = new Date().toDateString();
    const data: DailyCardData = { card: randomCard, date: today };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setCard(randomCard);
    setIsNewDay(false);
    return randomCard;
  };

  return { card, isNewDay, drawDailyCard };
}
