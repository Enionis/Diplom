import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Crown } from 'lucide-react';
import { useSubscription } from '@/providers/SubscriptionProvider';
import { QUIZZES } from '@/constants/quiz';
import { useQuizResults } from '@/hooks/useQuizResults';

export default function Quiz() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const quiz = (id && QUIZZES[id]) ? QUIZZES[id] : QUIZZES.strengths;
  const { isPremium } = useSubscription();
  const { result, saveResult, clearResult } = useQuizResults(id || 'strengths');

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  if (quiz.isPremium && !isPremium) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}
      >
        <Crown size={64} color="var(--accent)" />
        <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--accent)', margin: '16px 0 8px' }}>
          Только для премиум
        </h2>
        <p style={{ fontSize: 16, color: 'var(--text-muted)', textAlign: 'center', marginBottom: 32 }}>
          Этот тест доступен только подписчикам. Оформите подписку и узнайте больше о себе!
        </p>
        <button
          type="button"
          className="btn-primary"
          style={{ width: '100%', marginBottom: 16 }}
          onClick={() => navigate('/subscription')}
        >
          Открыть доступ
        </button>
        <button
          type="button"
          onClick={() => navigate('/tests')}
          style={{ padding: 12, color: 'var(--text-muted)', fontSize: 14 }}
        >
          Назад
        </button>
      </div>
    );
  }

  if (result) {
    return (
      <div style={{ padding: 40, paddingBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--accent)', marginBottom: 20, textAlign: 'center' }}>
          {quiz.title}
        </h1>

        {quiz.id === 'strengths' && (
          <>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--accent)', margin: '20px 0', textAlign: 'left' }}>
              1) Доминирующие таланты
            </h2>
            {result.topTalents?.map((talent: any, index: number) => (
              <div key={index} style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>
                  {talent.theme} — {talent.score}/5
                </div>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 5 }}>
                  <strong>Описание:</strong> {talent.desc}
                </p>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 5 }}>
                  <strong>Как использовать:</strong> {talent.use}
                </p>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  <strong>Советы:</strong>
                </p>
                {talent.tips?.map((tip: string, idx: number) => (
                  <p key={idx} style={{ fontSize: 16, color: 'var(--text-muted)', marginLeft: 16 }}>
                    - {tip}
                  </p>
                ))}
              </div>
            ))}

            <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--accent)', margin: '20px 0', textAlign: 'left' }}>
              2) Профессиональные сферы
            </h2>
            {result.careers && Object.entries(result.careers).map(([category, roles]: [string, any], index: number) => (
              <div key={index} style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{category}</div>
                {Array.isArray(roles) ? roles.map((role: string, idx: number) => (
                  <p key={idx} style={{ fontSize: 16, color: 'var(--text-muted)', marginLeft: 16 }}>
                    - {role}
                  </p>
                )) : (
                  <p style={{ fontSize: 16, color: 'var(--text-muted)' }}>- {String(roles)}</p>
                )}
              </div>
            ))}

            <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--accent)', margin: '20px 0', textAlign: 'left' }}>
              3) Рекомендации по развитию
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              <strong>Общие рекомендации:</strong>
            </p>
            {[
              'Составьте личный план развития на 3–6 месяцев с конкретными метриками.',
              'Фокусируйтесь на усилении сильных сторон.',
              'Ищите роли и задачи, где вы проводите хотя бы 50% времени в зонах своего таланта.',
              'Запрашивайте регулярную обратную связь и измеряйте прогресс.',
            ].map((tip, idx) => (
              <p key={idx} style={{ fontSize: 16, color: 'var(--text-muted)', marginLeft: 16 }}>
                - {tip}
              </p>
            ))}
          </>
        )}

        {quiz.id === 'paei' && (
          <>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--accent)', margin: '20px 0' }}>
              Ваш тип личности
            </h2>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{result.code}</div>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              <strong>Описание:</strong>{' '}
              {result.interpretation?.map((i: any) => `${i.letter} - ${i.description}`).join('\n')}
            </p>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              <strong>Примечание:</strong> {result.note}
            </p>
          </>
        )}

        {quiz.id === 'attachment' && (
          <>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--accent)', margin: '20px 0' }}>
              Ваш тип привязанности
            </h2>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{result.type}</div>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.5 }}>{result.description}</p>
            <p style={{ fontSize: 16, fontWeight: 600, marginTop: 12 }}>Советы:</p>
            {result.tips?.map((tip: string, idx: number) => (
              <p key={idx} style={{ fontSize: 16, color: 'var(--text-muted)', marginLeft: 16 }}>
                - {tip}
              </p>
            ))}
          </>
        )}

        {quiz.id === 'archetype' && (
          <>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--accent)', margin: '20px 0' }}>
              Ваш архетип личности
            </h2>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{result.archetype}</div>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.5 }}>{result.description}</p>
            <p style={{ fontSize: 16, fontWeight: 600, marginTop: 12 }}>Рекомендации:</p>
            {result.recommendations?.map((rec: string, idx: number) => (
              <p key={idx} style={{ fontSize: 16, color: 'var(--text-muted)', marginLeft: 16 }}>
                - {rec}
              </p>
            ))}
          </>
        )}

        <button
          type="button"
          className="btn-primary"
          style={{ width: '100%', marginTop: 24, marginBottom: 16 }}
          onClick={() => {
            clearResult();
            setCurrentQuestion(0);
            setAnswers([]);
          }}
        >
          Пройти еще раз
        </button>
        <button
          type="button"
          onClick={() => navigate('/tests')}
          style={{ width: '100%', padding: 12, color: 'var(--text-muted)', fontSize: 14 }}
        >
          Вернуться к тестам
        </button>
      </div>
    );
  }

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex + 1];
    setAnswers(newAnswers);
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const res = quiz.calculateResult(newAnswers);
      saveResult(res);
    }
  };

  return (
    <div style={{ padding: 20, paddingBottom: 24 }}>
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            height: 8,
            background: 'var(--border)',
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%`,
              background: 'var(--accent)',
              borderRadius: 4,
              transition: 'width 0.3s',
            }}
          />
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8, textAlign: 'center' }}>
          {currentQuestion + 1} из {quiz.questions.length}
        </p>
      </div>

      <h2
        style={{
          fontSize: 24,
          fontWeight: 600,
          marginBottom: 30,
          textAlign: 'center',
        }}
      >
        {quiz.questions[currentQuestion].question}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {quiz.questions[currentQuestion].options.map((option: string, index: number) => (
          <button
            key={index}
            type="button"
            onClick={() => handleAnswer(index)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 20,
              borderRadius: 16,
              background: 'rgba(156,39,176,0.1)',
              border: '1px solid rgba(156,39,176,0.2)',
              color: '#fff',
              fontSize: 16,
              textAlign: 'left',
            }}
          >
            <span style={{ flex: 1 }}>{option}</span>
            <ChevronRight size={20} color="#9c27b0" />
          </button>
        ))}
      </div>
    </div>
  );
}
