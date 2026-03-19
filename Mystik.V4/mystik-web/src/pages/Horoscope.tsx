import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Crown, Sparkles, ChevronDown, ChevronUp, Gem, Heart } from 'lucide-react';
import { useUser } from '@/providers/UserProvider';
import { useSubscription } from '@/providers/SubscriptionProvider';
import { useAuth } from '@/providers/AuthProvider';
import { useHoroscope } from '@/hooks/useHoroscope';
import { ZODIAC_SIGNS, getZodiacSign } from '@/constants/zodiac';
import { PERSONALITY_TRAITS } from '@/constants/personality';
import { TALENTS } from '@/constants/talents';
import { PAST_LIVES } from '@/constants/pastLives';
import { CHAKRA_HEALTH, HEALTH_RECOMMENDATIONS } from '@/constants/health';
import { PURPOSE_20_40, PURPOSE_40_60, PURPOSE_GENERAL } from '@/constants/purpose';
import { YEAR_ESSENCE, YEAR_REASONS } from '@/constants/yearForecast';
import { CHALLENGES } from '@/constants/challenges';
import { RELATIONSHIPS_WOMEN, RELATIONSHIPS_MEN, CHARACTER, EXIT_REASONS } from '@/constants/relationships';
import { MONEY_DIRECTION, MONEY_SUCCESS, MONEY_FLOW } from '@/constants/money';
import { CHILDREN_MISTAKES } from '@/constants/children';
import { MANAGEMENT_GUIDANCE } from '@/constants/management';
import { PARENTS_MALE_LINE, PARENTS_FEMALE_LINE, PARENTS_RESENTMENTS } from '@/constants/parents';
import MatrixSVG from '@/components/MatrixSVG';

interface HoroscopeProps {
  tab?: string;
}

interface MatrixPoint {
  value: number;
  x: number;
  y: number;
  meaning: string;
  locked?: boolean;
}

interface ChakraData {
  physics: number;
  energy: number;
  emotions: number;
}

interface Purposes {
  skypoint: number;
  earthpoint: number;
  perspurpose: number;
  femalepoint: number;
  malepoint: number;
  socialpurpose: number;
  generalpurpose: number;
  planetarypurpose: number;
}

const formatDateInput = (text: string) => {
  const digits = text.replace(/\D/g, '');
  let formatted = '';
  for (let i = 0; i < digits.length && i < 8; i++) {
    if (i === 2 || i === 4) formatted += '.';
    formatted += digits[i];
  }
  return formatted;
};

const isValidDate = (date: string): boolean => {
  if (!/^\d{2}\.\d{2}\.\d{4}$/.test(date)) return false;
  const [day, month, year] = date.split('.').map(Number);
  if (year < 1900 || year > 2100 || month < 1 || month > 12) return false;
  const daysInMonth = new Date(year, month, 0).getDate();
  return day >= 1 && day <= daysInMonth;
};

const reduceNumber = (number: number): number => {
  let num = number;
  if (number > 22) {
    num = (number % 10) + Math.floor(number / 10);
  }
  return num;
};

const calculateYear = (year: number): number => {
  let y = 0;
  while (year > 0) {
    y += year % 10;
    year = Math.floor(year / 10);
  }
  y = reduceNumber(y);
  return y;
};

function calculateMatrix(date: string, isPremium: boolean): { 
  matrix: MatrixPoint[], 
  chakras: { [key: string]: ChakraData },
  purposes: Purposes 
} | null {
  const match = date.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) return null;
  const [, dayStr, monthStr, yearStr] = match;
  const day = parseInt(dayStr!, 10);
  const month = parseInt(monthStr!, 10);
  const year = parseInt(yearStr!, 10);
  const daysInMonth = new Date(year, month, 0).getDate();
  if (month < 1 || month > 12 || day < 1 || day > daysInMonth) return null;

  const apoint = reduceNumber(day);
  const bpoint = month;
  const cpoint = calculateYear(year);

  const dpoint = reduceNumber(apoint + bpoint + cpoint);
  const epoint = reduceNumber(apoint + bpoint + cpoint + dpoint);
  const fpoint = reduceNumber(apoint + bpoint);
  const gpoint = reduceNumber(bpoint + cpoint);
  const hpoint = reduceNumber(dpoint + apoint);
  const ipoint = reduceNumber(cpoint + dpoint);
  const jpoint = reduceNumber(dpoint + epoint);

  const npoint = reduceNumber(cpoint + epoint);
  const lpoint = reduceNumber(jpoint + npoint);
  const mpoint = reduceNumber(lpoint + npoint);
  const kpoint = reduceNumber(jpoint + lpoint);

  const qpoint = reduceNumber(npoint + cpoint);
  const rpoint = reduceNumber(jpoint + dpoint);
  const spoint = reduceNumber(apoint + epoint);
  const tpoint = reduceNumber(bpoint + epoint);

  const opoint = reduceNumber(apoint + spoint);
  const ppoint = reduceNumber(bpoint + tpoint);

  const upoint = reduceNumber(fpoint + gpoint + hpoint + ipoint);
  const vpoint = reduceNumber(epoint + upoint);
  const wpoint = reduceNumber(spoint + epoint);
  const xpoint = reduceNumber(tpoint + epoint);

  const f2point = reduceNumber(fpoint + upoint);
  const f1point = reduceNumber(fpoint + f2point);
  const g2point = reduceNumber(gpoint + upoint);
  const g1point = reduceNumber(gpoint + g2point);
  const i2point = reduceNumber(ipoint + upoint);
  const i1point = reduceNumber(ipoint + i2point);
  const h2point = reduceNumber(hpoint + upoint);
  const h1point = reduceNumber(hpoint + h2point);

  const skypoint = reduceNumber(bpoint + dpoint);
  const earthpoint = reduceNumber(apoint + cpoint);
  const perspurpose = reduceNumber(skypoint + earthpoint);
  const femalepoint = reduceNumber(gpoint + hpoint);
  const malepoint = reduceNumber(fpoint + ipoint);
  const socialpurpose = reduceNumber(femalepoint + malepoint);
  const generalpurpose = reduceNumber(perspurpose + socialpurpose);
  const planetarypurpose = reduceNumber(socialpurpose + generalpurpose);

  const chakras = {
    sah: {
      physics: apoint,
      energy: bpoint,
      emotions: reduceNumber(apoint + bpoint),
    },
    aj: {
      physics: opoint,
      energy: ppoint,
      emotions: reduceNumber(opoint + ppoint),
    },
    vish: {
      physics: spoint,
      energy: tpoint,
      emotions: reduceNumber(spoint + tpoint),
    },
    anah: {
      physics: wpoint,
      energy: xpoint,
      emotions: reduceNumber(wpoint + xpoint),
    },
    man: {
      physics: epoint,
      energy: epoint,
      emotions: reduceNumber(epoint + epoint),
    },
    svad: {
      physics: jpoint,
      energy: npoint,
      emotions: reduceNumber(jpoint + npoint),
    },
    mul: {
      physics: cpoint,
      energy: dpoint,
      emotions: reduceNumber(cpoint + dpoint),
    },
  };

  const centerX = 200;
  const centerY = 200;
  const mainRadius = 100;
  const innerRadius = 57;
  const outerRadius = 142;

  const matrix: MatrixPoint[] = [
    { value: epoint, x: centerX, y: centerY, meaning: 'E' },
    { value: apoint, x: centerX - mainRadius, y: centerY, meaning: 'A' },
    { value: bpoint, x: centerX, y: centerY - mainRadius, meaning: 'B' },
    { value: cpoint, x: centerX + mainRadius, y: centerY, meaning: 'C' },
    { value: dpoint, x: centerX, y: centerY + mainRadius, meaning: 'D' },
    { value: fpoint, x: centerX - mainRadius / Math.sqrt(2), y: centerY - mainRadius / Math.sqrt(2), meaning: 'F', locked: !isPremium },
    { value: gpoint, x: centerX + mainRadius / Math.sqrt(2), y: centerY - mainRadius / Math.sqrt(2), meaning: 'G', locked: !isPremium },
    { value: ipoint, x: centerX + mainRadius / Math.sqrt(2), y: centerY + mainRadius / Math.sqrt(2), meaning: 'I', locked: !isPremium },
    { value: hpoint, x: centerX - mainRadius / Math.sqrt(2), y: centerY + mainRadius / Math.sqrt(2), meaning: 'H', locked: !isPremium },
    { value: spoint, x: centerX - outerRadius, y: centerY, meaning: 'S', locked: !isPremium },
    { value: tpoint, x: centerX, y: centerY - outerRadius, meaning: 'T', locked: !isPremium },
    { value: npoint, x: centerX + outerRadius, y: centerY, meaning: 'N', locked: !isPremium },
    { value: jpoint, x: centerX, y: centerY + outerRadius, meaning: 'J', locked: !isPremium },
    { value: wpoint, x: centerX - outerRadius / Math.sqrt(2), y: centerY - outerRadius / Math.sqrt(2), meaning: 'W', locked: !isPremium },
    { value: xpoint, x: centerX + outerRadius / Math.sqrt(2), y: centerY - outerRadius / Math.sqrt(2), meaning: 'X', locked: !isPremium },
    { value: lpoint, x: centerX + outerRadius / Math.sqrt(2), y: centerY + outerRadius / Math.sqrt(2), meaning: 'L', locked: !isPremium },
    { value: kpoint, x: centerX - outerRadius / Math.sqrt(2), y: centerY + outerRadius / Math.sqrt(2), meaning: 'K', locked: !isPremium },
    { value: opoint, x: centerX - innerRadius, y: centerY, meaning: 'O', locked: !isPremium },
    { value: ppoint, x: centerX, y: centerY - innerRadius, meaning: 'P', locked: !isPremium },
    { value: qpoint, x: centerX + innerRadius, y: centerY, meaning: 'Q', locked: !isPremium },
    { value: rpoint, x: centerX, y: centerY + innerRadius, meaning: 'R', locked: !isPremium },
    { value: f1point, x: centerX - innerRadius / Math.sqrt(2), y: centerY - innerRadius / Math.sqrt(2), meaning: 'F1', locked: !isPremium },
    { value: g1point, x: centerX + innerRadius / Math.sqrt(2), y: centerY - innerRadius / Math.sqrt(2), meaning: 'G1', locked: !isPremium },
    { value: i1point, x: centerX + innerRadius / Math.sqrt(2), y: centerY + innerRadius / Math.sqrt(2), meaning: 'I1', locked: !isPremium },
    { value: h1point, x: centerX - innerRadius / Math.sqrt(2), y: centerY + innerRadius / Math.sqrt(2), meaning: 'H1', locked: !isPremium },
    { value: mpoint, x: 461, y: 338, meaning: 'M', locked: !isPremium },
    { value: f2point, x: 212, y: 175.93, meaning: 'F2', locked: !isPremium },
    { value: f1point, x: 184.71, y: 149.53, meaning: 'F1', locked: !isPremium },
    { value: g2point, x: 455.4, y: 177.53, meaning: 'G2', locked: !isPremium },
    { value: g1point, x: 480.79, y: 149.13, meaning: 'G1', locked: !isPremium },
    { value: i2point, x: 454.4, y: 416.91, meaning: 'I2', locked: !isPremium },
    { value: i1point, x: 479.79, y: 445.31, meaning: 'I1', locked: !isPremium },
    { value: h2point, x: 215, y: 419, meaning: 'H2', locked: !isPremium },
    { value: h1point, x: 188.71, y: 446.7, meaning: 'H1', locked: !isPremium },
    { value: upoint, x: 382, y: 297, meaning: 'U', locked: !isPremium },
    { value: vpoint, x: 420.54, y: 297, meaning: 'V', locked: !isPremium },
  ];

  return {
    matrix,
    chakras,
    purposes: {
      skypoint,
      earthpoint,
      perspurpose,
      femalepoint,
      malepoint,
      socialpurpose,
      generalpurpose,
      planetarypurpose,
    },
  };
}

export default function Horoscope({ tab: initialTab }: HoroscopeProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { birthDate, setBirthDate } = useUser();
  const { isPremium } = useSubscription();
  const { user } = useAuth();
  const [dateInput, setDateInput] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');
  const [activeTab, setActiveTab] = useState<'horoscope' | 'matrix'>(
    initialTab === 'matrix' || searchParams.get('tab') === 'matrix' ? 'matrix' : 'horoscope'
  );
  
  // Получаем знак зодиака для API гороскопа
  const zodiacSignName = useMemo(() => {
    if (!birthDate) return null;
    return getZodiacSign(birthDate);
  }, [birthDate]);
  
  // Хук для получения гороскопа через API
  const { horoscope: dailyHoroscope, loading: horoscopeLoading } = useHoroscope(zodiacSignName || '', 'today');
  const { horoscope: weeklyHoroscope, loading: weeklyLoading } = useHoroscope(zodiacSignName || '', 'week');
  const { horoscope: monthlyHoroscope, loading: monthlyLoading } = useHoroscope(zodiacSignName || '', 'month');
  
  const [expandedSections, setExpandedSections] = useState<{
    positive: boolean;
    negative: boolean;
    communication: boolean;
    superpower: boolean;
    talentGod: boolean;
    talentFather: boolean;
    talentMother: boolean;
    pastLife: boolean;
    healthSah: boolean;
    healthAj: boolean;
    healthVish: boolean;
    healthAnah: boolean;
    healthMan: boolean;
    healthSvad: boolean;
    healthMul: boolean;
    purpose2040: boolean;
    purpose4060: boolean;
    purposeGeneral: boolean;
    yearForecastEssence: boolean;
    yearForecastReasons: boolean;
    challenges: boolean;
    relationshipsWomen: boolean;
    relationshipsMen: boolean;
    relationshipsExit: boolean;
    relationshipsCharacter: boolean;
    moneyDirection: boolean;
    moneySuccess: boolean;
    moneyFlow: boolean;
    parentsMaleLine: boolean;
    parentsFemaleLine: boolean;
    parentsResentments: boolean;
    children: boolean;
    management: boolean;
  }>({
    positive: false,
    negative: false,
    communication: false,
    superpower: false,
    talentGod: false,
    talentFather: false,
    talentMother: false,
    pastLife: false,
    healthSah: false,
    healthAj: false,
    healthVish: false,
    healthAnah: false,
    healthMan: false,
    healthSvad: false,
    healthMul: false,
    purpose2040: false,
    purpose4060: false,
    purposeGeneral: false,
    yearForecastEssence: false,
    yearForecastReasons: false,
    challenges: false,
    relationshipsWomen: false,
    relationshipsMen: false,
    relationshipsExit: false,
    relationshipsCharacter: false,
    moneyDirection: false,
    moneySuccess: false,
    moneyFlow: false,
    parentsMaleLine: false,
    parentsFemaleLine: false,
    parentsResentments: false,
    children: false,
    management: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  useEffect(() => {
    if (user?.birthDate) {
      const [year, month, day] = user.birthDate.split('-');
      const formattedDate = `${day}.${month}.${year}`;
      setBirthDate(formattedDate);
      setDateInput(formattedDate);
    }
  }, [user?.birthDate, setBirthDate]);

  useEffect(() => {
    if (initialTab === 'matrix' || searchParams.get('tab') === 'matrix') setActiveTab('matrix');
  }, [initialTab, searchParams]);

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateInput(formatDateInput(e.target.value));
  };

  const handleDateSubmit = () => {
    if (!isValidDate(dateInput)) {
      window.alert('Введите корректную дату в формате ДД.ММ.ГГГГ');
      return;
    }
    setBirthDate(dateInput);
  };

  const matrixData = useMemo(() => {
    if (!birthDate || !/^\d{2}\.\d{2}\.\d{4}$/.test(birthDate)) return null;
    return calculateMatrix(birthDate, isPremium);
  }, [birthDate, isPremium]);

  // Вычисляем таланты на основе матрицы
  const talents = useMemo(() => {
    if (!matrixData) return null;
    
    // Таланты от Бога: matrix[2] (B - месяц), matrix[18] (P), matrix[10] (T)
    const godNumbers = [
      matrixData.matrix[2].value,  // B - месяц (333.7, 47)
      matrixData.matrix[18].value, // P (333.7, 95)
      matrixData.matrix[10].value  // T (333.7, 133)
    ];
    
    // Таланты от Отца: matrix[5] (F), matrix[27] (F1), matrix[26] (F2)
    const fatherNumbers = [
      matrixData.matrix[5].value,  // F (151, 119)
      matrixData.matrix[27].value, // F1 (184.71, 153)
      matrixData.matrix[26].value  // F2 (212, 179)
    ];
    
    // Таланты от Матери: matrix[6] (G), matrix[29] (G1), matrix[28] (G2)
    const motherNumbers = [
      matrixData.matrix[6].value,  // G (515.1, 119)
      matrixData.matrix[29].value, // G1 (480.79, 153)
      matrixData.matrix[28].value  // G2 (455.4, 181)
    ];
    
    // Собираем все использованные числа для проверки дубликатов
    const usedNumbers = new Set<number>();
    
    // Функция для фильтрации уникальных чисел
    const getUniqueTalents = (numbers: number[]) => {
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
  }, [matrixData]);

  // Вычисляем прошлую жизнь на основе матрицы
  const pastLife = useMemo(() => {
    if (!matrixData) return null;
    
    // J (332.59, 470), R (333, 510), D (332.7, 559)
    const j = matrixData.matrix[12].value;  // J
    const r = matrixData.matrix[20].value;  // R
    const d = matrixData.matrix[4].value;   // D
    
    const key = `${j}-${r}-${d}`;
    const pastLifeData = PAST_LIVES[key];
    
    if (pastLifeData) {
      return {
        numbers: [j, r, d],
        key,
        name: pastLifeData.name,
        description: pastLifeData.description
      };
    }
    
    return null;
  }, [matrixData]);

  // Вычисляем рекомендации по здоровью для всех чакр
  const healthRecommendations = useMemo(() => {
    if (!matrixData) return null;
    
    const recommendations: { [key: string]: Array<{ number: number; description: string }> } = {};
    const usedNumbers = new Set<number>(); // Глобальный набор использованных чисел
    
    // Порядок чакр как они отображаются на странице
    const chakraOrder = ['sah', 'aj', 'vish', 'anah', 'man', 'svad', 'mul'];
    
    chakraOrder.forEach((chakraKey) => {
      const chakraData = matrixData.chakras[chakraKey];
      if (!chakraData) return;
      
      const numbers = [chakraData.physics, chakraData.energy, chakraData.emotions];
      const uniqueNumbers = Array.from(new Set(numbers)).sort((a, b) => a - b);
      
      recommendations[chakraKey] = uniqueNumbers
        .filter(num => num <= 22 && !usedNumbers.has(num)) // Фильтруем уже использованные числа
        .map(num => {
          usedNumbers.add(num); // Добавляем число в использованные
          return {
            number: num,
            description: HEALTH_RECOMMENDATIONS[num]?.description || 'Описание отсутствует'
          };
        });
    });
    
    return recommendations;
  }, [matrixData]);

  // Вычисляем прогноз на год
  const yearForecast = useMemo(() => {
    if (!birthDate || !matrixData) return null;
    
    // Вычисляем текущий возраст
    const [day, month, year] = birthDate.split('.').map(Number);
    const birthDateObj = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }

    // Если возраст 80+, начинаем цикл заново (80 -> 1, 81 -> 2, и т.д.)
    const effectiveAge = age >= 80 ? ((age - 80) % 79) + 1 : age;

    // Получаем базовые точки из матрицы
    const A = matrixData.matrix[1].value;  // День
    const B = matrixData.matrix[2].value;  // Месяц
    const C = matrixData.matrix[3].value;  // Год
    const D = matrixData.matrix[4].value;
    const E = matrixData.matrix[0].value;  // Центр
    const F = matrixData.matrix[5].value;
    const G = matrixData.matrix[6].value;
    const H = matrixData.matrix[7].value;

    // Вычисляем все промежуточные значения для прогноза
    const AE = reduceNumber(A + E);
    const AE1 = reduceNumber(A + AE);
    const AE2 = reduceNumber(E + AE);
    const AE3 = reduceNumber(A + AE1);
    const AE4 = reduceNumber(AE + AE1);
    const AE5 = reduceNumber(AE + AE2);
    const AE6 = reduceNumber(E + AE2);

    const EB = reduceNumber(E + B);
    const EB1 = reduceNumber(E + EB);
    const EB2 = reduceNumber(B + EB);
    const EB3 = reduceNumber(E + EB1);
    const EB4 = reduceNumber(EB + EB1);
    const EB5 = reduceNumber(EB + EB2);
    const EB6 = reduceNumber(B + EB2);

    const BF = reduceNumber(B + F);
    const BF1 = reduceNumber(B + BF);
    const BF2 = reduceNumber(F + BF);
    const BF3 = reduceNumber(B + BF1);
    const BF4 = reduceNumber(BF + BF1);
    const BF5 = reduceNumber(BF1 + BF2);
    const BF6 = reduceNumber(F + BF2);

    const FC = reduceNumber(F + C);
    const FC1 = reduceNumber(F + FC);
    const FC2 = reduceNumber(C + FC);
    const FC3 = reduceNumber(F + FC1);
    const FC4 = reduceNumber(FC + FC1);
    const FC5 = reduceNumber(FC + FC2);
    const FC6 = reduceNumber(C + FC2);

    const CG = reduceNumber(C + G);
    const CG1 = reduceNumber(C + CG);
    const CG2 = reduceNumber(G + CG);
    const CG3 = reduceNumber(C + CG1);
    const CG4 = reduceNumber(CG + CG1);
    const CG5 = reduceNumber(CG + CG2);
    const CG6 = reduceNumber(C + CG2);

    const GD = reduceNumber(G + D);
    const GD1 = reduceNumber(G + GD);
    const GD2 = reduceNumber(D + GD);
    const GD3 = reduceNumber(G + GD1);
    const GD4 = reduceNumber(GD + GD1);
    const GD5 = reduceNumber(GD + GD2);
    const GD6 = reduceNumber(G + GD2);

    const DH = reduceNumber(D + H);
    const DH1 = reduceNumber(D + DH);
    const DH2 = reduceNumber(H + DH);
    const DH3 = reduceNumber(D + DH1);
    const DH4 = reduceNumber(DH + DH1);
    const DH5 = reduceNumber(DH + DH2);
    const DH6 = reduceNumber(D + DH2);

    const HA = reduceNumber(H + A);
    const HA1 = reduceNumber(H + HA);
    const HA2 = reduceNumber(A + HA);
    const HA3 = reduceNumber(H + HA1);
    const HA4 = reduceNumber(HA + HA1);
    const HA5 = reduceNumber(HA + HA2);
    const HA6 = reduceNumber(A + HA2);

    // Функция для определения числа по возрасту
    const getNumberByAge = (ageValue: number): number => {
      // Если возраст больше 79, начинаем цикл заново
      const normalizedAge = ageValue > 79 ? ((ageValue - 1) % 79) + 1 : ageValue;
      
      const ageMap: { [key: number]: number } = {
        1: AE3, 2: AE3, 3: AE4, 4: AE4, 5: AE, 6: AE5, 7: AE5, 8: AE2, 9: AE6, 10: E,
        11: EB3, 12: EB3, 13: EB1, 14: EB4, 15: EB, 16: EB5, 17: EB5, 18: EB2, 19: EB6, 20: B,
        21: BF3, 22: BF3, 23: BF1, 24: BF4, 25: BF, 26: BF5, 27: BF5, 28: BF2, 29: BF6, 30: F,
        31: FC3, 32: FC3, 33: FC1, 34: FC4, 35: FC, 36: FC5, 37: FC5, 38: FC2, 39: FC6, 40: C,
        41: CG3, 42: CG3, 43: CG1, 44: CG4, 45: CG, 46: CG5, 47: CG5, 48: CG2, 49: CG6, 50: G,
        51: GD3, 52: GD3, 53: GD1, 54: GD4, 55: GD, 56: GD5, 57: GD5, 58: GD2, 59: GD6, 60: D,
        61: DH3, 62: DH3, 63: DH1, 64: DH4, 65: DH, 66: DH5, 67: DH5, 68: DH2, 69: DH6, 70: H,
        71: HA3, 72: HA3, 73: HA1, 74: HA4, 75: HA, 76: HA5, 77: HA5, 78: HA2, 79: HA6
      };
      return ageMap[normalizedAge] || E;
    };

    // Первое число - суть года (текущий возраст)
    const essenceNumber = getNumberByAge(effectiveAge);

    // Второе число - причины событий (возраст ±40)
    const adjustedAge = effectiveAge <= 40 ? effectiveAge + 40 : effectiveAge - 40;
    const reasonsNumber = getNumberByAge(adjustedAge);

    return {
      age,
      effectiveAge,
      essenceNumber,
      reasonsNumber
    };
  }, [birthDate, matrixData]);

  const zodiacData = zodiacSignName ? ZODIAC_SIGNS[zodiacSignName] : null;

  return (
    <div style={{ paddingBottom: 24 }}>
      <header style={{ padding: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>
          Гороскоп и Матрица судьбы
        </h1>
      </header>

      {!birthDate ? (
        <div style={{ padding: 20, textAlign: 'center' }}>
          <label style={{ display: 'block', fontSize: 16, color: 'var(--text-muted)', marginBottom: 20 }}>
            Введите дату рождения
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="ДД.ММ.ГГГГ"
            value={dateInput}
            onChange={handleDateInputChange}
            maxLength={10}
            style={{ marginBottom: 20, textAlign: 'center' }}
          />
          <button type="button" className="btn-primary" onClick={handleDateSubmit} style={{ width: '100%' }}>
            Продолжить
          </button>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', gap: 10, padding: '0 20px 20px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('horoscope')}
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 12,
                border: `1px solid ${activeTab === 'horoscope' ? 'var(--accent)' : '#666'}`,
                background: activeTab === 'horoscope' ? 'linear-gradient(135deg, #2196f3 0%, #3f51b5 100%)' : '#444',
                color: '#fff',
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Гороскоп
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('matrix')}
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 12,
                border: `1px solid ${activeTab === 'matrix' ? 'var(--accent)' : '#666'}`,
                background: activeTab === 'matrix' ? 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)' : '#444',
                color: '#fff',
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Матрица судьбы
            </button>
          </div>

          {activeTab === 'horoscope' && zodiacData && (
            <>
              <div
                style={{
                  margin: 20,
                  padding: 30,
                  borderRadius: 20,
                  background: 'linear-gradient(135deg, #2196f3 0%, #3f51b5 100%)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 60, marginBottom: 10 }}>{zodiacData.symbol}</div>
                <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{zodiacData.name}</div>
                <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 8 }}>{zodiacData.dates}</div>
                <div style={{ fontSize: 14, opacity: 0.9 }}>Стихия: {zodiacData.element}</div>
              </div>
              <div style={{ display: 'flex', gap: 10, padding: '0 20px 20px' }}>
                {(['today', 'week', 'month'] as const).map(period => (
                  <button
                    key={period}
                    type="button"
                    onClick={() => setSelectedPeriod(period)}
                    style={{
                      flex: 1,
                      padding: 12,
                      borderRadius: 12,
                      background: selectedPeriod === period ? 'rgba(255,215,0,0.2)' : 'var(--card-bg)',
                      border: `1px solid ${selectedPeriod === period ? 'var(--accent)' : 'transparent'}`,
                      color: selectedPeriod === period ? 'var(--accent)' : 'var(--text-muted)',
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    {period === 'today' ? 'Сегодня' : period === 'week' ? 'Неделя' : 'Месяц'}
                  </button>
                ))}
              </div>
              <div style={{ margin: 20, padding: 20, background: 'var(--card-bg)', borderRadius: 16 }}>
                {(selectedPeriod === 'today' || isPremium) ? (
                  <>
                    <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--accent)', marginBottom: 12 }}>
                      {selectedPeriod === 'today' ? 'Прогноз на сегодня' : selectedPeriod === 'week' ? 'Прогноз на неделю' : 'Прогноз на месяц'}
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                      {selectedPeriod === 'today' && dailyHoroscope ? (
                        <>
                          {horoscopeLoading ? 'Загрузка гороскопа...' : 
                            dailyHoroscope.text.split('\n\n').map((paragraph, index) => (
                              <p key={index} style={{ margin: index === 0 ? 0 : '16px 0 0 0' }}>
                                {paragraph}
                              </p>
                            ))
                          }
                          {!horoscopeLoading && dailyHoroscope && (
                            <div style={{ 
                              marginTop: 16, 
                              paddingTop: 12, 
                              borderTop: '1px solid rgba(255,255,255,0.1)', 
                              fontSize: 12, 
                              color: 'var(--text-muted)', 
                              opacity: 0.7 
                            }}>
                              {new Date(dailyHoroscope.date).toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })} • Источник: Рамблер
                            </div>
                          )}
                        </>
                      ) : selectedPeriod === 'week' && weeklyHoroscope ? (
                        <>
                          {weeklyLoading ? 'Загрузка недельного гороскопа...' : 
                            weeklyHoroscope.text.split('\n\n').map((paragraph, index) => (
                              <p key={index} style={{ margin: index === 0 ? 0 : '16px 0 0 0' }}>
                                {paragraph}
                              </p>
                            ))
                          }
                          {!weeklyLoading && weeklyHoroscope && (
                            <div style={{ 
                              marginTop: 16, 
                              paddingTop: 12, 
                              borderTop: '1px solid rgba(255,255,255,0.1)', 
                              fontSize: 12, 
                              color: 'var(--text-muted)', 
                              opacity: 0.7 
                            }}>
                              {weeklyHoroscope.weekRange || new Date(weeklyHoroscope.date).toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })} • Источник: Рамблер
                            </div>
                          )}
                        </>
                      ) : selectedPeriod === 'month' && monthlyHoroscope ? (
                        <>
                          {monthlyLoading ? 'Загрузка месячного гороскопа...' : 
                            monthlyHoroscope.text.split('\n\n').map((paragraph, index) => (
                              <p key={index} style={{ margin: index === 0 ? 0 : '16px 0 0 0' }}>
                                {paragraph}
                              </p>
                            ))
                          }
                          {!monthlyLoading && monthlyHoroscope && (
                            <div style={{ 
                              marginTop: 16, 
                              paddingTop: 12, 
                              borderTop: '1px solid rgba(255,255,255,0.1)', 
                              fontSize: 12, 
                              color: 'var(--text-muted)', 
                              opacity: 0.7 
                            }}>
                              {monthlyHoroscope.monthRange || new Date(monthlyHoroscope.date).toLocaleDateString('ru-RU', {
                                month: 'long',
                                year: 'numeric'
                              })} • Источник: Рамблер
                            </div>
                          )}
                        </>
                      ) : (
                        <p style={{ margin: 0 }}>{zodiacData.horoscope[selectedPeriod]}</p>
                      )}
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: 20 }}>
                    <Crown size={28} color="var(--accent)" style={{ marginBottom: 12 }} />
                    <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>
                      Гороскоп на неделю и месяц
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 16 }}>
                      Доступно только для премиум пользователей
                    </div>
                    <button type="button" className="btn-primary" onClick={() => navigate('/subscription')}>
                      Открыть доступ
                    </button>
                  </div>
                )}
              </div>

              {/* Камни и тотемное животное */}
              {isPremium ? (
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: 16, 
                  padding: '0 20px' 
                }}>
                  <div style={{
                    background: 'var(--card-bg)',
                    borderRadius: 16,
                    padding: 20,
                    border: '1px solid var(--border)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 12
                  }}>
                    <Gem size={24} color="var(--accent)" />
                    <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>
                      Камни-талисманы
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.4 }}>
                      {zodiacData.stones.join(', ')}
                    </div>
                  </div>

                  <div style={{
                    background: 'var(--card-bg)',
                    borderRadius: 16,
                    padding: 20,
                    border: '1px solid var(--border)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 12
                  }}>
                    <Heart size={24} color="#ff69b4" />
                    <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>
                      Тотемное животное
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.4 }}>
                      {zodiacData.totem}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{
                  margin: '0 20px',
                  padding: 20,
                  background: 'rgba(255,215,0,0.1)',
                  borderRadius: 16,
                  border: '1px solid rgba(255,215,0,0.2)',
                  textAlign: 'center'
                }}>
                  <Crown size={28} color="var(--accent)" style={{ marginBottom: 12 }} />
                  <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>
                    Камни и тотемное животное
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 16 }}>
                    Доступно только для премиум пользователей
                  </div>
                  <button type="button" className="btn-primary" onClick={() => navigate('/subscription')}>
                    Открыть доступ
                  </button>
                </div>
              )}

              <div style={{ margin: 20, padding: 20, background: 'var(--card-bg)', borderRadius: 16 }}>
                <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--accent)', marginBottom: 16 }}>
                  Совместимость
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ width: 80, fontWeight: 500 }}>Лучшая:</span>
                    <span style={{ color: 'var(--text-muted)' }}>{zodiacData.compatibility.best.join(', ')}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ width: 80, fontWeight: 500 }}>Хорошая:</span>
                    <span style={{ color: 'var(--text-muted)' }}>{zodiacData.compatibility.good.join(', ')}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ width: 80, fontWeight: 500 }}>Сложная:</span>
                    <span style={{ color: 'var(--text-muted)' }}>{zodiacData.compatibility.challenging.join(', ')}</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'matrix' && matrixData && (
            <div style={{ padding: 20 }}>
              <div style={{ 
                width: '100%', 
                maxWidth: 680, 
                margin: '0 auto 40px',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <MatrixSVG matrix={matrixData.matrix} />
              </div>

              <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent)', marginBottom: 12 }}>
                Чакры
              </div>
              {Object.entries(matrixData.chakras).map(([name, data]) => (
                <div
                  key={name}
                  style={{
                    padding: 16,
                    marginBottom: 8,
                    background: 'var(--card-bg)',
                    borderRadius: 12,
                  }}
                >
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, textTransform: 'capitalize' }}>
                    {name === 'sah' ? 'Сахасрара' : name === 'aj' ? 'Аджна' : name === 'vish' ? 'Вишудха' : 
                     name === 'anah' ? 'Анахата' : name === 'man' ? 'Манипура' : name === 'svad' ? 'Свадхистана' : 'Муладхара'}
                  </div>
                  {(
                    <div style={{ display: 'flex', gap: 16, fontSize: 14, color: 'var(--text-muted)' }}>
                      <div>Физика: {data.physics}</div>
                      <div>Энергия: {data.energy}</div>
                      <div>Эмоции: {data.emotions}</div>
                    </div>
                  )}
                </div>
              ))}

              <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent)', marginTop: 24, marginBottom: 12 }}>
                Предназначение
              </div>
              <div style={{ padding: 16, marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12 }}>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                  Личное предназначение
                </div>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>
                  Поиск души, баланс женских и мужских качеств, способности, навыки
                </p>
                <div style={{ marginTop: 8, fontSize: 14 }}>
                  Небо: {matrixData.purposes.skypoint} | Земля: {matrixData.purposes.earthpoint} | Результат: {matrixData.purposes.perspurpose}
                </div>
              </div>

              <div style={{ padding: 16, marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12 }}>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                  Предназначение для общества и рода
                </div>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>
                  Задачи для рода, результаты и признание в обществе
                </p>
                <div style={{ marginTop: 8, fontSize: 14 }}>
                  Женское: {matrixData.purposes.femalepoint} | Мужское: {matrixData.purposes.malepoint} | Результат: {matrixData.purposes.socialpurpose}
                </div>
              </div>

              <div style={{ padding: 16, marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12 }}>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                  Общее предназначение на эту жизнь
                </div>
                <div style={{ marginTop: 8, fontSize: 18, color: 'var(--accent)', fontWeight: 700 }}>
                  {matrixData.purposes.generalpurpose}
                </div>
              </div>

              <div style={{ padding: 16, marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12 }}>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                  Планетарное предназначение
                </div>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>
                  Духовный путь, глобальная задача, где божественное во мне? Глобальная цель души
                </p>
                <div style={{ marginTop: 8, fontSize: 18, color: 'var(--accent)', fontWeight: 700 }}>
                  {matrixData.purposes.planetarypurpose}
                </div>
              </div>

              <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent)', marginTop: 24, marginBottom: 12 }}>
                Личностные качества
              </div>

              {/* В позитиве */}
              <div style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => toggleSection('positive')}
                  style={{
                    width: '100%',
                    padding: 16,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'transparent',
                    border: 'none',
                    color: 'inherit',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 600 }}>В позитиве</span>
                  {expandedSections.positive ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSections.positive && (
                  <div style={{ padding: '0 16px 16px' }}>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <span style={{ 
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          background: 'var(--accent)',
                          color: '#1a1a2e',
                          fontSize: 14,
                          fontWeight: 700
                        }}>
                          {matrixData.matrix[1].value}
                        </span>
                        <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>День рождения</span>
                      </div>
                      <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>
                        {PERSONALITY_TRAITS[matrixData.matrix[1].value]?.positive || 'Описание отсутствует'}
                      </p>
                    </div>
                    {matrixData.matrix[2].value !== matrixData.matrix[1].value && (
                      <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                          <span style={{ 
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            background: 'var(--accent)',
                            color: '#1a1a2e',
                            fontSize: 14,
                            fontWeight: 700
                          }}>
                            {matrixData.matrix[2].value}
                          </span>
                          <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>Месяц рождения</span>
                        </div>
                        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>
                          {PERSONALITY_TRAITS[matrixData.matrix[2].value]?.positive || 'Описание отсутствует'}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* В негативе */}
              <div style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => toggleSection('negative')}
                  style={{
                    width: '100%',
                    padding: 16,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'transparent',
                    border: 'none',
                    color: 'inherit',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 600 }}>В негативе</span>
                  {expandedSections.negative ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSections.negative && (
                  <div style={{ padding: '0 16px 16px' }}>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <span style={{ 
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          background: '#e91e63',
                          color: '#fff',
                          fontSize: 14,
                          fontWeight: 700
                        }}>
                          {matrixData.matrix[1].value}
                        </span>
                        <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>День рождения</span>
                      </div>
                      <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>
                        {PERSONALITY_TRAITS[matrixData.matrix[1].value]?.negative || 'Описание отсутствует'}
                      </p>
                    </div>
                    {matrixData.matrix[2].value !== matrixData.matrix[1].value && (
                      <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                          <span style={{ 
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            background: '#e91e63',
                            color: '#fff',
                            fontSize: 14,
                            fontWeight: 700
                          }}>
                            {matrixData.matrix[2].value}
                          </span>
                          <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>Месяц рождения</span>
                        </div>
                        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>
                          {PERSONALITY_TRAITS[matrixData.matrix[2].value]?.negative || 'Описание отсутствует'}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* В общении */}
              <div style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => toggleSection('communication')}
                  style={{
                    width: '100%',
                    padding: 16,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'transparent',
                    border: 'none',
                    color: 'inherit',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 600 }}>В общении</span>
                  {expandedSections.communication ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSections.communication && (
                  <div style={{ padding: '0 16px 16px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: '#2196f3',
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 700
                      }}>
                        {matrixData.matrix[0].value}
                      </span>
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>Центральная точка</span>
                    </div>
                    <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>
                      {PERSONALITY_TRAITS[matrixData.matrix[0].value]?.communication || 'Описание отсутствует'}
                    </p>
                  </div>
                )}
              </div>

              {/* Ваша супер сила */}
              <div style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => toggleSection('superpower')}
                  style={{
                    width: '100%',
                    padding: 16,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'transparent',
                    border: 'none',
                    color: 'inherit',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 600 }}>Ваша супер сила</span>
                  {expandedSections.superpower ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSections.superpower && (
                  <div style={{ padding: '0 16px 16px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: '#4caf50',
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 700
                      }}>
                        {matrixData.matrix[0].value}
                      </span>
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>Центральная точка</span>
                    </div>
                    <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>
                      {PERSONALITY_TRAITS[matrixData.matrix[0].value]?.superpower || 'Описание отсутствует'}
                    </p>
                  </div>
                )}
              </div>

              {/* Таланты */}
              {isPremium ? (
                talents && (
                  <div style={{ marginTop: 24 }}>
                    <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent)', marginBottom: 12 }}>
                      Таланты
                    </div>

                  {/* Талант от Бога */}
                  {talents.fromGod.length > 0 && (
                    <div style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                      <button
                        type="button"
                        onClick={() => toggleSection('talentGod')}
                        style={{
                          width: '100%',
                          padding: 16,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          background: 'transparent',
                          border: 'none',
                          color: 'inherit',
                          cursor: 'pointer'
                        }}
                      >
                        <span style={{ fontSize: 16, fontWeight: 600, color: '#ffd700' }}>Талант от Бога</span>
                        {expandedSections.talentGod ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                      {expandedSections.talentGod && (
                        <div style={{ padding: '0 16px 16px' }}>
                          {talents.fromGod.map((talent, index) => (
                            <div key={index} style={{ marginBottom: index < talents.fromGod.length - 1 ? 16 : 0, paddingBottom: index < talents.fromGod.length - 1 ? 16 : 0, borderBottom: index < talents.fromGod.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                <span style={{ 
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: 28,
                                  height: 28,
                                  minWidth: 28,
                                  borderRadius: '50%',
                                  background: '#ffd700',
                                  color: '#1a1a2e',
                                  fontSize: 14,
                                  fontWeight: 700,
                                  flexShrink: 0
                                }}>
                                  {talent.number}
                                </span>
                                <span style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                                  {talent.description}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Талант от Отца */}
                  {talents.fromFather.length > 0 && (
                    <div style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                      <button
                        type="button"
                        onClick={() => toggleSection('talentFather')}
                        style={{
                          width: '100%',
                          padding: 16,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          background: 'transparent',
                          border: 'none',
                          color: 'inherit',
                          cursor: 'pointer'
                        }}
                      >
                        <span style={{ fontSize: 16, fontWeight: 600, color: '#4caf50' }}>Талант от Отца</span>
                        {expandedSections.talentFather ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                      {expandedSections.talentFather && (
                        <div style={{ padding: '0 16px 16px' }}>
                          {talents.fromFather.map((talent, index) => (
                            <div key={index} style={{ marginBottom: index < talents.fromFather.length - 1 ? 16 : 0, paddingBottom: index < talents.fromFather.length - 1 ? 16 : 0, borderBottom: index < talents.fromFather.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                <span style={{ 
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: 28,
                                  height: 28,
                                  minWidth: 28,
                                  borderRadius: '50%',
                                  background: '#4caf50',
                                  color: '#fff',
                                  fontSize: 14,
                                  fontWeight: 700,
                                  flexShrink: 0
                                }}>
                                  {talent.number}
                                </span>
                                <span style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                                  {talent.description}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Талант от Матери */}
                  {talents.fromMother.length > 0 && (
                    <div style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                      <button
                        type="button"
                        onClick={() => toggleSection('talentMother')}
                        style={{
                          width: '100%',
                          padding: 16,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          background: 'transparent',
                          border: 'none',
                          color: 'inherit',
                          cursor: 'pointer'
                        }}
                      >
                        <span style={{ fontSize: 16, fontWeight: 600, color: '#2196f3' }}>Талант от Матери</span>
                        {expandedSections.talentMother ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                      {expandedSections.talentMother && (
                        <div style={{ padding: '0 16px 16px' }}>
                          {talents.fromMother.map((talent, index) => (
                            <div key={index} style={{ marginBottom: index < talents.fromMother.length - 1 ? 16 : 0, paddingBottom: index < talents.fromMother.length - 1 ? 16 : 0, borderBottom: index < talents.fromMother.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                <span style={{ 
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: 28,
                                  height: 28,
                                  minWidth: 28,
                                  borderRadius: '50%',
                                  background: '#2196f3',
                                  color: '#fff',
                                  fontSize: 14,
                                  fontWeight: 700,
                                  flexShrink: 0
                                }}>
                                  {talent.number}
                                </span>
                                <span style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                                  {talent.description}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
              ) : (
                <div style={{ marginTop: 24 }}>
                  <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent)', marginBottom: 12 }}>
                    Таланты
                  </div>
                  <div style={{
                    padding: 16,
                    marginBottom: 8,
                    background: 'var(--card-bg)',
                    borderRadius: 12,
                    opacity: 0.6,
                  }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                      Талант от Бога
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sparkles size={16} color="#666" />
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                        Доступно с премиум подпиской
                      </span>
                    </div>
                  </div>
                  <div style={{
                    padding: 16,
                    marginBottom: 8,
                    background: 'var(--card-bg)',
                    borderRadius: 12,
                    opacity: 0.6,
                  }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                      Талант от Отца
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sparkles size={16} color="#666" />
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                        Доступно с премиум подпиской
                      </span>
                    </div>
                  </div>
                  <div style={{
                    padding: 16,
                    marginBottom: 8,
                    background: 'var(--card-bg)',
                    borderRadius: 12,
                    opacity: 0.6,
                  }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                      Талант от Матери
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sparkles size={16} color="#666" />
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                        Доступно с премиум подпиской
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Прошлая жизнь */}
              {isPremium ? (
                pastLife && (
                  <div style={{ marginTop: 24 }}>
                    <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent)', marginBottom: 12 }}>
                      Прошлая жизнь
                    </div>

                  <div style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                    <button
                      type="button"
                      onClick={() => toggleSection('pastLife')}
                      style={{
                        width: '100%',
                        padding: 16,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 16, fontWeight: 600 }}>
                          ({pastLife.numbers.join('-')}) {pastLife.name}
                        </span>
                      </div>
                      {expandedSections.pastLife ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {expandedSections.pastLife && (
                      <div style={{ padding: '0 16px 16px' }}>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
                          {pastLife.numbers.map((num, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span style={{ 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 28,
                                height: 28,
                                minWidth: 28,
                                borderRadius: '50%',
                                background: '#9c27b0',
                                color: '#fff',
                                fontSize: 14,
                                fontWeight: 700
                              }}>
                                {num}
                              </span>
                              {index < pastLife.numbers.length - 1 && (
                                <span style={{ color: 'var(--text-muted)', fontSize: 16 }}>-</span>
                              )}
                            </div>
                          ))}
                        </div>
                        <div style={{ 
                          fontSize: 15, 
                          fontWeight: 600, 
                          color: 'var(--accent)', 
                          marginBottom: 12 
                        }}>
                          Название кармического хвоста: {pastLife.name}
                        </div>
                        <p style={{ 
                          fontSize: 14, 
                          color: 'var(--text-muted)', 
                          lineHeight: 1.6, 
                          margin: 0, 
                          whiteSpace: 'pre-line' 
                        }}>
                          {pastLife.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )
              ) : (
                <div style={{ marginTop: 24 }}>
                  <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent)', marginBottom: 12 }}>
                    Прошлая жизнь
                  </div>
                  <div style={{
                    padding: 16,
                    marginBottom: 8,
                    background: 'var(--card-bg)',
                    borderRadius: 12,
                    opacity: 0.6,
                  }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                      Прошлая жизнь
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sparkles size={16} color="#666" />
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                        Доступно с премиум подпиской
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Здоровье */}
              {isPremium ? (
                matrixData && healthRecommendations && (
                  <div style={{ marginTop: 24 }}>
                    <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent)', marginBottom: 12 }}>
                      Здоровье
                    </div>

                  {Object.entries(matrixData.chakras).map(([chakraKey, chakraData]) => {
                    const healthData = CHAKRA_HEALTH[chakraKey];
                    const recommendations = healthRecommendations[chakraKey];
                    const sectionKey = `health${chakraKey.charAt(0).toUpperCase() + chakraKey.slice(1)}` as keyof typeof expandedSections;

                    return (
                      <div key={chakraKey} style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                        <button
                          type="button"
                          onClick={() => toggleSection(sectionKey)}
                          style={{
                            width: '100%',
                            padding: 16,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: 'transparent',
                            border: 'none',
                            color: 'inherit',
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
                              {healthData.organs}
                            </div>
                            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                              {healthData.name} - {healthData.description}
                            </div>
                          </div>
                          {expandedSections[sectionKey] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                        {expandedSections[sectionKey] && (
                          <div style={{ padding: '0 16px 16px' }}>
                            <div style={{ marginBottom: 16 }}>
                              <div style={{ fontSize: 15, fontWeight: 600, color: '#e91e63', marginBottom: 8 }}>
                                Проблемы со здоровьем:
                              </div>
                              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                                {healthData.problems}
                              </p>
                            </div>

                            <div style={{ marginBottom: 16 }}>
                              <div style={{ fontSize: 15, fontWeight: 600, color: '#ff9800', marginBottom: 8 }}>
                                Причины:
                              </div>
                              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                                {healthData.causes}
                              </p>
                            </div>

                            <div style={{ marginBottom: 16 }}>
                              <div style={{ fontSize: 15, fontWeight: 600, color: '#4caf50', marginBottom: 8 }}>
                                Решение проблемы:
                              </div>
                              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                                {healthData.solution}
                              </p>
                            </div>

                            {recommendations && recommendations.length > 0 && (
                              <div>
                                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--accent)', marginBottom: 12 }}>
                                  Рекомендации по числам:
                                </div>
                                {recommendations.map((rec, index) => (
                                  <div 
                                    key={rec.number} 
                                    style={{ 
                                      marginBottom: index < recommendations.length - 1 ? 16 : 0,
                                      paddingBottom: index < recommendations.length - 1 ? 16 : 0,
                                      borderBottom: index < recommendations.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none'
                                    }}
                                  >
                                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                      <span style={{ 
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 28,
                                        height: 28,
                                        minWidth: 28,
                                        borderRadius: '50%',
                                        background: 'var(--accent)',
                                        color: '#1a1a2e',
                                        fontSize: 14,
                                        fontWeight: 700,
                                        flexShrink: 0
                                      }}>
                                        {rec.number}
                                      </span>
                                      <span style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                                        {rec.description}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )
              ) : (
                <div style={{ marginTop: 24 }}>
                  <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent)', marginBottom: 12 }}>
                    Здоровье
                  </div>
                  {Object.entries({
                    sah: 'Сахасрара',
                    aj: 'Аджна', 
                    vish: 'Вишудха',
                    anah: 'Анахата',
                    man: 'Манипура',
                    svad: 'Свадхистана',
                    mul: 'Муладхара'
                  }).map(([key, name]) => (
                    <div
                      key={key}
                      style={{
                        padding: 16,
                        marginBottom: 8,
                        background: 'var(--card-bg)',
                        borderRadius: 12,
                        opacity: 0.6,
                      }}
                    >
                      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                        {name}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Sparkles size={16} color="#666" />
                        <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                          Доступно с премиум подпиской
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Предназначение (новая секция) */}
              {isPremium ? (
                matrixData && (
                  <div style={{ marginTop: 24 }}>
                    <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent)', marginBottom: 12 }}>
                      Предназначение
                    </div>

                  {/* Предназначение 20-40 лет */}
                  <div style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                    <button
                      type="button"
                      onClick={() => toggleSection('purpose2040')}
                      style={{
                        width: '100%',
                        padding: 16,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>
                          Предназначение (20-40 лет)
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                          Число: {matrixData.purposes.perspurpose}
                        </div>
                      </div>
                      {expandedSections.purpose2040 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {expandedSections.purpose2040 && (
                      <div style={{ padding: '0 16px 16px' }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                          <span style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 32,
                            height: 32,
                            minWidth: 32,
                            borderRadius: '50%',
                            background: '#9c27b0',
                            color: '#fff',
                            fontSize: 16,
                            fontWeight: 700,
                            flexShrink: 0
                          }}>
                            {matrixData.purposes.perspurpose}
                          </span>
                          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, flex: 1 }}>
                            {PURPOSE_20_40[matrixData.purposes.perspurpose]?.description || 'Описание отсутствует'}
                          </p>
                        </div>
                        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>
                          {PURPOSE_20_40[matrixData.purposes.perspurpose]?.description || 'Описание отсутствует'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Предназначение 40-60 лет */}
                  <div style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                    <button
                      type="button"
                      onClick={() => toggleSection('purpose4060')}
                      style={{
                        width: '100%',
                        padding: 16,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>
                          Предназначение (40-60 лет)
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                          Число: {matrixData.purposes.socialpurpose}
                        </div>
                      </div>
                      {expandedSections.purpose4060 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {expandedSections.purpose4060 && (
                      <div style={{ padding: '0 16px 16px' }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                          <span style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 32,
                            height: 32,
                            minWidth: 32,
                            borderRadius: '50%',
                            background: '#9c27b0',
                            color: '#fff',
                            fontSize: 16,
                            fontWeight: 700,
                            flexShrink: 0
                          }}>
                            {matrixData.purposes.socialpurpose}
                          </span>
                          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, flex: 1 }}>
                            {PURPOSE_40_60[matrixData.purposes.socialpurpose]?.description || 'Описание отсутствует'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Общее предназначение */}
                  <div style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                    <button
                      type="button"
                      onClick={() => toggleSection('purposeGeneral')}
                      style={{
                        width: '100%',
                        padding: 16,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>
                          Предназначение (общее)
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                          Число: {matrixData.purposes.generalpurpose}
                        </div>
                      </div>
                      {expandedSections.purposeGeneral ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {expandedSections.purposeGeneral && (
                      <div style={{ padding: '0 16px 16px' }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                          <span style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 32,
                            height: 32,
                            minWidth: 32,
                            borderRadius: '50%',
                            background: '#9c27b0',
                            color: '#fff',
                            fontSize: 16,
                            fontWeight: 700,
                            flexShrink: 0
                          }}>
                            {matrixData.purposes.generalpurpose}
                          </span>
                          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, flex: 1 }}>
                            {PURPOSE_GENERAL[matrixData.purposes.generalpurpose]?.description || 'Описание отсутствует'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
              ) : (
                <div style={{ marginTop: 24 }}>
                  <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent)', marginBottom: 12 }}>
                    Предназначение
                  </div>
                  <div style={{
                    padding: 16,
                    marginBottom: 8,
                    background: 'var(--card-bg)',
                    borderRadius: 12,
                    opacity: 0.6,
                  }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                      Предназначение (20-40 лет)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sparkles size={16} color="#666" />
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                        Доступно с премиум подпиской
                      </span>
                    </div>
                  </div>
                  <div style={{
                    padding: 16,
                    marginBottom: 8,
                    background: 'var(--card-bg)',
                    borderRadius: 12,
                    opacity: 0.6,
                  }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                      Предназначение (40-60 лет)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sparkles size={16} color="#666" />
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                        Доступно с премиум подпиской
                      </span>
                    </div>
                  </div>
                  <div style={{
                    padding: 16,
                    marginBottom: 8,
                    background: 'var(--card-bg)',
                    borderRadius: 12,
                    opacity: 0.6,
                  }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                      Предназначение (общее)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sparkles size={16} color="#666" />
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                        Доступно с премиум подпиской
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Прогноз на год */}
              {isPremium ? (
                yearForecast && (
                  <div style={{ marginTop: 24 }}>
                    <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent)', marginBottom: 12 }}>
                      Прогноз на год
                    </div>

                  {/* Суть года, основной мотив */}
                  <div style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                    <button
                      type="button"
                      onClick={() => toggleSection('yearForecastEssence')}
                      style={{
                        width: '100%',
                        padding: 16,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>
                          Суть года, основной мотив
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                          Возраст: {yearForecast.age} {yearForecast.age >= 80 && `(цикл: ${yearForecast.effectiveAge})`} лет | Число: {yearForecast.essenceNumber}
                        </div>
                      </div>
                      {expandedSections.yearForecastEssence ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {expandedSections.yearForecastEssence && (
                      <div style={{ padding: '0 16px 16px' }}>
                        <div style={{ marginBottom: 16 }}>
                          <div style={{ fontSize: 15, fontWeight: 600, color: '#4caf50', marginBottom: 8 }}>
                            В плюсе:
                          </div>
                          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>
                            {YEAR_ESSENCE[yearForecast.essenceNumber]?.positive || 'Описание отсутствует'}
                          </p>
                        </div>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 600, color: '#e91e63', marginBottom: 8 }}>
                            В минусе:
                          </div>
                          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>
                            {YEAR_ESSENCE[yearForecast.essenceNumber]?.negative || 'Описание отсутствует'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Причины событий */}
                  <div style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                    <button
                      type="button"
                      onClick={() => toggleSection('yearForecastReasons')}
                      style={{
                        width: '100%',
                        padding: 16,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>
                          Причины событий
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                          Число: {yearForecast.reasonsNumber}
                        </div>
                      </div>
                      {expandedSections.yearForecastReasons ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {expandedSections.yearForecastReasons && (
                      <div style={{ padding: '0 16px 16px' }}>
                        <div style={{ marginBottom: 16 }}>
                          <div style={{ fontSize: 15, fontWeight: 600, color: '#4caf50', marginBottom: 8 }}>
                            В плюсе:
                          </div>
                          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>
                            {YEAR_REASONS[yearForecast.reasonsNumber]?.positive || 'Описание отсутствует'}
                          </p>
                        </div>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 600, color: '#e91e63', marginBottom: 8 }}>
                            В минусе:
                          </div>
                          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>
                            {YEAR_REASONS[yearForecast.reasonsNumber]?.negative || 'Описание отсутствует'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
              ) : (
                <div style={{ marginTop: 24 }}>
                  <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent)', marginBottom: 12 }}>
                    Прогноз на год
                  </div>
                  <div style={{
                    padding: 16,
                    marginBottom: 8,
                    background: 'var(--card-bg)',
                    borderRadius: 12,
                    opacity: 0.6,
                  }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                      Суть года
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sparkles size={16} color="#666" />
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                        Доступно с премиум подпиской
                      </span>
                    </div>
                  </div>
                  <div style={{
                    padding: 16,
                    marginBottom: 8,
                    background: 'var(--card-bg)',
                    borderRadius: 12,
                    opacity: 0.6,
                  }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                      Причины событий
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sparkles size={16} color="#666" />
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                        Доступно с премиум подпиской
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Испытания */}
              {isPremium ? (
                matrixData && (
                  <div style={{ marginTop: 24 }}>
                    <div style={{ fontSize: 20, fontWeight: 600, color: '#ffd700', marginBottom: 12 }}>
                      Испытания
                    </div>

                  <div style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                    <button
                      type="button"
                      onClick={() => toggleSection('challenges')}
                      style={{
                        width: '100%',
                        padding: 16,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>
                          Число: {matrixData.matrix[0].value}
                        </div>
                      </div>
                      {expandedSections.challenges ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {expandedSections.challenges && (
                      <div style={{ padding: '0 16px 16px' }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                          <span style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 32,
                            height: 32,
                            minWidth: 32,
                            borderRadius: '50%',
                            background: '#ffd700',
                            color: '#1a1a2e',
                            fontSize: 16,
                            fontWeight: 700,
                            flexShrink: 0
                          }}>
                            {matrixData.matrix[0].value}
                          </span>
                          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line', flex: 1 }}>
                            {CHALLENGES[matrixData.matrix[0].value]?.description || 'Описание отсутствует'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
              ) : (
                <div style={{ marginTop: 24 }}>
                  <div style={{ fontSize: 20, fontWeight: 600, color: '#ffd700', marginBottom: 12 }}>
                    Испытания
                  </div>
                  <div style={{
                    padding: 16,
                    marginBottom: 8,
                    background: 'var(--card-bg)',
                    borderRadius: 12,
                    opacity: 0.6,
                  }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                      Испытания
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sparkles size={16} color="#666" />
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                        Доступно с премиум подпиской
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Отношения */}
              {isPremium ? (
                matrixData && (
                  <div style={{ marginTop: 24 }}>
                    <div style={{ fontSize: 20, fontWeight: 600, color: '#ffd700', marginBottom: 12 }}>
                      Отношения
                    </div>

                  {/* Отношения для женщин */}
                  <div style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                    <button
                      type="button"
                      onClick={() => toggleSection('relationshipsWomen')}
                      style={{
                        width: '100%',
                        padding: 16,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>
                          Отношения для женщин
                        </div>
                      </div>
                      {expandedSections.relationshipsWomen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {expandedSections.relationshipsWomen && (
                      <div style={{ padding: '0 16px 16px' }}>
                        {(() => {
                          const shownNumbers = new Set<number>();
                          const numbers = [
                            { value: matrixData.matrix[12].value, index: 12 },
                            { value: matrixData.matrix[16].value, index: 16 }
                          ];
                          
                          return numbers.map((num, idx) => {
                            if (shownNumbers.has(num.value)) {
                              return null;
                            }
                            shownNumbers.add(num.value);
                            
                            const isLast = idx === numbers.length - 1 || numbers.slice(idx + 1).every(n => shownNumbers.has(n.value));
                            
                            return (
                              <div 
                                key={num.index}
                                style={{ 
                                  marginBottom: !isLast ? 16 : 0, 
                                  paddingBottom: !isLast ? 16 : 0, 
                                  borderBottom: !isLast ? '1px solid rgba(255,255,255,0.1)' : 'none' 
                                }}
                              >
                                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                  <span style={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 32,
                                    height: 32,
                                    minWidth: 32,
                                    borderRadius: '50%',
                                    background: '#ffd700',
                                    color: '#1a1a2e',
                                    fontSize: 16,
                                    fontWeight: 700,
                                    flexShrink: 0
                                  }}>
                                    {num.value}
                                  </span>
                                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line', flex: 1 }}>
                                    {RELATIONSHIPS_WOMEN[num.value] || 'Описание отсутствует'}
                                  </p>
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    )}
                  </div>

                  {/* Отношения для мужчин */}
                  <div style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                    <button
                      type="button"
                      onClick={() => toggleSection('relationshipsMen')}
                      style={{
                        width: '100%',
                        padding: 16,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>
                          Отношения для мужчин
                        </div>
                      </div>
                      {expandedSections.relationshipsMen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {expandedSections.relationshipsMen && (
                      <div style={{ padding: '0 16px 16px' }}>
                        {(() => {
                          const shownNumbers = new Set<number>();
                          const numbers = [
                            { value: matrixData.matrix[12].value, index: 12 },
                            { value: matrixData.matrix[16].value, index: 16 }
                          ];
                          
                          return numbers.map((num, idx) => {
                            if (shownNumbers.has(num.value)) {
                              return null;
                            }
                            shownNumbers.add(num.value);
                            
                            const isLast = idx === numbers.length - 1 || numbers.slice(idx + 1).every(n => shownNumbers.has(n.value));
                            
                            return (
                              <div 
                                key={num.index}
                                style={{ 
                                  marginBottom: !isLast ? 16 : 0, 
                                  paddingBottom: !isLast ? 16 : 0, 
                                  borderBottom: !isLast ? '1px solid rgba(255,255,255,0.1)' : 'none' 
                                }}
                              >
                                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                  <span style={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 32,
                                    height: 32,
                                    minWidth: 32,
                                    borderRadius: '50%',
                                    background: '#ffd700',
                                    color: '#1a1a2e',
                                    fontSize: 16,
                                    fontWeight: 700,
                                    flexShrink: 0
                                  }}>
                                    {num.value}
                                  </span>
                                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line', flex: 1 }}>
                                    {RELATIONSHIPS_MEN[num.value] || 'Описание отсутствует'}
                                  </p>
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    )}
                  </div>

                  {/* На выходе */}
                  <div style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                    <button
                      type="button"
                      onClick={() => toggleSection('relationshipsExit')}
                      style={{
                        width: '100%',
                        padding: 16,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>
                          На выходе
                        </div>
                      </div>
                      {expandedSections.relationshipsExit ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {expandedSections.relationshipsExit && (
                      <div style={{ padding: '0 16px 16px' }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                          <span style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 32,
                            height: 32,
                            minWidth: 32,
                            borderRadius: '50%',
                            background: '#ffd700',
                            color: '#1a1a2e',
                            fontSize: 16,
                            fontWeight: 700,
                            flexShrink: 0
                          }}>
                            {matrixData.matrix[15].value}
                          </span>
                          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line', flex: 1 }}>
                            {EXIT_REASONS[matrixData.matrix[15].value] || 'Описание отсутствует'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Характер партнера */}
                  <div style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                    <button
                      type="button"
                      onClick={() => toggleSection('relationshipsCharacter')}
                      style={{
                        width: '100%',
                        padding: 16,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>
                          Характер партнера
                        </div>
                      </div>
                      {expandedSections.relationshipsCharacter ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {expandedSections.relationshipsCharacter && (
                      <div style={{ padding: '0 16px 16px' }}>
                        {(() => {
                          const shownNumbers = new Set<number>();
                          const numbers = [
                            { value: matrixData.matrix[12].value, index: 12 },
                            { value: matrixData.matrix[16].value, index: 16 }
                          ];
                          
                          return numbers.map((num, idx) => {
                            if (shownNumbers.has(num.value)) {
                              return null;
                            }
                            shownNumbers.add(num.value);
                            
                            const isLast = idx === numbers.length - 1 || numbers.slice(idx + 1).every(n => shownNumbers.has(n.value));
                            
                            return (
                              <div 
                                key={num.index}
                                style={{ 
                                  marginBottom: !isLast ? 16 : 0, 
                                  paddingBottom: !isLast ? 16 : 0, 
                                  borderBottom: !isLast ? '1px solid rgba(255,255,255,0.1)' : 'none' 
                                }}
                              >
                                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                  <span style={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 32,
                                    height: 32,
                                    minWidth: 32,
                                    borderRadius: '50%',
                                    background: '#ffd700',
                                    color: '#1a1a2e',
                                    fontSize: 16,
                                    fontWeight: 700,
                                    flexShrink: 0
                                  }}>
                                    {num.value}
                                  </span>
                                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line', flex: 1 }}>
                                    {CHARACTER[num.value] || 'Описание отсутствует'}
                                  </p>
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    )}
                  </div>
                </div>
              )
              ) : (
                <div style={{ marginTop: 24 }}>
                  <div style={{ fontSize: 20, fontWeight: 600, color: '#ffd700', marginBottom: 12 }}>
                    Отношения
                  </div>
                  <div style={{
                    padding: 16,
                    marginBottom: 8,
                    background: 'var(--card-bg)',
                    borderRadius: 12,
                    opacity: 0.6,
                  }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                      Отношения для женщин
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sparkles size={16} color="#666" />
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                        Доступно с премиум подпиской
                      </span>
                    </div>
                  </div>
                  <div style={{
                    padding: 16,
                    marginBottom: 8,
                    background: 'var(--card-bg)',
                    borderRadius: 12,
                    opacity: 0.6,
                  }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                      Отношения для мужчин
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sparkles size={16} color="#666" />
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                        Доступно с премиум подпиской
                      </span>
                    </div>
                  </div>
                  <div style={{
                    padding: 16,
                    marginBottom: 8,
                    background: 'var(--card-bg)',
                    borderRadius: 12,
                    opacity: 0.6,
                  }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                      Причины выхода из отношений
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sparkles size={16} color="#666" />
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                        Доступно с премиум подпиской
                      </span>
                    </div>
                  </div>
                  <div style={{
                    padding: 16,
                    marginBottom: 8,
                    background: 'var(--card-bg)',
                    borderRadius: 12,
                    opacity: 0.6,
                  }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                      Характер в отношениях
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sparkles size={16} color="#666" />
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                        Доступно с премиум подпиской
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Деньги */}
              {isPremium ? (
                matrixData && (
                <div style={{ marginTop: 24 }}>
                  <div style={{ fontSize: 20, fontWeight: 600, color: '#ffd700', marginBottom: 12 }}>
                    Деньги
                  </div>

                  {/* Направление деятельности */}
                  <div style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                    <button
                      type="button"
                      onClick={() => toggleSection('moneyDirection')}
                      style={{
                        width: '100%',
                        padding: 16,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>
                          Направление деятельности
                        </div>
                      </div>
                      {expandedSections.moneyDirection ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {expandedSections.moneyDirection && (
                      <div style={{ padding: '0 16px 16px' }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                          <span style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 32,
                            height: 32,
                            minWidth: 32,
                            borderRadius: '50%',
                            background: '#ffd700',
                            color: '#1a1a2e',
                            fontSize: 16,
                            fontWeight: 700,
                            flexShrink: 0
                          }}>
                            {matrixData.matrix[15].value}
                          </span>
                          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line', flex: 1 }}>
                            {MONEY_DIRECTION[matrixData.matrix[15].value]?.description || 'Описание отсутствует'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Для достижения успеха важно */}
                  <div style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                    <button
                      type="button"
                      onClick={() => toggleSection('moneySuccess')}
                      style={{
                        width: '100%',
                        padding: 16,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>
                          Для достижения успеха важно
                        </div>
                      </div>
                      {expandedSections.moneySuccess ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {expandedSections.moneySuccess && (
                      <div style={{ padding: '0 16px 16px' }}>
                        {(() => {
                          const shownNumbers = new Set<number>();
                          const numbers = [
                            { value: matrixData.matrix[25].value, index: 25 },
                            { value: matrixData.matrix[11].value, index: 11 }
                          ];
                          
                          return numbers.map((num, idx) => {
                            if (shownNumbers.has(num.value)) {
                              return null;
                            }
                            shownNumbers.add(num.value);
                            
                            const isLast = idx === numbers.length - 1 || numbers.slice(idx + 1).every(n => shownNumbers.has(n.value));
                            
                            return (
                              <div 
                                key={num.index}
                                style={{ 
                                  marginBottom: !isLast ? 16 : 0, 
                                  paddingBottom: !isLast ? 16 : 0, 
                                  borderBottom: !isLast ? '1px solid rgba(255,255,255,0.1)' : 'none' 
                                }}
                              >
                                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                  <span style={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 32,
                                    height: 32,
                                    minWidth: 32,
                                    borderRadius: '50%',
                                    background: '#ffd700',
                                    color: '#1a1a2e',
                                    fontSize: 16,
                                    fontWeight: 700,
                                    flexShrink: 0
                                  }}>
                                    {num.value}
                                  </span>
                                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line', flex: 1 }}>
                                    {MONEY_SUCCESS[num.value]?.description || 'Описание отсутствует'}
                                  </p>
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    )}
                  </div>

                  {/* Как раскрыть денежный поток */}
                  <div style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                    <button
                      type="button"
                      onClick={() => toggleSection('moneyFlow')}
                      style={{
                        width: '100%',
                        padding: 16,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>
                          Как раскрыть денежный поток
                        </div>
                      </div>
                      {expandedSections.moneyFlow ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {expandedSections.moneyFlow && (
                      <div style={{ padding: '0 16px 16px' }}>
                        {(() => {
                          const shownNumbers = new Set<number>();
                          const numbers = [
                            { value: matrixData.matrix[19].value, index: 19 },
                            { value: matrixData.matrix[3].value, index: 3 }
                          ];
                          
                          return numbers.map((num, idx) => {
                            if (shownNumbers.has(num.value)) {
                              return null;
                            }
                            shownNumbers.add(num.value);
                            
                            const isLast = idx === numbers.length - 1 || numbers.slice(idx + 1).every(n => shownNumbers.has(n.value));
                            
                            return (
                              <div 
                                key={num.index}
                                style={{ 
                                  marginBottom: !isLast ? 16 : 0, 
                                  paddingBottom: !isLast ? 16 : 0, 
                                  borderBottom: !isLast ? '1px solid rgba(255,255,255,0.1)' : 'none' 
                                }}
                              >
                                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                  <span style={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 32,
                                    height: 32,
                                    minWidth: 32,
                                    borderRadius: '50%',
                                    background: '#ffd700',
                                    color: '#1a1a2e',
                                    fontSize: 16,
                                    fontWeight: 700,
                                    flexShrink: 0
                                  }}>
                                    {num.value}
                                  </span>
                                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line', flex: 1 }}>
                                    {MONEY_FLOW[num.value]?.description || 'Описание отсутствует'}
                                  </p>
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    )}
                  </div>
                </div>
              )
              ) : (
                <div style={{ marginTop: 24 }}>
                  <div style={{ fontSize: 20, fontWeight: 600, color: '#ffd700', marginBottom: 12 }}>
                    Деньги
                  </div>
                  <div style={{
                    padding: 16,
                    marginBottom: 8,
                    background: 'var(--card-bg)',
                    borderRadius: 12,
                    opacity: 0.6,
                  }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                      Направление для заработка
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sparkles size={16} color="#666" />
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                        Доступно с премиум подпиской
                      </span>
                    </div>
                  </div>
                  <div style={{
                    padding: 16,
                    marginBottom: 8,
                    background: 'var(--card-bg)',
                    borderRadius: 12,
                    opacity: 0.6,
                  }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                      Успех в деньгах
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sparkles size={16} color="#666" />
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                        Доступно с премиум подпиской
                      </span>
                    </div>
                  </div>
                  <div style={{
                    padding: 16,
                    marginBottom: 8,
                    background: 'var(--card-bg)',
                    borderRadius: 12,
                    opacity: 0.6,
                  }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                      Денежный поток
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sparkles size={16} color="#666" />
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                        Доступно с премиум подпиской
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Родители */}
              {isPremium ? (
                matrixData && (
                <div style={{ marginTop: 24 }}>
                  <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent)', marginBottom: 12 }}>
                    Родители
                  </div>

                  {/* Родовые программы по мужской линии */}
                  <div style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                    <button
                      type="button"
                      onClick={() => toggleSection('parentsMaleLine')}
                      style={{
                        width: '100%',
                        padding: 16,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>
                          Родовые программы по мужской линии
                        </div>
                      </div>
                      {expandedSections.parentsMaleLine ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {expandedSections.parentsMaleLine && (
                      <div style={{ padding: '0 16px 16px' }}>
                        {(() => {
                          const shownNumbers = new Set<number>();
                          const numbers = [
                            { value: matrixData.matrix[5].value, index: 5 },
                            { value: matrixData.matrix[27].value, index: 27 },
                            { value: matrixData.matrix[26].value, index: 26 },
                            { value: matrixData.matrix[30].value, index: 30 },
                            { value: matrixData.matrix[31].value, index: 31 },
                            { value: matrixData.matrix[7].value, index: 7 }
                          ];
                          
                          return numbers.map((num, idx) => {
                            if (shownNumbers.has(num.value)) {
                              return null;
                            }
                            shownNumbers.add(num.value);
                            
                            const isLast = idx === numbers.length - 1 || numbers.slice(idx + 1).every(n => shownNumbers.has(n.value));
                            
                            return (
                              <div 
                                key={num.index}
                                style={{ 
                                  marginBottom: !isLast ? 16 : 0, 
                                  paddingBottom: !isLast ? 16 : 0, 
                                  borderBottom: !isLast ? '1px solid rgba(255,255,255,0.1)' : 'none' 
                                }}
                              >
                                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                  <span style={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 32,
                                    height: 32,
                                    minWidth: 32,
                                    borderRadius: '50%',
                                    background: '#2196f3',
                                    color: '#fff',
                                    fontSize: 16,
                                    fontWeight: 700,
                                    flexShrink: 0
                                  }}>
                                    {num.value}
                                  </span>
                                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line', flex: 1 }}>
                                    {PARENTS_MALE_LINE[num.value] || 'Описание отсутствует'}
                                  </p>
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    )}
                  </div>

                  {/* Родовые программы по женской линии */}
                  <div style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                    <button
                      type="button"
                      onClick={() => toggleSection('parentsFemaleLine')}
                      style={{
                        width: '100%',
                        padding: 16,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>
                          Родовые программы по женской линии
                        </div>
                      </div>
                      {expandedSections.parentsFemaleLine ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {expandedSections.parentsFemaleLine && (
                      <div style={{ padding: '0 16px 16px' }}>
                        {(() => {
                          const shownNumbers = new Set<number>();
                          const numbers = [
                            { value: matrixData.matrix[6].value, index: 6 },
                            { value: matrixData.matrix[29].value, index: 29 },
                            { value: matrixData.matrix[28].value, index: 28 },
                            { value: matrixData.matrix[32].value, index: 32 },
                            { value: matrixData.matrix[33].value, index: 33 },
                            { value: matrixData.matrix[8].value, index: 8 }
                          ];
                          
                          return numbers.map((num, idx) => {
                            if (shownNumbers.has(num.value)) {
                              return null;
                            }
                            shownNumbers.add(num.value);
                            
                            const isLast = idx === numbers.length - 1 || numbers.slice(idx + 1).every(n => shownNumbers.has(n.value));
                            
                            return (
                              <div 
                                key={num.index}
                                style={{ 
                                  marginBottom: !isLast ? 16 : 0, 
                                  paddingBottom: !isLast ? 16 : 0, 
                                  borderBottom: !isLast ? '1px solid rgba(255,255,255,0.1)' : 'none' 
                                }}
                              >
                                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                  <span style={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 32,
                                    height: 32,
                                    minWidth: 32,
                                    borderRadius: '50%',
                                    background: '#e91e63',
                                    color: '#fff',
                                    fontSize: 16,
                                    fontWeight: 700,
                                    flexShrink: 0
                                  }}>
                                    {num.value}
                                  </span>
                                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line', flex: 1 }}>
                                    {PARENTS_FEMALE_LINE[num.value] || 'Описание отсутствует'}
                                  </p>
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    )}
                  </div>

                  {/* Обиды на родителей */}
                  <div style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                    <button
                      type="button"
                      onClick={() => toggleSection('parentsResentments')}
                      style={{
                        width: '100%',
                        padding: 16,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>
                          Обиды на родителей
                        </div>
                      </div>
                      {expandedSections.parentsResentments ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {expandedSections.parentsResentments && (
                      <div style={{ padding: '0 16px 16px' }}>
                        {(() => {
                          const shownNumbers = new Set<number>();
                          const numbers = [
                            { value: matrixData.matrix[9].value, index: 9 },
                            { value: matrixData.matrix[17].value, index: 17 },
                            { value: matrixData.matrix[1].value, index: 1 }
                          ];
                          
                          return numbers.map((num, idx) => {
                            if (shownNumbers.has(num.value)) {
                              return null;
                            }
                            shownNumbers.add(num.value);
                            
                            const isLast = idx === numbers.length - 1 || numbers.slice(idx + 1).every(n => shownNumbers.has(n.value));
                            
                            return (
                              <div 
                                key={num.index}
                                style={{ 
                                  marginBottom: !isLast ? 16 : 0, 
                                  paddingBottom: !isLast ? 16 : 0, 
                                  borderBottom: !isLast ? '1px solid rgba(255,255,255,0.1)' : 'none' 
                                }}
                              >
                                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                  <span style={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 32,
                                    height: 32,
                                    minWidth: 32,
                                    borderRadius: '50%',
                                    background: '#ff9800',
                                    color: '#fff',
                                    fontSize: 16,
                                    fontWeight: 700,
                                    flexShrink: 0
                                  }}>
                                    {num.value}
                                  </span>
                                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line', flex: 1 }}>
                                    {PARENTS_RESENTMENTS[num.value] || 'Описание отсутствует'}
                                  </p>
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    )}
                  </div>
                </div>
              )
              ) : (
                <div style={{ marginTop: 24 }}>
                  <div style={{ fontSize: 20, fontWeight: 600, color: '#ffd700', marginBottom: 12 }}>
                    Родители
                  </div>
                  <div style={{
                    padding: 16,
                    marginBottom: 8,
                    background: 'var(--card-bg)',
                    borderRadius: 12,
                    opacity: 0.6,
                  }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                      Мужская линия
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sparkles size={16} color="#666" />
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                        Доступно с премиум подпиской
                      </span>
                    </div>
                  </div>
                  <div style={{
                    padding: 16,
                    marginBottom: 8,
                    background: 'var(--card-bg)',
                    borderRadius: 12,
                    opacity: 0.6,
                  }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                      Женская линия
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sparkles size={16} color="#666" />
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                        Доступно с премиум подпиской
                      </span>
                    </div>
                  </div>
                  <div style={{
                    padding: 16,
                    marginBottom: 8,
                    background: 'var(--card-bg)',
                    borderRadius: 12,
                    opacity: 0.6,
                  }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                      Обиды на родителей
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sparkles size={16} color="#666" />
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                        Доступно с премиум подпиской
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Дети */}
              {isPremium ? (
                matrixData && (
                <div style={{ marginTop: 24 }}>
                  <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent)', marginBottom: 12 }}>
                    Дети
                  </div>

                  <div style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                    <button
                      type="button"
                      onClick={() => toggleSection('children')}
                      style={{
                        width: '100%',
                        padding: 16,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>
                          Ошибки по отношению к детям
                        </div>
                      </div>
                      {expandedSections.children ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {expandedSections.children && (
                      <div style={{ padding: '0 16px 16px' }}>
                        {(() => {
                          const shownNumbers = new Set<number>();
                          const numbers = [
                            { value: matrixData.matrix[9].value, index: 9 },
                            { value: matrixData.matrix[17].value, index: 17 },
                            { value: matrixData.matrix[1].value, index: 1 }
                          ];
                          
                          return numbers.map((num, idx) => {
                            if (shownNumbers.has(num.value)) {
                              return null;
                            }
                            shownNumbers.add(num.value);
                            
                            const isLast = idx === numbers.length - 1 || numbers.slice(idx + 1).every(n => shownNumbers.has(n.value));
                            
                            return (
                              <div 
                                key={num.index}
                                style={{ 
                                  marginBottom: !isLast ? 16 : 0, 
                                  paddingBottom: !isLast ? 16 : 0, 
                                  borderBottom: !isLast ? '1px solid rgba(255,255,255,0.1)' : 'none' 
                                }}
                              >
                                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                  <span style={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 32,
                                    height: 32,
                                    minWidth: 32,
                                    borderRadius: '50%',
                                    background: '#4caf50',
                                    color: '#fff',
                                    fontSize: 16,
                                    fontWeight: 700,
                                    flexShrink: 0
                                  }}>
                                    {num.value}
                                  </span>
                                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line', flex: 1 }}>
                                    {CHILDREN_MISTAKES[num.value] || 'Описание отсутствует'}
                                  </p>
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    )}
                  </div>
                </div>
              )
              ) : (
                <div style={{ marginTop: 24 }}>
                  <div style={{ fontSize: 20, fontWeight: 600, color: '#ffd700', marginBottom: 12 }}>
                    Дети
                  </div>
                  <div style={{
                    padding: 16,
                    marginBottom: 8,
                    background: 'var(--card-bg)',
                    borderRadius: 12,
                    opacity: 0.6,
                  }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                      Ошибки в воспитании детей
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sparkles size={16} color="#666" />
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                        Доступно с премиум подпиской
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Руководство */}
              {isPremium ? (
                matrixData && (
                <div style={{ marginTop: 24 }}>
                  <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent)', marginBottom: 12 }}>
                    Руководство
                  </div>

                  <div style={{ marginBottom: 8, background: 'var(--card-bg)', borderRadius: 12, overflow: 'hidden' }}>
                    <button
                      type="button"
                      onClick={() => toggleSection('management')}
                      style={{
                        width: '100%',
                        padding: 16,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>
                          Рекомендации по управлению
                        </div>
                      </div>
                      {expandedSections.management ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {expandedSections.management && (
                      <div style={{ padding: '0 16px 16px' }}>
                        {(() => {
                          const shownNumbers = new Set<number>();
                          const numbers = [
                            { value: matrixData.matrix[1].value, index: 1 },
                            { value: matrixData.matrix[2].value, index: 2 },
                            { value: matrixData.matrix[0].value, index: 0 }
                          ];
                          
                          return numbers.map((num, idx) => {
                            if (shownNumbers.has(num.value)) {
                              return null;
                            }
                            shownNumbers.add(num.value);
                            
                            const isLast = idx === numbers.length - 1 || numbers.slice(idx + 1).every(n => shownNumbers.has(n.value));
                            
                            return (
                              <div 
                                key={num.index}
                                style={{ 
                                  marginBottom: !isLast ? 16 : 0, 
                                  paddingBottom: !isLast ? 16 : 0, 
                                  borderBottom: !isLast ? '1px solid rgba(255,255,255,0.1)' : 'none' 
                                }}
                              >
                                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                  <span style={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 32,
                                    height: 32,
                                    minWidth: 32,
                                    borderRadius: '50%',
                                    background: '#9c27b0',
                                    color: '#fff',
                                    fontSize: 16,
                                    fontWeight: 700,
                                    flexShrink: 0
                                  }}>
                                    {num.value}
                                  </span>
                                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line', flex: 1 }}>
                                    {MANAGEMENT_GUIDANCE[num.value] || 'Описание отсутствует'}
                                  </p>
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    )}
                  </div>
                </div>
              )
              ) : (
                <div style={{ marginTop: 24 }}>
                  <div style={{ fontSize: 20, fontWeight: 600, color: '#ffd700', marginBottom: 12 }}>
                    Руководство
                  </div>
                  <div style={{
                    padding: 16,
                    marginBottom: 8,
                    background: 'var(--card-bg)',
                    borderRadius: 12,
                    opacity: 0.6,
                  }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                      Руководство
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sparkles size={16} color="#666" />
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                        Доступно с премиум подпиской
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {!isPremium && (
                <button
                  type="button"
                  className="btn-primary"
                  style={{ width: '100%', marginTop: 10 }}
                  onClick={() => navigate('/subscription')}
                >
                  <Sparkles size={20} />
                  Разблокировать полную матрицу
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
