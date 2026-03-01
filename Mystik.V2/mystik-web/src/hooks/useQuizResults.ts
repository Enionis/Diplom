import { useState, useEffect } from 'react';

export function useQuizResults(quizId: string) {
  const [result, setResult] = useState<any>(null);
  const key = `quizResult_${quizId}`;

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        setResult(JSON.parse(stored));
      } catch (_) {}
    }
  }, [quizId, key]);

  const saveResult = (newResult: any) => {
    localStorage.setItem(key, JSON.stringify(newResult));
    setResult(newResult);
  };

  const clearResult = () => {
    localStorage.removeItem(key);
    setResult(null);
  };

  return { result, saveResult, clearResult };
}
