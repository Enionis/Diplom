import { useState, useEffect } from "react";
import { databaseAdapter } from "../utils/databaseAdapter";
import { storageAdapter } from "../utils/storageAdapter";
import { useAuthContext } from "../providers/AuthProvider";

export function useQuizResults(quizId: string) {
  const [result, setResult] = useState<any>(null);
  const { user } = useAuthContext();

  useEffect(() => {
    loadResult();
  }, [quizId]);

  const loadResult = async () => {
    try {
      // Сначала пробуем загрузить из AsyncStorage (для обратной совместимости)
      const stored = await storageAdapter.getItem(`quizResult_${quizId}`);
      if (stored) {
        setResult(JSON.parse(stored));
        return;
      }

      // Если пользователь авторизован, загружаем из локальной БД
      if (user) {
        const results = await databaseAdapter.getUserQuizResults(user.id);
        const quizResult = results.find(r => r.quizId === quizId);
        if (quizResult) {
          setResult(quizResult.result);
        }
      }
    } catch (error) {
      console.error("Error loading quiz result:", error);
    }
  };

  const saveResult = async (newResult: any) => {
    try {
      // Сохраняем в AsyncStorage для обратной совместимости
      await storageAdapter.setItem(`quizResult_${quizId}`, JSON.stringify(newResult));
      
      // Если пользователь авторизован, сохраняем в локальную БД
      if (user) {
        await databaseAdapter.saveQuizResult(user.id, quizId, newResult);
      }
      
      setResult(newResult);
    } catch (error) {
      console.error("Error saving quiz result:", error);
    }
  };

  const clearResult = async () => {
    try {
      await storageAdapter.removeItem(`quizResult_${quizId}`);
      setResult(null);
    } catch (error) {
      console.error("Error clearing quiz result:", error);
    }
  };

  return { result, saveResult, clearResult };
}