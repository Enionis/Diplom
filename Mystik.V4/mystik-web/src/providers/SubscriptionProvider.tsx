import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';

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
  const { user } = useAuth();

  const API_BASE =
    typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL
      ? import.meta.env.VITE_API_URL.replace(/\/$/, '')
      : '';

  useEffect(() => {
    const sub = localStorage.getItem('subscription');
    if (sub) setIsPremium(JSON.parse(sub));
    const back = localStorage.getItem('cardBack');
    if (back) setCardBackState(back);
  }, []);

  useEffect(() => {
    const loadPremiumFromServer = async () => {
      if (!API_BASE || !user?.id) return;
      try {
        const url = `${API_BASE}/api/user/${encodeURIComponent(user.id)}/premium`;
        console.log("[PREMIUM API DEBUG] loadPremium:", { userId: user.id, url });
        const res = await fetch(url);
        const data = await res.json().catch(() => ({}));
        console.log("[PREMIUM API DEBUG] loadPremium response:", {
          userId: user.id,
          status: res.status,
          data,
        });
        if (res.ok && data?.ok) {
          const next = Boolean(data.isPremium);
          setIsPremium(next);
          localStorage.setItem('subscription', JSON.stringify(next));
        }
      } catch {
        // fallback остается локальным
      }
    };

    loadPremiumFromServer();
  }, [user?.id, API_BASE]);

  const activateSubscription = () => {
    const tryServer = async () => {
      if (!API_BASE || !user?.id) return false;
      try {
        const url = `${API_BASE}/api/user/${encodeURIComponent(user.id)}/premium/activate`;
        console.log("[PREMIUM API DEBUG] activate:", { userId: user.id, url });
        const res = await fetch(url, {
          method: 'POST',
        });
        const data = await res.json().catch(() => ({}));
        console.log("[PREMIUM API DEBUG] activate response:", {
          userId: user.id,
          status: res.status,
          data,
        });
        if (res.ok && data?.ok) {
          return true;
        }
      } catch {
        // ignore
      }
      return false;
    };

    // Fire and forget + fallback
    void tryServer().then((ok) => {
      setIsPremium(ok);
      localStorage.setItem('subscription', JSON.stringify(ok));
    }).catch(() => {
      setIsPremium(true);
      localStorage.setItem('subscription', JSON.stringify(true));
    });
  };

  const cancelSubscription = () => {
    const tryServer = async () => {
      if (!API_BASE || !user?.id) return false;
      try {
        const url = `${API_BASE}/api/user/${encodeURIComponent(user.id)}/premium/cancel`;
        console.log("[PREMIUM API DEBUG] cancel:", { userId: user.id, url });
        const res = await fetch(url, {
          method: 'POST',
        });
        const data = await res.json().catch(() => ({}));
        console.log("[PREMIUM API DEBUG] cancel response:", {
          userId: user.id,
          status: res.status,
          data,
        });
        if (res.ok && data?.ok) {
          return true;
        }
      } catch {
        // ignore
      }
      return false;
    };

    void tryServer().then((ok) => {
      setIsPremium(false);
      setCardBackState('purple');
      localStorage.setItem('subscription', JSON.stringify(false));
      localStorage.setItem('cardBack', 'purple');
    }).catch(() => {
      setIsPremium(false);
      setCardBackState('purple');
      localStorage.setItem('subscription', JSON.stringify(false));
      localStorage.setItem('cardBack', 'purple');
    });
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
