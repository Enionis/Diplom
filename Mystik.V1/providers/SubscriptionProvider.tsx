import createContextHook from "@nkzw/create-context-hook";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SubscriptionState {
  isPremium: boolean;
  cardBack: string;
  activateSubscription: () => void;
  cancelSubscription: () => void;
  setCardBack: (back: string) => void;
}

export const [SubscriptionProvider, useSubscription] = createContextHook<SubscriptionState>(() => {
  const [isPremium, setIsPremium] = useState(false);
  const [cardBack, setCardBackState] = useState("purple");

  useEffect(() => {
    loadSubscription();
    loadCardBack();
  }, []);

  const loadSubscription = async () => {
    try {
      const stored = await AsyncStorage.getItem("subscription");
      if (stored) {
        setIsPremium(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading subscription:", error);
    }
  };

  const loadCardBack = async () => {
    try {
      const stored = await AsyncStorage.getItem("cardBack");
      if (stored) {
        setCardBackState(stored);
      }
    } catch (error) {
      console.error("Error loading card back:", error);
    }
  };

  const activateSubscription = async () => {
    setIsPremium(true);
    await AsyncStorage.setItem("subscription", JSON.stringify(true));
  };

  const cancelSubscription = async () => {
    setIsPremium(false);
    setCardBackState("purple");
    await AsyncStorage.setItem("subscription", JSON.stringify(false));
    await AsyncStorage.setItem("cardBack", "purple");
  };

  const setCardBack = async (back: string) => {
    setCardBackState(back);
    await AsyncStorage.setItem("cardBack", back);
  };

  return {
    isPremium,
    cardBack,
    activateSubscription,
    cancelSubscription,
    setCardBack,
  };
});