import { useMemo } from 'react';
import { TALENTS } from '@/constants/talents';

interface TalentItem {
  number: number;
  description: string;
}

interface TalentsData {
  fromGod: TalentItem[];
  fromFather: TalentItem[];
  fromMother: TalentItem[];
}

export function useTalents(
  godNumbers: number[],
  fatherNumbers: number[],
  motherNumbers: number[]
): TalentsData {
  return useMemo(() => {
    // Собираем все использованные числа для проверки дубликатов
    const usedNumbers = new Set<number>();
    
    // Функция для фильтрации уникальных чисел
    const getUniqueTalents = (numbers: number[]): TalentItem[] => {
      return numbers
        .filter(num => {
          if (usedNumbers.has(num)) {
            return false;
          }
          usedNumbers.add(num);
          return true;
        })
        .map(num => ({
          number: num,
          description: TALENTS[num]?.description || 'Описание отсутствует'
        }));
    };

    // Обрабатываем таланты от Бога
    const fromGod = getUniqueTalents(godNumbers);
    
    // Обрабатываем таланты от Отца
    const fromFather = getUniqueTalents(fatherNumbers);
    
    // Обрабатываем таланты от Матери
    const fromMother = getUniqueTalents(motherNumbers);

    return {
      fromGod,
      fromFather,
      fromMother
    };
  }, [godNumbers, fatherNumbers, motherNumbers]);
}