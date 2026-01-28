import React, { createContext, useContext, useState, useEffect } from 'react';

interface SubscriptionState {
  isPremium: boolean;
  cardBack: string;
  activateSubscription: () => void;
  cancelSubscription: () => void;
  setCardBack: (back: string) => void;
}

const SubscriptionContext = createContext<SubscriptionState | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [isPremium, setIsPremium] = useState(false);
  const [cardBack, setCardBackState] = useState('purple');

  useEffect(() => {
    const sub = localStorage.getItem('subscription');
    if (sub) setIsPremium(JSON.parse(sub));
    const back = localStorage.getItem('cardBack');
    if (back) setCardBackState(back);
  }, []);

  const activateSubscription = () => {
    setIsPremium(true);
    localStorage.setItem('subscription', JSON.stringify(true));
  };

  const cancelSubscription = () => {
    setIsPremium(false);
    setCardBackState('purple');
    localStorage.setItem('subscription', JSON.stringify(false));
    localStorage.setItem('cardBack', 'purple');
  };

  const setCardBack = (back: string) => {
    setCardBackState(back);
    localStorage.setItem('cardBack', back);
  };

  return (
    <SubscriptionContext.Provider
      value={{ isPremium, cardBack, activateSubscription, cancelSubscription, setCardBack }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) throw new Error('useSubscription must be used within SubscriptionProvider');
  return context;
}
