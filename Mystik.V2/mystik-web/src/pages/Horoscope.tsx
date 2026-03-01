import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar, Crown, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useUser } from '@/providers/UserProvider';
import { useSubscription } from '@/providers/SubscriptionProvider';
import { useAuth } from '@/providers/AuthProvider';
import { ZODIAC_SIGNS, getZodiacSign } from '@/constants/zodiac';
import { PERSONALITY_TRAITS } from '@/constants/personality';
import { TALENTS } from '@/constants/talents';
import { PAST_LIVES } from '@/constants/pastLives';
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
  const [expandedSections, setExpandedSections] = useState<{
    positive: boolean;
    negative: boolean;
    communication: boolean;
    superpower: boolean;
    talentGod: boolean;
    talentFather: boolean;
    talentMother: boolean;
    pastLife: boolean;
  }>({
    positive: false,
    negative: false,
    communication: false,
    superpower: false,
    talentGod: false,
    talentFather: false,
    talentMother: false,
    pastLife: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  useEffect(() => {
    if (user?.birthDate && !birthDate) {
      const [year, month, day] = user.birthDate.split('-');
      const formattedDate = `${day}.${month}.${year}`;
      setBirthDate(formattedDate);
      setDateInput(formattedDate);
    } else if (birthDate) {
      setDateInput(birthDate);
    }
  }, [user, birthDate, setBirthDate]);

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

  const zodiacSign = birthDate ? getZodiacSign(birthDate) : null;
  const zodiacData = zodiacSign ? ZODIAC_SIGNS[zodiacSign] : null;

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
                    <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                      {zodiacData.horoscope[selectedPeriod]}
                    </p>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: 20 }}>
                    <Crown size={28} color="var(--accent)" style={{ marginBottom: 12 }} />
                    <p style={{ color: 'var(--text-muted)', marginBottom: 12 }}>Доступно только для премиум</p>
                    <button type="button" className="btn-primary" onClick={() => navigate('/subscription')}>
                      Открыть доступ
                    </button>
                  </div>
                )}
              </div>
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
                <MatrixSVG matrix={matrixData.matrix} isPremium={isPremium} />
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
                    opacity: !isPremium ? 0.6 : 1,
                  }}
                >
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, textTransform: 'capitalize' }}>
                    {name === 'sah' ? 'Сахасрара' : name === 'aj' ? 'Аджна' : name === 'vish' ? 'Вишудха' : 
                     name === 'anah' ? 'Анахата' : name === 'man' ? 'Манипура' : name === 'svad' ? 'Свадхистана' : 'Муладхара'}
                  </div>
                  {isPremium ? (
                    <div style={{ display: 'flex', gap: 16, fontSize: 14, color: 'var(--text-muted)' }}>
                      <div>Физика: {data.physics}</div>
                      <div>Энергия: {data.energy}</div>
                      <div>Эмоции: {data.emotions}</div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sparkles size={16} color="#666" />
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                        Доступно с премиум подпиской
                      </span>
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
                          color: '#fff',
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
                            color: '#fff',
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
              {talents && (
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
              )}

              {/* Прошлая жизнь */}
              {pastLife && (
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

          <button
            type="button"
            onClick={() => {
              setBirthDate('');
              setDateInput('');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              margin: 20,
              padding: 12,
              background: 'rgba(255,215,0,0.2)',
              borderRadius: 12,
              color: 'var(--accent)',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            <Calendar size={20} />
            Изменить дату рождения
          </button>
        </>
      )}
    </div>
  );
}
