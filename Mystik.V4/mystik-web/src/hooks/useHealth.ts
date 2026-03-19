import { useMemo } from 'react';
import { HEALTH_RECOMMENDATIONS } from '@/constants/health';

interface HealthRecommendationItem {
  number: number;
  description: string;
}

export function useHealth(
  physics: number,
  energy: number,
  emotions: number
): HealthRecommendationItem[] {
  return useMemo(() => {
    // Собираем все числа из чакры
    const numbers = [physics, energy, emotions];
    
    // Удаляем дубликаты и сортируем по возрастанию
    const uniqueNumbers = Array.from(new Set(numbers)).sort((a, b) => a - b);
    
    // Формируем рекомендации
    return uniqueNumbers
      .filter(num => num <= 22) // Максимальное число для здоровья - 22
      .map(num => ({
        number: num,
        description: HEALTH_RECOMMENDATIONS[num]?.description || 'Описание отсутствует'
      }));
  }, [physics, energy, emotions]);
}
