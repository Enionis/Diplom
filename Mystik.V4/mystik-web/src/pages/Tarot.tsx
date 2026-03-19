import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Lock, RefreshCw, ArrowLeft } from 'lucide-react';
import { useSubscription } from '@/providers/SubscriptionProvider';
import { useDailyCard } from '@/hooks/useDailyCard';
import { useTarotReadings } from '@/hooks/useTarotReading';
import { useTarotSpreads, useTarotCards, useTarotReading, TarotCard, TarotSpread, TarotReading } from '@/hooks/useTarotAPI';
import { TAROT_CARDS } from '@/constants/tarot'; // Оставляем для карты дня

interface ReadingResult {
  spread: TarotSpread;
  cards: TarotCard[];
  interpretations?: {
    position: string;
    card: TarotCard;
    interpretation: string;
  }[];
}

function getRandomCards(count: number, availableCards: TarotCard[]): TarotCard[] {
  const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function getRandomCardIds(count: number, availableCards: TarotCard[]): string[] {
  const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(card => card.id);
}

const CARD_BACK_STYLES: Record<string, { gradient: string; iconColor: string; textColor: string }> = {
  purple: {
    gradient: 'linear-gradient(135deg, #4a148c 0%, #7b1fa2 50%, #9c27b0 100%)',
    iconColor: '#ffd700',
    textColor: '#fff',
  },
  gold: {
    gradient: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
    iconColor: '#1a1a2e',
    textColor: '#1a1a2e',
  },
  black: {
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #333 100%)',
    iconColor: '#ffd700',
    textColor: '#fff',
  },
  red: {
    gradient: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)',
    iconColor: '#fff',
    textColor: '#fff',
  },
};

export default function Tarot() {
  const navigate = useNavigate();
  const { isPremium, cardBack } = useSubscription();
  const backStyle = CARD_BACK_STYLES[cardBack] || CARD_BACK_STYLES.purple;
  const { card: dailyCard, isNewDay, drawDailyCard } = useDailyCard();
  const { readingsToday, canRead, performReading } = useTarotReadings();
  
  // API хуки
  const { spreads, loading: spreadsLoading } = useTarotSpreads();
  const { cards, loading: cardsLoading } = useTarotCards();
  const { createReading, loading: readingLoading } = useTarotReading();
  
  const [currentView, setCurrentView] = useState<'spreads' | 'reading'>('spreads');
  const [currentReading, setCurrentReading] = useState<ReadingResult | null>(null);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([]);

  const startReading = async (spread: TarotSpread) => {
    if (spread.isPremium && !isPremium) {
      if (window.confirm('Этот расклад доступен только по подписке. Перейти к подписке?')) {
        navigate('/subscription');
      }
      return;
    }
    if (spread.id !== 'daily' && !canRead && !isPremium) {
      if (
        window.confirm(
          `Вы использовали ${readingsToday} из 3 бесплатных гаданий сегодня. Оформите подписку для безлимитного доступа. Перейти к подписке?`
        )
      ) {
        navigate('/subscription');
      }
      return;
    }

    if (spread.id === 'daily') {
      // Карта дня остается локальной
      let card = dailyCard;
      if (isNewDay || !card) card = drawDailyCard();
      if (card) {
        setCurrentReading({ 
          spread, 
          cards: [card],
          interpretations: [{
            position: spread.positions[0],
            card: card,
            interpretation: card.interpretation
          }]
        });
        setFlippedCards([true]);
      }
    } else {
      // Остальные гадания через API
      if (cards.length === 0) return;
      
      performReading();
      const cardIds = getRandomCardIds(spread.cardCount, cards);
      const reading = await createReading(spread.id, cardIds);
      
      if (reading) {
        setCurrentReading({
          spread: reading.spread,
          cards: reading.cards,
          interpretations: reading.interpretations
        });
        setFlippedCards(new Array(spread.cardCount).fill(false));
      }
    }
    setCurrentView('reading');
  };

  const flipCard = (index: number) => {
    setFlippedCards(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const goBackToSpreads = () => {
    setCurrentView('spreads');
    setCurrentReading(null);
    setFlippedCards([]);
  };

  if (currentView === 'reading' && currentReading) {
    return (
      <div style={{ paddingBottom: 24 }}>
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 20,
          }}
        >
          <button type="button" onClick={goBackToSpreads} style={{ padding: 8 }}>
            <ArrowLeft size={24} color="#fff" />
          </button>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{currentReading.spread.name}</h1>
          <div style={{ width: 40 }} />
        </header>
        <p
          style={{
            fontSize: 16,
            color: 'var(--text-muted)',
            textAlign: 'center',
            margin: '0 20px 30px',
          }}
        >
          {currentReading.spread.description}
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: 20,
            padding: '0 20px',
            maxWidth: currentReading.spread.cardCount <= 3 ? '850px' : '900px',
            margin: '0 auto',
          }}
        >
          {currentReading.cards.map((card, index) => (
            <div key={index} style={{ 
              textAlign: 'center', 
              marginBottom: 20,
              flex: '0 0 auto',
              width: '250px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              alignSelf: 'flex-start'
            }}>
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--accent)',
                  marginBottom: 8,
                  fontWeight: 600,
                  minHeight: '40px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  textAlign: 'center',
                  lineHeight: 1.3,
                  whiteSpace: 'pre-line',
                }}
              >
                {(() => {
                  const position = currentReading.spread.positions[index];
                  // Исправляем заглавные буквы и переносы для расклада "Три карты"
                  if (currentReading.spread.id === 'three') {
                    if (index === 0) return 'Прошлое, влияющее на вопрос или ситуацию';
                    if (index === 1) return 'Настоящее, влияющее на вопрос или ситуацию';
                    if (index === 2) return 'Будущее, вероятный итог развития\nсобытий исходя из поставленного вопроса';
                  }
                  return position;
                })()}
              </div>
              <button
                type="button"
                onClick={() => flipCard(index)}
                style={{
                  width: 120,
                  height: 180,
                  borderRadius: 12,
                  border: 'none',
                  padding: 12,
                  perspective: 1000,
                  background: flippedCards[index]
                    ? 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)'
                    : backStyle.gradient,
                  color: flippedCards[index] ? '#1a1a2e' : backStyle.textColor,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {flippedCards[index] ? (
                  <>
                    <span style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
                      {card.number}
                    </span>
                    <span style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>
                      {card.name}
                    </span>
                    <span style={{ fontSize: 40, margin: '8px 0' }}>{card.symbol}</span>
                    <span
                      style={{
                        fontSize: 12,
                        fontStyle: 'italic',
                        textAlign: 'center',
                      }}
                    >
                      {card.meaning}
                    </span>
                  </>
                ) : (
                  <>
                    <Sparkles size={40} color={backStyle.iconColor} />
                    <span style={{ fontSize: 12, marginTop: 8, color: backStyle.textColor }}>Нажмите</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
        <div
          style={{
            margin: 20,
            padding: 20,
            background: 'var(--card-bg)',
            borderRadius: 16,
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--accent)', marginBottom: 12 }}>
            Толкование
          </div>
          {currentReading.interpretations ? (
            currentReading.interpretations.map(
              (interp, index) =>
                flippedCards[index] && (
                  <div key={index} style={{ marginBottom: 16 }}>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: 'var(--accent)',
                        marginBottom: 8,
                      }}
                    >
                      {interp.position}: {interp.card.name}
                    </div>
                    <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                      {interp.interpretation}
                    </p>
                  </div>
                )
            )
          ) : (
            // Fallback для старых гаданий без interpretations
            currentReading.cards.map(
              (card, index) =>
                flippedCards[index] && (
                  <div key={index} style={{ marginBottom: 16 }}>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: 'var(--accent)',
                        marginBottom: 8,
                      }}
                    >
                      {currentReading.spread.positions[index]}: {card.name}
                    </div>
                    <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                      {(card as any).interpretation || card.meaning}
                    </p>
                  </div>
                )
            )
          )}
          {!flippedCards.some(Boolean) && (
            <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
              Откройте карты, чтобы увидеть толкование
            </p>
          )}
        </div>
        <div style={{ padding: '0 20px' }}>
          <button
            type="button"
            onClick={() => startReading(currentReading.spread)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              width: '100%',
              padding: 12,
              marginTop: 20,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 12,
              color: '#fff',
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            <RefreshCw size={20} />
            Новый расклад
          </button>
        </div>
      </div>
    );
  }

  if (spreadsLoading || cardsLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '200px' 
      }}>
        <div style={{ color: 'var(--text-muted)' }}>Загрузка...</div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 24 }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Гадание на Таро</h1>
        {!isPremium && (
          <span
            style={{
              background: 'rgba(255,215,0,0.2)',
              padding: '6px 12px',
              borderRadius: 12,
              color: 'var(--accent)',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Осталось: {Math.max(0, 3 - readingsToday)}/3
          </span>
        )}
      </header>
      <p style={{ fontSize: 18, color: 'var(--text-muted)', textAlign: 'center', marginBottom: 20 }}>
        Выберите тип гадания
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          padding: '0 20px',
        }}
      >
        {spreads.map(spread => (
          <button
            key={spread.id}
            type="button"
            onClick={() => startReading(spread)}
            style={{
              height: 160,
              borderRadius: 16,
              overflow: 'hidden',
              border: 'none',
              padding: 16,
              background:
                spread.isPremium && !isPremium
                  ? 'linear-gradient(135deg, #333 0%, #555 100%)'
                  : 'linear-gradient(135deg, #4a148c 0%, #7b1fa2 100%)',
              color: '#fff',
              textAlign: 'center',
              position: 'relative',
              opacity: spread.isPremium && !isPremium ? 0.7 : 1,
            }}
          >
            {spread.isPremium && !isPremium && (
              <Lock
                size={20}
                color="#ffd700"
                style={{ position: 'absolute', top: 12, right: 12 }}
              />
            )}
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{spread.name}</div>
            <div style={{ fontSize: 12, color: 'var(--accent)', marginBottom: 8 }}>
              {spread.cardCount === 1 ? '1 карта' : 
               spread.cardCount < 5 ? `${spread.cardCount} карты` : 
               `${spread.cardCount} карт`}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4 }}>
              {spread.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
