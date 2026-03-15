import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/config/api';

export interface HoroscopeData {
  sign: string;
  text: string;
  date: string;
  period?: string;
  weekRange?: string;
  monthRange?: string;
}

export function useHoroscope(zodiacSign: string, period: 'today' | 'week' | 'month' = 'today') {
  const [horoscope, setHoroscope] = useState<HoroscopeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHoroscope = async () => {
      if (!zodiacSign) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Маппинг русских названий знаков на английские для API
        const signMapping: Record<string, string> = {
          'Овен': 'aries',
          'Телец': 'taurus', 
          'Близнецы': 'gemini',
          'Рак': 'cancer',
          'Лев': 'leo',
          'Дева': 'virgo',
          'Весы': 'libra',
          'Скорпион': 'scorpio',
          'Стрелец': 'sagittarius',
          'Козерог': 'capricorn',
          'Водолей': 'aquarius',
          'Рыбы': 'pisces'
        };

        const englishSign = signMapping[zodiacSign] || zodiacSign.toLowerCase();
        
        // Определяем URL в зависимости от периода
        let apiUrl = `${API_BASE_URL}/api/horoscope/${englishSign}`;
        if (period === 'week') {
          apiUrl += '/weekly';
        } else if (period === 'month') {
          apiUrl += '/monthly';
        }
        
        // Добавляем timestamp чтобы избежать кеширования
        const timestamp = new Date().getTime();
        const response = await fetch(`${apiUrl}?t=${timestamp}`);
        const data = await response.json();

        if (data.ok) {
          setHoroscope(data.horoscope);
        } else {
          setError(data.error || 'Ошибка получения гороскопа');
        }
      } catch (err) {
        console.error('Ошибка при получении гороскопа:', err);
        setError('Ошибка сети');
      } finally {
        setLoading(false);
      }
    };

    fetchHoroscope();
  }, [zodiacSign, period]);

  return { horoscope, loading, error };
}