import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, Crown, Infinity, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { useSubscription } from '@/providers/SubscriptionProvider';

const features = [
  { icon: Infinity, text: 'Безлимитные гадания на Таро' },
  { icon: Check, text: 'Полная матрица судьбы' },
  { icon: Check, text: 'Расширенные гороскопы' },
  { icon: Check, text: 'Все премиум тесты' },
  { icon: Check, text: 'Персональные рекомендации' },
];

export default function Subscription() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const { activateSubscription } = useSubscription();

  useEffect(() => {
    if (!isLoading && user?.isGuest) {
      navigate('/auth', { replace: true });
    }
  }, [isLoading, user?.isGuest, navigate]);

  const handleSubscribe = () => {
    if (window.confirm('Премиум подписка за 990₽ в месяц. Оформить?')) {
      activateSubscription();
      window.alert('Премиум подписка активирована');
      navigate(-1);
    }
  };

  if (!isLoading && user?.isGuest) {
    return null;
  }

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 40 }}>
      <Link
        to="/"
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          display: 'inline-flex',
          alignItems: 'center',
          padding: 8,
          borderRadius: 20,
          background: 'rgba(255,255,255,0.1)',
          color: '#fff',
          textDecoration: 'none',
          zIndex: 10,
        }}
      >
        <ArrowLeft size={24} />
      </Link>
      <header
        style={{
          padding: 40,
          textAlign: 'center',
          background: 'linear-gradient(180deg, var(--bg-header) 0%, var(--bg-dark) 100%)',
        }}
      >
        <Crown size={60} color="var(--accent)" />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '20px 0 8px' }}>Премиум доступ</h1>
        <p style={{ fontSize: 16, color: 'var(--text-muted)', margin: 0 }}>
          Откройте все возможности приложения
        </p>
      </header>

      <div style={{ padding: 20 }}>
        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: 16,
              background: 'var(--card-bg)',
              borderRadius: 12,
              marginBottom: 10,
            }}
          >
            <feature.icon size={20} color="var(--accent)" />
            <span style={{ fontSize: 16, flex: 1 }}>{feature.text}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          margin: 20,
          padding: 24,
          background: 'rgba(255,215,0,0.1)',
          borderRadius: 20,
          textAlign: 'center',
          border: '2px solid rgba(255,215,0,0.3)',
        }}
      >
        <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 8 }}>
          Ежемесячная подписка
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4 }}>
          <span style={{ fontSize: 48, fontWeight: 700, color: 'var(--accent)' }}>990</span>
          <span style={{ fontSize: 20, color: 'var(--accent)' }}>₽/мес</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
          Отмена в любое время
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        <button type="button" className="btn-primary" style={{ width: '100%' }} onClick={handleSubscribe}>
          Оформить подписку
        </button>
      </div>

      <p
        style={{
          padding: 20,
          paddingBottom: 40,
          fontSize: 12,
          color: '#666',
          textAlign: 'center',
          lineHeight: 1.5,
        }}
      >
        Нажимая «Оформить подписку», вы соглашаетесь с условиями использования
      </p>
    </div>
  );
}
