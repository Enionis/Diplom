import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useQuizResults(quizId: string) {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    loadResult();
  }, [quizId]);

  const loadResult = async () => {
    try {
      const stored = await AsyncStorage.getItem(`quizResult_${quizId}`);
      if (stored) {
        setResult(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading quiz result:", error);
    }
  };

  const saveResult = async (newResult: any) => {
    try {
      await AsyncStorage.setItem(`quizResult_${quizId}`, JSON.stringify(newResult));
      setResult(newResult);
    } catch (error) {
      console.error("Error saving quiz result:", error);
    }
  };

  const clearResult = async () => {
    try {
      await AsyncStorage.removeItem(`quizResult_${quizId}`);
      setResult(null);
    } catch (error) {
      console.error("Error clearing quiz result:", error);
    }
  };

  return { result, saveResult, clearResult };
}