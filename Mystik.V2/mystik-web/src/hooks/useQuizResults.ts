import { useState, useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';

interface QuizResult {
  id?: string;
  userId: string;
  quizId: string;
  answers: number[];
  result: any;
  createdAt?: string;
  updatedAt?: string;
}

export function useQuizResults(quizId: string) {
  const { user } = useAuth();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Загружаем результат при монтировании компонента
  useEffect(() => {
    if (user?.id && quizId) {
      loadResult();
    }
  }, [user?.id, quizId]);

  const loadResult = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`http://localhost:3001/api/user/${user.id}/quiz/${quizId}/result`);
      const data = await response.json();
      
      if (data.ok) {
        setResult(data.result.result);
      } else if (response.status !== 404) {
        // 404 означает что результата еще нет, это нормально
        setError(data.error || 'Ошибка загрузки результата');
      }
    } catch (err) {
      console.error('Error loading quiz result:', err);
      setError('Ошибка сети');
    } finally {
      setLoading(false);
    }
  };

  const saveResult = async (answers: number[], calculatedResult: any) => {
    if (!user?.id) {
      setError('Пользователь не авторизован');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3001/api/user/${user.id}/quiz/${quizId}/result`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers,
          result: calculatedResult,
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setResult(calculatedResult);
      } else {
        setError(data.error || 'Ошибка сохранения результата');
      }
    } catch (err) {
      console.error('Error saving quiz result:', err);
      setError('Ошибка сети');
    } finally {
      setLoading(false);
    }
  };

  const clearResult = () => {
    setResult(null);
    setError(null);
  };

  return {
    result,
    loading,
    error,
    saveResult,
    clearResult,
    loadResult,
  };
}
