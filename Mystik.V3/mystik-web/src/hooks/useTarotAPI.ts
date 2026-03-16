import { useState, useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { API_BASE_URL } from '@/config/api';

export interface TarotCard {
  id: string;
  number: string;
  name: string;
  symbol: string;
  meaning: string;
}

export interface TarotSpread {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  positions: string[];
  isPremium: boolean;
}

export interface TarotReading {
  id: string;
  spread: TarotSpread;
  cards: TarotCard[];
  interpretations: {
    position: string;
    card: TarotCard;
    interpretation: string;
  }[];
  createdAt: string;
}

// Хук для получения раскладов
export function useTarotSpreads() {
  const [spreads, setSpreads] = useState<TarotSpread[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpreads = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/tarot/spreads`);
        
        console.log('Tarot spreads API response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('Expected JSON but got:', text.substring(0, 200));
          throw new Error(`Expected JSON but got: ${contentType}`);
        }
        
        const data = await response.json();
        
        if (data.ok) {
          setSpreads(data.spreads);
        } else {
          setError(data.error || 'Ошибка загрузки раскладов');
        }
      } catch (err) {
        console.error('Error fetching tarot spreads:', err);
        setError('Ошибка сети');
      } finally {
        setLoading(false);
      }
    };

    fetchSpreads();
  }, []);

  return { spreads, loading, error };
}

// Хук для получения карт
export function useTarotCards() {
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/tarot/cards`);
        
        console.log('Tarot cards API response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('Expected JSON but got:', text.substring(0, 200));
          throw new Error(`Expected JSON but got: ${contentType}`);
        }
        
        const data = await response.json();
        
        if (data.ok) {
          setCards(data.cards);
        } else {
          setError(data.error || 'Ошибка загрузки карт');
        }
      } catch (err) {
        console.error('Error fetching tarot cards:', err);
        setError('Ошибка сети');
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  return { cards, loading, error };
}

// Хук для создания гадания
export function useTarotReading() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createReading = async (spreadId: string, cardIds: string[]): Promise<TarotReading | null> => {
    if (!user?.id) {
      setError('Пользователь не авторизован');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/tarot/reading`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          spreadId,
          cardIds,
        }),
      });

      const data = await response.json();

      if (data.ok) {
        return data.reading;
      } else {
        setError(data.error || 'Ошибка создания гадания');
        return null;
      }
    } catch (err) {
      console.error('Error creating tarot reading:', err);
      setError('Ошибка сети');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createReading, loading, error };
}

// Хук для получения гаданий пользователя
export function useUserTarotReadings(date?: string) {
  const { user } = useAuth();
  const [readings, setReadings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReadings = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        let url = `${API_BASE_URL}/api/user/${user.id}/tarot/readings`;
        if (date) {
          url += `?date=${date}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        
        if (data.ok) {
          setReadings(data.readings);
        } else {
          setError(data.error || 'Ошибка загрузки гаданий');
        }
      } catch (err) {
        console.error('Error fetching user tarot readings:', err);
        setError('Ошибка сети');
      } finally {
        setLoading(false);
      }
    };

    fetchReadings();
  }, [user?.id, date]);

  return { readings, loading, error };
}