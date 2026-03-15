import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Crown, Loader, ArrowLeft } from 'lucide-react';
import { useSubscription } from '@/providers/SubscriptionProvider';
import { useQuiz } from '@/hooks/useQuizzes';
import { useQuizResults } from '@/hooks/useQuizResults';
import { QUIZZES } from '@/constants/quiz';

export default function Quiz() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isPremium } = useSubscription();
  const { quiz, loading: quizLoading, error: quizError } = useQuiz(id || '');
  const { result, loading: resultLoading, error: resultError, saveResult, clearResult } = useQuizResults(id || '');

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  // Используем данные из API, но fallback на локальные константы для логики расчета
  const localQuiz = id && QUIZZES[id] ? QUIZZES[id] : null;

  if (quizLoading || resultLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '200px' 
      }}>
        <Loader size={32} color="var(--accent)" className="animate-spin" />
      </div>
    );
  }

  if (quizError || !quiz || !quiz.questions) {
    return (
      <div style={{ padding: 20, textAlign: 'center' }}>
        <p style={{ color: 'var(--error)', marginBottom: 16 }}>
          {quizError || 'Тест не найден или поврежден'}
        </p>
        <button onClick={() => navigate('/tests')} className="btn-primary">
          Вернуться к тестам
        </button>
      </div>
    );
  }

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

        {resultError && (
          <div style={{ 
            padding: 12, 
            background: 'rgba(255,0,0,0.1)', 
            border: '1px solid rgba(255,0,0,0.3)', 
            borderRadius: 8, 
            marginBottom: 20,
            color: 'var(--error)'
          }}>
            Ошибка: {resultError}
          </div>
        )}

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
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 16, 
              marginBottom: 20,
              flexWrap: 'wrap'
            }}>
              <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--accent)', margin: 0 }}>
                Ваш тип личности:
              </h2>
              <div style={{
                padding: '8px 16px',
                background: 'rgba(255,215,0,0.1)',
                border: '2px solid var(--accent)',
                borderRadius: 12,
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--accent)'
              }}>
                {result.code}
              </div>
            </div>
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
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 16, 
              marginBottom: 20,
              flexWrap: 'wrap'
            }}>
              <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--accent)', margin: 0 }}>
                Ваш тип привязанности:
              </h2>
              <div style={{
                padding: '8px 16px',
                background: 'rgba(255,215,0,0.1)',
                border: '2px solid var(--accent)',
                borderRadius: 12,
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--accent)'
              }}>
                {result.type}
              </div>
            </div>
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
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 16, 
              marginBottom: 20,
              flexWrap: 'wrap'
            }}>
              <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--accent)', margin: 0 }}>
                Ваш архетип личности:
              </h2>
              <div style={{
                padding: '8px 16px',
                background: 'rgba(255,215,0,0.1)',
                border: '2px solid var(--accent)',
                borderRadius: 12,
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--accent)'
              }}>
                {result.archetype}
              </div>
            </div>
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
          disabled={resultLoading}
        >
          {resultLoading ? 'Сохранение...' : 'Пройти еще раз'}
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

  const handleAnswer = async (optionIndex: number) => {
    if (!quiz.questions) return;
    
    const newAnswers = [...answers, optionIndex + 1];
    setAnswers(newAnswers);
    
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Используем локальную логику для расчета результата
      if (localQuiz && localQuiz.calculateResult) {
        const calculatedResult = localQuiz.calculateResult(newAnswers);
        await saveResult(newAnswers, calculatedResult);
      } else {
        // Fallback: простой расчет результата если локальная логика недоступна
        let calculatedResult;
        
        if (quiz.id === 'paei') {
          // Простая логика для PAEI
          const scores: Record<string, number> = { P: 0, A: 0, E: 0, I: 0 };
          const mapping = [
            ["A", "A", "E"], ["A", "P", "E"], ["A", "P", "E"], ["A", "P", "E"], ["A", "P", "E"],
            ["P", "P", "I"], ["P", "I", "A"], ["P", "P", "A"], ["P", "P", "A"], ["P", "P", "E"],
            ["E", "E", "A"], ["E", "P", "I"], ["E", "A", "P"], ["E", "E", "A"], ["E", "P", "A"],
            ["I", "I", "P"], ["I", "P", "A"], ["I", "P", "A"], ["I", "A", "P"], ["I", "I", "A"],
            ["P", "A", "E", "I"], ["P", "A", "E", "I"], ["P", "A", "E", "I"], ["P", "A", "E", "I"],
          ];

          newAnswers.forEach((answer, idx) => {
            const func = mapping[idx]?.[answer - 1];
            if (func) scores[func]++;
          });

          const codeParts = [];
          for (const k of ["P", "A", "E", "I"]) {
            const s = scores[k];
            if (s >= 8) codeParts.push(k.toUpperCase());
            else if (s <= 2) codeParts.push("-");
            else codeParts.push(k.toLowerCase());
          }
          
          calculatedResult = {
            scores,
            code: codeParts.join(""),
            interpretation: [],
            note: "Результат рассчитан упрощенным способом"
          };
        } else if (quiz.id === 'attachment') {
          // Простая логика для attachment
          const scores = {
            Secure: (newAnswers[0] + newAnswers[4] + newAnswers[7]) / 3,
            Anxious: (newAnswers[1] + newAnswers[3] + newAnswers[6]) / 3,
            Avoidant: (newAnswers[2] + newAnswers[5]) / 2,
          };
          const maxScore = Math.max(scores.Secure, scores.Anxious, scores.Avoidant);
          let type = "";
          if (maxScore === scores.Secure) type = "Надежный";
          else if (maxScore === scores.Anxious) type = "Тревожный";
          else type = "Избегающий";
          
          calculatedResult = {
            type,
            description: `Ваш тип привязанности: ${type}`,
            tips: ["Результат рассчитан упрощенным способом"]
          };
        } else if (quiz.id === 'archetype') {
          // Простая логика для archetype
          const scores = {
            Искатель: (newAnswers[0] + newAnswers[4]) / 2,
            Герой: (newAnswers[1] + newAnswers[5]) / 2,
            Творец: (newAnswers[2] + newAnswers[6]) / 2,
            Заботливый: (newAnswers[3] + newAnswers[7]) / 2,
          };
          const maxScore = Math.max(scores.Искатель, scores.Герой, scores.Творец, scores.Заботливый);
          let archetype = "";
          if (maxScore === scores.Искатель) archetype = "Искатель";
          else if (maxScore === scores.Герой) archetype = "Герой";
          else if (maxScore === scores.Творец) archetype = "Творец";
          else archetype = "Заботливый";
          
          calculatedResult = {
            archetype,
            description: `Ваш архетип: ${archetype}`,
            recommendations: ["Результат рассчитан упрощенным способом"]
          };
        } else {
          // Для других тестов
          calculatedResult = {
            message: "Тест завершен",
            answers: newAnswers
          };
        }
        
        await saveResult(newAnswers, calculatedResult);
      }
    }
  };

  return (
    <div style={{ padding: 20, paddingBottom: 24 }}>
      {/* Кнопка назад */}
      <button
        type="button"
        onClick={() => navigate('/tests')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          background: 'transparent',
          border: '1px solid var(--border)',
          borderRadius: 8,
          color: 'var(--text-muted)',
          fontSize: 14,
          marginBottom: 20,
          cursor: 'pointer'
        }}
      >
        <ArrowLeft size={16} />
        Назад к тестам
      </button>

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
