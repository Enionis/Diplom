import { Link } from 'react-router-dom';
import { BookOpen, Lock } from 'lucide-react';
import { useSubscription } from '@/providers/SubscriptionProvider';
import { QUIZZES } from '@/constants/quiz';

export default function Tests() {
  const { isPremium } = useSubscription();
  const quizzes = Object.values(QUIZZES);

  return (
    <div style={{ paddingBottom: 24 }}>
      <header style={{ padding: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Тесты</h1>
      </header>
      <p style={{ fontSize: 18, color: 'var(--text-muted)', textAlign: 'center', marginBottom: 20 }}>
        Выберите тест для прохождения
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          padding: '0 20px',
        }}
      >
        {quizzes.map(quiz => {
          const locked = quiz.isPremium && !isPremium;
          return (
            <Link
              key={quiz.id}
              to={`/quiz/${quiz.id}`}
              style={{
                height: 160,
                borderRadius: 16,
                overflow: 'hidden',
                position: 'relative',
                opacity: locked ? 0.7 : 1,
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div
                style={{
                  height: '100%',
                  padding: 16,
                  background: locked
                    ? 'linear-gradient(135deg, #333 0%, #555 100%)'
                    : 'linear-gradient(135deg, #4a148c 0%, #7b1fa2 100%)',
                  color: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                {locked && (
                  <Lock
                    size={20}
                    color="#ffd700"
                    style={{ position: 'absolute', top: 12, right: 12 }}
                  />
                )}
                <BookOpen size={24} style={{ marginBottom: 8 }} />
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{quiz.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  {quiz.description}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
