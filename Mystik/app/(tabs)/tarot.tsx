import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  ScrollView,
  Alert,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Sparkles, Lock, RefreshCw, ArrowLeft } from "lucide-react-native";
import { useSubscription } from "@/providers/SubscriptionProvider";
import { useDailyCard } from "@/hooks/useDailyCard";
import { useTarotReadings } from "@/hooks/useTarotReading";
import { router } from "expo-router";
import { TAROT_CARDS, TAROT_SPREADS, TarotCard, TarotSpread } from "@/constants/tarot";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDatabase } from "@/hooks/useDatabase"; // Новый импорт

interface ReadingResult {
  spread: TarotSpread;
  cards: TarotCard[];
}

export default function TarotScreen() {
  const { isPremium, cardBack } = useSubscription();
  const { card: dailyCard, isNewDay, drawDailyCard } = useDailyCard();
  const { readingsToday, canRead, performReading } = useTarotReadings();
  const { logTarotClick } = useDatabase(); // Добавляем хук
  const [currentView, setCurrentView] = useState<'spreads' | 'reading'>('spreads');
  const [currentReading, setCurrentReading] = useState<ReadingResult | null>(null);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([]);
  const flipAnimations = useRef<Animated.Value[]>([]).current;
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const cardBackStyles = {
    purple: ["#4a148c", "#7b1fa2", "#9c27b0"],
    gold: ["#ffd700", "#ffed4e"],
    black: ["#1a1a2e", "#333"],
    red: ["#d32f2f", "#f44336"],
  };

  const startReading = (spread: TarotSpread) => {
    logTarotClick(spread.id); // Логируем клик по раскладу
    if (spread.isPremium && !isPremium) {
      Alert.alert(
        "Премиум функция",
        "Этот расклад доступен только по подписке",
        [
          { text: "Отмена", style: "cancel" },
          { text: "Подписка", onPress: () => router.push("/subscription") },
        ]
      );
      return;
    }

    if (spread.id === "daily") {
      if (dailyCard && !isNewDay) {
        setCurrentReading({
          spread,
          cards: [dailyCard]
        });
        setFlippedCards([true]);
        flipAnimations[0] = new Animated.Value(1);
      } else if (isNewDay) {
        const newCard = drawDailyCard();
        if (newCard) {
          setCurrentReading({
            spread,
            cards: [newCard]
          });
          setFlippedCards([false]);
          flipAnimations[0] = new Animated.Value(0);
        }
      }
    } else {
      if (!canRead && !isPremium) {
        Alert.alert(
          "Лимит исчерпан",
          `Вы использовали ${readingsToday} из 3 бесплатных гаданий сегодня. Оформите подписку для безлимитного доступа.`,
          [
            { text: "Отмена", style: "cancel" },
            { text: "Подписка", onPress: () => router.push("/subscription") },
          ]
        );
        return;
      }
      
      performReading();
      const cards = getRandomCards(spread.cardCount);
      setCurrentReading({ spread, cards });
      setFlippedCards(new Array(spread.cardCount).fill(false));
      flipAnimations.length = 0;
      for (let i = 0; i < spread.cardCount; i++) {
        flipAnimations[i] = new Animated.Value(0);
      }
    }
    
    setCurrentView('reading');
  };

  const flipCard = (index: number) => {
    const newFlippedCards = [...flippedCards];
    newFlippedCards[index] = !newFlippedCards[index];
    setFlippedCards(newFlippedCards);
    
    Animated.timing(flipAnimations[index], {
      toValue: newFlippedCards[index] ? 1 : 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const getRandomCards = (count: number): TarotCard[] => {
    const shuffled = [...TAROT_CARDS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const getCardAnimationStyles = (index: number) => {
    const frontInterpolate = flipAnimations[index]?.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"],
    });

    const backInterpolate = flipAnimations[index]?.interpolate({
      inputRange: [0, 1],
      outputRange: ["180deg", "360deg"],
    });

    return {
      front: { transform: [{ rotateY: frontInterpolate || "0deg" }] },
      back: { transform: [{ rotateY: backInterpolate || "180deg" }] },
    };
  };

  const goBackToSpreads = () => {
    setCurrentView('spreads');
    setCurrentReading(null);
    setFlippedCards([]);
    flipAnimations.length = 0;
  };

  if (currentView === 'reading' && currentReading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity onPress={goBackToSpreads} style={styles.backButton}>
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.title}>{currentReading.spread.name}</Text>
            <View style={styles.placeholder} />
          </View>

          <Text style={styles.spreadDescription}>{currentReading.spread.description}</Text>

          <View style={styles.cardsGrid}>
            {currentReading.cards.map((card, index) => {
              const animationStyles = getCardAnimationStyles(index);
              return (
                <View key={index} style={styles.cardWrapper}>
                  <Text style={styles.positionLabel}>
                    {currentReading.spread.positions[index]}
                  </Text>
                  <TouchableOpacity onPress={() => flipCard(index)} activeOpacity={0.9}>
                    <Animated.View style={[styles.card, animationStyles.front]}>
                      <LinearGradient
                        colors={cardBackStyles[cardBack as keyof typeof cardBackStyles] || cardBackStyles.purple}
                        style={styles.cardGradient}
                      >
                        <Sparkles size={40} color="#ffd700" />
                        <Text style={styles.cardBackTextSmall}>Нажмите</Text>
                      </LinearGradient>
                    </Animated.View>
                    
                    <Animated.View style={[styles.card, styles.cardBack, animationStyles.back]}>
                      <LinearGradient
                        colors={["#ffd700", "#ffed4e"]}
                        style={styles.cardGradient}
                      >
                        <Text style={styles.cardNumber}>{card.number}</Text>
                        <Text style={styles.cardName}>{card.name}</Text>
                        <Text style={styles.cardSymbol}>{card.symbol}</Text>
                        <Text style={styles.cardMeaning}>{card.meaning}</Text>
                      </LinearGradient>
                    </Animated.View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

          <View style={styles.interpretation}>
            <Text style={styles.interpretationTitle}>Толкование</Text>
            {currentReading.cards.map((card, index) => (
              flippedCards[index] && (
                <View key={index} style={styles.cardInterpretation}>
                  <Text style={styles.cardInterpretationTitle}>
                    {currentReading.spread.positions[index]}: {card.name}
                  </Text>
                  <Text style={styles.interpretationText}>{card.interpretation}</Text>
                </View>
              )
            ))}
            {!flippedCards.some(Boolean) && (
              <Text style={styles.interpretationText}>
                Откройте карты, чтобы увидеть толкование
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.newReadingButton}
            onPress={() => startReading(currentReading.spread)}
          >
            <RefreshCw size={20} color="#fff" />
            <Text style={styles.newReadingText}>Новый расклад</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Гадание на Таро</Text>
          {!isPremium && (
            <View style={styles.limitBadge}>
              <Text style={styles.limitText}>
                Осталось: {Math.max(0, 3 - readingsToday)}/3
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.subtitle}>Выберите тип гадания</Text>

        <FlatList
          data={TAROT_SPREADS}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.spreadRow}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.spreadCard,
                item.isPremium && !isPremium && styles.spreadCardLocked
              ]}
              onPress={() => startReading(item)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={item.isPremium && !isPremium 
                  ? ["#333", "#555"] 
                  : ["#4a148c", "#7b1fa2"]
                }
                style={styles.spreadCardGradient}
              >
                {item.isPremium && !isPremium && (
                  <Lock size={20} color="#ffd700" style={styles.spreadLockIcon} />
                )}
                <Text style={styles.spreadCardTitle}>{item.name}</Text>
                <Text style={styles.spreadCardCount}>{item.cardCount} карт</Text>
                <Text style={styles.spreadCardDescription}>{item.description}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          scrollEnabled={false}
          contentContainerStyle={styles.spreadsGrid}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f1e",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  backButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 18,
    color: "#b8b8d0",
    textAlign: "center",
    marginBottom: 20,
  },
  limitBadge: {
    backgroundColor: "rgba(255,215,0,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  limitText: {
    color: "#ffd700",
    fontSize: 12,
    fontWeight: "600",
  },
  spreadsGrid: {
    paddingHorizontal: 20,
  },
  spreadRow: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  spreadCard: {
    width: "48%",
    height: 160,
    borderRadius: 16,
    overflow: "hidden",
  },
  spreadCardLocked: {
    opacity: 0.7,
  },
  spreadCardGradient: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  spreadLockIcon: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  spreadCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  spreadCardCount: {
    fontSize: 12,
    color: "#ffd700",
    marginBottom: 8,
  },
  spreadCardDescription: {
    fontSize: 11,
    color: "#b8b8d0",
    textAlign: "center",
    lineHeight: 16,
  },
  spreadDescription: {
    fontSize: 16,
    color: "#b8b8d0",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 30,
  },
  cardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 16,
  },
  cardWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  positionLabel: {
    fontSize: 12,
    color: "#ffd700",
    marginBottom: 8,
    textAlign: "center",
    fontWeight: "600",
  },
  card: {
    width: 120,
    height: 180,
    backfaceVisibility: "hidden",
  },
  cardBack: {
    position: "absolute",
  },
  cardGradient: {
    flex: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  cardBackTextSmall: {
    color: "#fff",
    fontSize: 12,
    marginTop: 8,
  },
  cardNumber: {
    fontSize: 14,
    color: "#4a148c",
    fontWeight: "600",
    marginBottom: 4,
  },
  cardName: {
    fontSize: 16,
    color: "#1a1a2e",
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  cardSymbol: {
    fontSize: 40,
    marginVertical: 8,
  },
  cardMeaning: {
    fontSize: 12,
    color: "#4a148c",
    textAlign: "center",
    fontStyle: "italic",
  },
  newReadingButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 20,
    marginBottom: 20,
    padding: 12,
    marginHorizontal: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
  },
  newReadingText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  interpretation: {
    margin: 20,
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
  },
  interpretationTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffd700",
    marginBottom: 12,
  },
  interpretationText: {
    fontSize: 14,
    color: "#b8b8d0",
    lineHeight: 22,
  },
  cardInterpretation: {
    marginBottom: 16,
  },
  cardInterpretationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffd700",
    marginBottom: 8,
  },
});