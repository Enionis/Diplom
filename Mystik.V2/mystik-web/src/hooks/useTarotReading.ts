import { useState, useEffect } from 'react';

interface ReadingsData {
  count: number;
  date: string;
}

const STORAGE_KEY = 'tarotReadings';

export function useTarotReadings() {
  const [readingsToday, setReadingsToday] = useState(0);
  const MAX_FREE_READINGS = 3;

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const today = new Date().toDateString();
    if (stored) {
      try {
        const data: ReadingsData = JSON.parse(stored);
        if (data.date === today) setReadingsToday(data.count);
        else setReadingsToday(0);
      } catch {
        setReadingsToday(0);
      }
    }
  }, []);

  const performReading = async () => {
    const today = new Date().toDateString();
    const newCount = readingsToday + 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ count: newCount, date: today }));
    setReadingsToday(newCount);
  };

  const canRead = readingsToday < MAX_FREE_READINGS;

  return { readingsToday, canRead, performReading };
}
