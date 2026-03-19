import { useState, useEffect } from 'react';

interface Quiz {
  id: string;
  title: string;
  description: string;
  isPremium: boolean;
  questions?: Array<{
    question: string;
    theme?: string;
    options: string[];
  }>;
}

export function useQuizzes() {
  const [quizzes, setQuizzes] = useState<Record<string, Quiz>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/quizzes');
      const data = await response.json();

      if (data.ok) {
        setQuizzes(data.quizzes);
      } else {
        setError(data.error || 'Ошибка загрузки тестов');
      }
    } catch (err) {
      console.error('Error loading quizzes:', err);
      setError('Ошибка сети');
    } finally {
      setLoading(false);
    }
  };

  return {
    quizzes,
    loading,
    error,
    loadQuizzes,
  };
}

export function useQuiz(quizId: string) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (quizId) {
      loadQuiz();
    }
  }, [quizId]);

  const loadQuiz = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3001/api/quiz/${quizId}`);
      const data = await response.json();

      if (data.ok) {
        setQuiz(data.quiz);
      } else {
        setError(data.error || 'Ошибка загрузки теста');
      }
    } catch (err) {
      console.error('Error loading quiz:', err);
      setError('Ошибка сети');
    } finally {
      setLoading(false);
    }
  };

  return {
    quiz,
    loading,
    error,
    loadQuiz,
  };
}