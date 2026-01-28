import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar, Crown, Sparkles } from 'lucide-react';
import { useUser } from '@/providers/UserProvider';
import { useSubscription } from '@/providers/SubscriptionProvider';
import { ZODIAC_SIGNS, getZodiacSign } from '@/constants/zodiac';

interface HoroscopeProps {
  tab?: string;
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

const getArcanaName = (num: number): string => {
  const arcanas = [
    '', 'Маг', 'Верховная Жрица', 'Императрица', 'Император', 'Иерофант', 'Влюбленные',
    'Колесница', 'Сила', 'Отшельник', 'Колесо Фортуны', 'Справедливость', 'Повешенный',
    'Смерть', 'Умеренность', 'Дьявол', 'Башня', 'Звезда', 'Луна', 'Солнце', 'Суд', 'Мир', 'Шут',
  ];
  return arcanas[num] || `Аркан ${num}`;
};

const POINT_DESCRIPTIONS = [
  'Центральная точка матрицы (Д) — предназначение, жизненный сценарий.',
  'День рождения (А2) — глубинные личные качества, таланты.',
  'Месяц рождения (Б2) — глубинная зона комфорта, родители.',
  'Год рождения (В2) — глубинные таланты, наследство.',
  'Сумма А+Б+В (Г2) — глубинная кармическая задача.',
  'А + Б (Е2) — энергия родителей, семейные программы.',
  'Б + В (Ж2) — энергия отношений, партнерство.',
  'В + Г (И2) — энергия карьеры, деньги.',
  'А + Г (З2) — энергия здоровья, программы.',
];

function calculateMatrix(date: string): { value: number; meaning: string; locked?: boolean }[] | null {
  const match = date.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) return null;
  const [, dayStr, monthStr, yearStr] = match;
  const day = parseInt(dayStr!, 10);
  const month = parseInt(monthStr!, 10);
  const year = parseInt(yearStr!, 10);
  const daysInMonth = new Date(year, month, 0).getDate();
  if (month < 1 || month > 12 || day < 1 || day > daysInMonth) return null;

  const reduceNum = (n: number): number => {
    while (n > 22) {
      n = n
        .toString()
        .split('')
        .map(Number)
        .reduce((sum, d) => sum + d, 0);
    }
    return n;
  };

  const A = reduceNum(day);
  const B = reduceNum(month);
  const V = reduceNum(year);
  const G = reduceNum(A + B + V);
  const D = reduceNum(A + B + V + G);
  const E = reduceNum(A + B);
  const Zh = reduceNum(B + V);
  const I = reduceNum(V + G);
  const Z = reduceNum(A + G);

  const points = [
    { value: D, meaning: 'Центр матрицы (Д)' },
    { value: reduceNum(day + D), meaning: 'День (А2)' },
    { value: reduceNum(month + D), meaning: 'Месяц (Б2)' },
    { value: reduceNum(year + D), meaning: 'Год (В2)' },
    { value: reduceNum(G + D), meaning: 'Г2' },
    { value: E, meaning: 'Е', locked: true },
    { value: Zh, meaning: 'Ж', locked: true },
    { value: I, meaning: 'И', locked: true },
    { value: Z, meaning: 'З', locked: true },
  ];
  return points;
}

export default function Horoscope({ tab: initialTab }: HoroscopeProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { birthDate, setBirthDate } = useUser();
  const { isPremium } = useSubscription();
  const [dateInput, setDateInput] = useState(birthDate || '');
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');
  const [activeTab, setActiveTab] = useState<'horoscope' | 'matrix'>(
    initialTab === 'matrix' || searchParams.get('tab') === 'matrix' ? 'matrix' : 'horoscope'
  );

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

  const matrix = useMemo(() => {
    if (!birthDate || !/^\d{2}\.\d{2}\.\d{4}$/.test(birthDate)) return null;
    return calculateMatrix(birthDate);
  }, [birthDate, isPremium]);

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

          {activeTab === 'matrix' && matrix && (
            <div style={{ padding: 20 }}>
              <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent)', marginBottom: 12 }}>
                Расшифровка точек
              </div>
              {matrix.map((point, index) => (
                <div
                  key={index}
                  style={{
                    padding: 16,
                    marginBottom: 8,
                    background: 'var(--card-bg)',
                    borderRadius: 12,
                    opacity: point.locked ? 0.6 : 1,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: point.locked ? 0 : 8 }}>
                    <span style={{ fontSize: 24, fontWeight: 700, color: 'var(--accent)', width: 40, textAlign: 'center' }}>
                      {point.locked ? '?' : point.value}
                    </span>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 600 }}>{point.meaning}</div>
                      {!point.locked && (
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                          {getArcanaName(point.value)}
                        </div>
                      )}
                    </div>
                    {point.locked && <Sparkles size={20} color="#666" />}
                  </div>
                  {!point.locked && (
                    <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.4, margin: 0 }}>
                      {POINT_DESCRIPTIONS[index] || 'Дополнительная характеристика.'}
                    </p>
                  )}
                  {point.locked && (
                    <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>
                      Разблокируйте полную расшифровку с премиум подпиской
                    </p>
                  )}
                </div>
              ))}
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
