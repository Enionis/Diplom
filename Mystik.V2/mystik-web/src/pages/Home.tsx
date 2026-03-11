import { Link } from 'react-router-dom';
import { Sparkles, Star, Grid3X3, BookCheck, Crown } from 'lucide-react';
import { useSubscription } from '@/providers/SubscriptionProvider';
import { useDailyCard } from '@/hooks/useDailyCard';
import { getDailyAdvice } from '@/constants/dailyAdvice';

const features = [
  {
    icon: Sparkles,
    title: 'Карта дня',
    getDescription: (card: { name: string } | null) =>
      card ? `Сегодня: ${card.name}` : 'Узнай свою карту',
    route: '/tarot',
    gradient: 'linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)',
  },
  {
    icon: Star,
    title: 'Гороскоп',
    description: 'Персональный прогноз',
    route: '/horoscope',
    gradient: 'linear-gradient(135deg, #2196f3 0%, #3f51b5 100%)',
  },
  {
    icon: Grid3X3,
    title: 'Матрица судьбы',
    description: 'Расшифруй свой код',
    route: '/horoscope/matrix',
    gradient: 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)',
  },
  {
    icon: BookCheck,
    title: 'Тесты',
    description: 'Узнай больше о себе',
    route: '/tests',
    gradient: 'linear-gradient(135deg, #ff9800 0%, #ff5722 100%)',
  },
];

export default function Home() {
  const { isPremium } = useSubscription();
  const { card } = useDailyCard();
  const dailyAdvice = getDailyAdvice();

  return (
    <div style={{ paddingBottom: 24 }}>
      <header
        className="gradient-header"
        style={{
          padding: 24,
          paddingTop: 40,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, marginBottom: 8 }}>
          Добро пожаловать
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text-muted)', margin: 0 }}>
          в мир мистики и самопознания
        </p>
        {!isPremium && (
          <Link
            to="/subscription"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 20,
              padding: '12px 20px',
              borderRadius: 20,
              background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
              color: '#1a1a2e',
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            <Crown size={20} />
            Открой безлимит
          </Link>
        )}
      </header>

      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {features.map((f, i) => (
          <Link
            key={i}
            to={f.route}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: 20,
              borderRadius: 20,
              background: f.gradient,
              color: '#fff',
            }}
          >
            <f.icon size={32} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{f.title}</div>
              <div style={{ fontSize: 14, opacity: 0.9 }}>
                {'description' in f ? f.description : f.getDescription(card)}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div
        style={{
          margin: 20,
          padding: 20,
          background: 'rgba(255,215,0,0.1)',
          borderRadius: 16,
          border: '1px solid rgba(255,215,0,0.2)',
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--accent)', marginBottom: 8 }}>
          💫 Совет дня
        </div>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.4, margin: 0 }}>
          {dailyAdvice.text}
          {dailyAdvice.author && (
            <span style={{ fontStyle: 'italic', opacity: 0.8 }}>
              {' — '}{dailyAdvice.author}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
