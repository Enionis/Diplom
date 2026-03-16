import createContextHook from "@nkzw/create-context-hook";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthContext } from "./AuthProvider";

interface UserState {
  birthDate: string;
  setBirthDate: (date: string) => void;
  clearUserData: () => void;
}

export const [UserProvider, useUser] = createContextHook<UserState>(() => {
  const [birthDate, setBirthDateState] = useState("");
  const { user, updateProfile } = useAuthContext();

  useEffect(() => {
    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    try {
      // Если пользователь авторизован, используем данные из профиля
      if (user?.birth_date) {
        const [year, month, day] = user.birth_date.split('-');
        const formattedDate = `${day}.${month}.${year}`;
        setBirthDateState(formattedDate);
      } else {
        // Иначе загружаем из локального хранилища
        const stored = await AsyncStorage.getItem("birthDate");
        if (stored) {
          setBirthDateState(stored);
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const setBirthDate = async (date: string) => {
    setBirthDateState(date);
    await AsyncStorage.setItem("birthDate", date);

    // Если пользователь авторизован, обновляем профиль на сервере
    if (user) {
      const [day, month, year] = date.split('.');
      const serverDate = `${year}-${month}-${day}`;
      await updateProfile({ birth_date: serverDate });
    }
  };

  const clearUserData = async () => {
    setBirthDateState("");
    await AsyncStorage.removeItem("birthDate");
  };

  return {
    birthDate,
    setBirthDate,
    clearUserData,
  };
});