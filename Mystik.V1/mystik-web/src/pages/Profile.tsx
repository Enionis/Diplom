import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Crown,
  Calendar,
  LogOut,
  LogIn,
  Bell,
  Globe,
  Info,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { useSubscription } from '@/providers/SubscriptionProvider';
import { useUser } from '@/providers/UserProvider';
import { useAuth } from '@/providers/AuthProvider';

const supportContacts = [
  { name: 'Ангелина Дмитриева', phone: '+7 (902) 851-01-87', email: 'ychebka337@mail.ru' },
  { name: 'Вероника Сараева', phone: '+7 (982) 186-36-10', email: 'ychebka337@mail.ru' },
  { name: 'Феона Симеонидис', phone: '+7 (951) 978-71-03', email: 'ychebka337@mail.ru' },
];

const cardBacks: { id: string; name: string; gradient: string; textColor?: string }[] = [
  { id: 'purple', name: 'Фиолетовый', gradient: 'linear-gradient(135deg, #4a148c 0%, #7b1fa2 50%, #9c27b0 100%)' },
  { id: 'gold', name: 'Золотистый', gradient: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)', textColor: '#1a1a2e' },
  { id: 'black', name: 'Черный', gradient: 'linear-gradient(135deg, #1a1a2e 0%, #333 100%)' },
  { id: 'red', name: 'Красный', gradient: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)' },
];

export default function Profile() {
  const navigate = useNavigate();
  const { isPremium, cardBack, setCardBack, cancelSubscription } = useSubscription();
  const { birthDate, clearUserData } = useUser();
  const { user, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedCardBack, setSelectedCardBack] = useState(cardBack);

  useEffect(() => {
    setSelectedCardBack(cardBack);
  }, [cardBack]);

  const handleLogout = async () => {
    if (window.confirm('Вы уверены, что хотите выйти?')) {
      await logout();
      clearUserData();
      navigate('/');
    }
  };

  const handleCardBackChange = (back: string) => {
    if (!isPremium) {
      window.confirm('Выбор рубашки карт доступен только по подписке. Перейти к подписке?') &&
        navigate('/subscription');
      return;
    }
    setSelectedCardBack(back);
    setCardBack(back);
  };

  const handleCancelSubscription = async () => {
    if (!window.confirm('Вы уверены, что хотите отменить подписку?')) return;
    await cancelSubscription();
    setSelectedCardBack('purple');
    setCardBack('purple');
    window.alert('Подписка отменена');
  };

  const showAboutApp = () => {
    window.alert('О приложении\n\nПриложение создано для хакатона\nВерсия: 1.0.0\nЯзык: Русский');
  };

  const showSupport = () => {
    const text = supportContacts
      .map(c => `${c.name}\nТел: ${c.phone}\nEmail: ${c.email}`)
      .join('\n\n');
    window.alert('Поддержка\n\n' + text);
  };

  return (
    <div style={{ paddingBottom: 24 }}>
      <header className="gradient-header" style={{ padding: 30, textAlign: 'center', marginBottom: 20 }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            background: 'rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: 40,
          }}
        >
          👤
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 600, margin: '0 0 8px' }}>
          {user?.name || 'Мистический странник'}
        </h1>
        {birthDate && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(255,215,0,0.1)',
              padding: '6px 12px',
              borderRadius: 12,
            }}
          >
            <Calendar size={14} color="var(--accent)" />
            <span style={{ color: 'var(--accent)', fontSize: 12 }}>{birthDate}</span>
          </div>
        )}
      </header>

      {isPremium ? (
        <div style={{ margin: 20 }}>
          <div
            className="gradient-gold"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: 20,
              borderRadius: 16,
              gap: 16,
              color: '#1a1a2e',
            }}
          >
            <Crown size={24} />
            <div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>Премиум активен</div>
              <div style={{ fontSize: 14, color: '#4a148c' }}>Безлимитный доступ</div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCancelSubscription}
            style={{
              width: '100%',
              marginTop: 12,
              padding: 12,
              background: 'none',
              color: 'var(--danger)',
              fontSize: 14,
            }}
          >
            Отменить подписку
          </button>
        </div>
      ) : (
        <Link
          to="/subscription"
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: 20,
            padding: 20,
            borderRadius: 16,
            background: 'linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)',
            color: '#fff',
            gap: 16,
            textDecoration: 'none',
          }}
        >
          <Crown size={24} />
          <div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Получить премиум</div>
            <div style={{ fontSize: 14, opacity: 0.9 }}>990₽ в месяц</div>
          </div>
        </Link>
      )}

      <div style={{ padding: 20 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Настройки</h2>

        {isPremium && (
          <div style={{ padding: 16, background: 'var(--card-bg)', borderRadius: 12, marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <Sparkles size={20} color="var(--accent)" />
              <span>Рубашка карт</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {cardBacks.map(back => (
                <button
                  key={back.id}
                  type="button"
                  onClick={() => handleCardBackChange(back.id)}
                  style={{
                    width: '48%',
                    padding: 12,
                    borderRadius: 8,
                    border: `2px solid ${selectedCardBack === back.id ? 'var(--accent)' : 'transparent'}`,
                    background: back.gradient,
                    color: back.textColor ?? '#fff',
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  {back.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            background: 'var(--card-bg)',
            borderRadius: 12,
            marginBottom: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Bell size={20} color="var(--accent)" />
            <span>Уведомления</span>
          </div>
          <button
            type="button"
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            style={{
              width: 48,
              height: 28,
              borderRadius: 14,
              background: notificationsEnabled ? 'var(--accent)' : '#333',
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 2,
                left: notificationsEnabled ? 22 : 2,
                width: 24,
                height: 24,
                borderRadius: 12,
                background: '#fff',
                transition: 'left 0.2s',
              }}
            />
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            background: 'var(--card-bg)',
            borderRadius: 12,
            marginBottom: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Globe size={20} color="var(--accent)" />
            <span>Язык</span>
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>Русский</span>
        </div>

        <button
          type="button"
          onClick={showAboutApp}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            background: 'var(--card-bg)',
            borderRadius: 12,
            marginBottom: 10,
            color: '#fff',
            fontSize: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Info size={20} color="var(--accent)" />
            О приложении
          </div>
          <span style={{ color: '#666' }}>›</span>
        </button>

        <button
          type="button"
          onClick={showSupport}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            background: 'var(--card-bg)',
            borderRadius: 12,
            marginBottom: 10,
            color: '#fff',
            fontSize: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <HelpCircle size={20} color="var(--accent)" />
            Поддержка
          </div>
          <span style={{ color: '#666' }}>›</span>
        </button>
      </div>

      {user?.isGuest ? (
        <Link
          to="/auth"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            margin: 20,
            padding: 16,
            background: 'rgba(76,175,80,0.1)',
            borderRadius: 12,
            color: 'var(--success)',
            fontSize: 16,
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          <LogIn size={20} />
          Войти
        </Link>
      ) : (
        <button
          type="button"
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            width: 'calc(100% - 40px)',
            margin: 20,
            padding: 16,
            background: 'rgba(255,68,68,0.1)',
            borderRadius: 12,
            color: 'var(--danger)',
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          <LogOut size={20} />
          Выйти
        </button>
      )}
    </div>
  );
}
