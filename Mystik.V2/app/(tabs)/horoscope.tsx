import React, { useState, useMemo, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar, Gem, Heart, Crown, Sparkles } from "lucide-react-native";
import { useUser } from "@/providers/UserProvider";
import { useSubscription } from "@/providers/SubscriptionProvider";
import { ZODIAC_SIGNS, getZodiacSign } from "@/constants/zodiac";
import { router, useLocalSearchParams } from "expo-router";
import { useDatabase } from "@/hooks/useDatabase";
import { useHoroscope } from "@/hooks/useHoroscope";
import MatrixSVG from "@/components/MatrixSVG";
import { calculateMatrixFromDate } from "@/utils/matrixCalculations";
import { PERSONALITY_TRAITS } from "@/constants/personality";

const { width, height } = Dimensions.get("window");

export default function HoroscopeScreen() {
  const { birthDate, setBirthDate } = useUser();
  const { isPremium } = useSubscription();
  const { logHoroscopeClick } = useDatabase();
  const { tab } = useLocalSearchParams<{ tab?: string }>();
  const [dateInput, setDateInput] = useState(birthDate || "");
  const [selectedPeriod, setSelectedPeriod] = useState<"today" | "week" | "month">("today");
  const [activeTab, setActiveTab] = useState<"horoscope" | "matrix">(tab === "matrix" ? "matrix" : "horoscope");

  // Получаем знак зодиака для API гороскопа
  const zodiacSignName = useMemo(() => {
    if (!birthDate) return null;
    return getZodiacSign(birthDate);
  }, [birthDate]);
  
  // Хуки для получения гороскопа через API
  const { horoscope: dailyHoroscope, loading: horoscopeLoading } = useHoroscope(zodiacSignName || '', 'today');
  const { horoscope: weeklyHoroscope, loading: weeklyLoading } = useHoroscope(zodiacSignName || '', 'week');
  const { horoscope: monthlyHoroscope, loading: monthlyLoading } = useHoroscope(zodiacSignName || '', 'month');

  useEffect(() => {
    if (tab === "matrix") {
      setActiveTab("matrix");
      logHoroscopeClick("matrix");
    }
  }, [tab, logHoroscopeClick]);

  const formatDateInput = (text: string) => {
    const digits = text.replace(/\D/g, "");
    let formatted = "";
    for (let i = 0; i < digits.length && i < 8; i++) {
      if (i === 2 || i === 4) {
        formatted += ".";
      }
      formatted += digits[i];
    }
    return formatted;
  };

  const handleDateInputChange = (text: string) => {
    const formatted = formatDateInput(text);
    setDateInput(formatted);
  };

  const isValidDate = (date: string): boolean => {
    const regex = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!regex.test(date)) return false;
    const [day, month, year] = date.split(".").map(Number);
    if (year < 1900 || year > 2100) return false;
    if (month < 1 || month > 12) return false;
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) return false;
    return true;
  };

  const handleDateSubmit = () => {
    if (!isValidDate(dateInput)) {
      Alert.alert("Ошибка", "Введите корректную дату в формате ДД.ММ.ГГГГ");
      return;
    }
    setBirthDate(dateInput);
  };

  const calculateMatrix = (date: string) => {
    return calculateMatrixFromDate(date);
  };

  const matrixData = useMemo(() => {
    if (!birthDate || !/^\d{2}\.\d{2}\.\d{4}$/.test(birthDate)) return null;
    return calculateMatrix(birthDate);
  }, [birthDate, isPremium]);

  const getArcanaName = (num: number): string => {
    const arcanas = [
      "", "Маг", "Верховная Жрица", "Императрица", "Император", "Иерофант", "Влюбленные", "Колесница", "Сила", "Отшельник",
      "Колесо Фортуны", "Справедливость", "Повешенный", "Смерть", "Умеренность", "Дьявол", "Башня", "Звезда", "Луна", "Солнце",
      "Суд", "Мир", "Шут"
    ];
    return arcanas[num] || `Аркан ${num}`;
  };

  const getPointDescription = (value: number): string => {
    return PERSONALITY_TRAITS[value]?.positive || "Дополнительная энергетическая характеристика матрицы судьбы.";
  };

  const zodiacSign = birthDate ? getZodiacSign(birthDate) : null;
  const zodiacData = zodiacSign ? ZODIAC_SIGNS[zodiacSign] : null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Гороскоп и Матрица судьбы</Text>
      </View>
      {!birthDate ? (
        <View style={styles.dateInputContainer}>
          <Text style={styles.inputLabel}>Введите дату рождения</Text>
          <TextInput
            style={styles.dateInput}
            placeholder="ДД.ММ.ГГГГ"
            placeholderTextColor="#666"
            value={dateInput}
            onChangeText={handleDateInputChange}
            keyboardType="numeric"
            maxLength={10}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleDateSubmit}>
            <LinearGradient colors={["#ffd700", "#ffed4e"]} style={styles.submitGradient}>
              <Text style={styles.submitText}>Продолжить</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.tabSelector}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === "horoscope" ? styles.tabButtonActive : styles.tabButtonInactive]}
              onPress={() => {
                logHoroscopeClick("horoscope");
                setActiveTab("horoscope");
                if (tab === "matrix") {
                  router.replace("/horoscope");
                }
              }}
            >
              <LinearGradient
                colors={activeTab === "horoscope" ? ["#2196f3", "#3f51b5"] : ["#444", "#666"]}
                style={styles.tabGradient}
              >
                <Text style={[styles.tabText, activeTab === "horoscope" ? styles.tabTextActive : styles.tabTextInactive]}>
                  Гороскоп
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === "matrix" ? styles.tabButtonActive : styles.tabButtonInactive]}
              onPress={() => {
                logHoroscopeClick("matrix");
                setActiveTab("matrix");
              }}
            >
              <LinearGradient
                colors={activeTab === "matrix" ? ["#4caf50", "#8bc34a"] : ["#444", "#666"]}
                style={styles.tabGradient}
              >
                <Text style={[styles.tabText, activeTab === "matrix" ? styles.tabTextActive : styles.tabTextInactive]}>
                  Матрица судьбы
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          {activeTab === "horoscope" && (
            <View key="horoscope-content">
              <View style={styles.zodiacCard}>
                <LinearGradient colors={["#2196f3", "#3f51b5"]} style={styles.zodiacGradient}>
                  <Text style={styles.zodiacSymbol}>{zodiacData?.symbol || ""}</Text>
                  <Text style={styles.zodiacName}>{zodiacData?.name || ""}</Text>
                  <Text style={styles.zodiacDates}>{zodiacData?.dates || ""}</Text>
                  <Text style={styles.zodiacElement}>Стихия: {zodiacData?.element || ""}</Text>
                </LinearGradient>
              </View>
              <View style={styles.periodSelector}>
                {(["today", "week", "month"] as const).map((period) => (
                  <TouchableOpacity
                    key={period}
                    style={[styles.periodButton, selectedPeriod === period && styles.periodButtonActive]}
                    onPress={() => {
                      logHoroscopeClick(`horoscope_${period}`);
                      setSelectedPeriod(period);
                    }}
                  >
                    <Text style={[styles.periodText, selectedPeriod === period && styles.periodTextActive]}>
                      {period === "today" ? "Сегодня" : period === "week" ? "Неделя" : "Месяц"}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.horoscopeCard}>
                {selectedPeriod === "today" || isPremium ? (
                  <>
                    <Text style={styles.horoscopeTitle}>
                      {selectedPeriod === "today" ? "Прогноз на сегодня" : selectedPeriod === "week" ? "Прогноз на неделю" : "Прогноз на месяц"}
                    </Text>
                    
                    {/* Отображение гороскопа в зависимости от периода */}
                    {selectedPeriod === "today" && (
                      <>
                        {horoscopeLoading ? (
                          <Text style={styles.horoscopeText}>Загрузка гороскопа...</Text>
                        ) : dailyHoroscope ? (
                          <>
                            {dailyHoroscope.text.split('\n\n').map((paragraph, index) => (
                              <Text key={index} style={[styles.horoscopeText, index > 0 && { marginTop: 16 }]}>
                                {paragraph}
                              </Text>
                            ))}
                            <View style={styles.horoscopeSource}>
                              <Text style={styles.horoscopeSourceText}>
                                {new Date(dailyHoroscope.date).toLocaleDateString('ru-RU', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })} • Источник: Рамблер
                              </Text>
                            </View>
                          </>
                        ) : (
                          <Text style={styles.horoscopeText}>Не удалось загрузить гороскоп</Text>
                        )}
                      </>
                    )}
                    
                    {selectedPeriod === "week" && (
                      <>
                        {weeklyLoading ? (
                          <Text style={styles.horoscopeText}>Загрузка недельного гороскопа...</Text>
                        ) : weeklyHoroscope ? (
                          <>
                            {weeklyHoroscope.text.split('\n\n').map((paragraph, index) => (
                              <Text key={index} style={[styles.horoscopeText, index > 0 && { marginTop: 16 }]}>
                                {paragraph}
                              </Text>
                            ))}
                            <View style={styles.horoscopeSource}>
                              <Text style={styles.horoscopeSourceText}>
                                {weeklyHoroscope.weekRange || new Date(weeklyHoroscope.date).toLocaleDateString('ru-RU', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })} • Источник: Рамблер
                              </Text>
                            </View>
                          </>
                        ) : (
                          <Text style={styles.horoscopeText}>Не удалось загрузить недельный гороскоп</Text>
                        )}
                      </>
                    )}
                    
                    {selectedPeriod === "month" && (
                      <>
                        {monthlyLoading ? (
                          <Text style={styles.horoscopeText}>Загрузка месячного гороскопа...</Text>
                        ) : monthlyHoroscope ? (
                          <>
                            {monthlyHoroscope.text.split('\n\n').map((paragraph, index) => (
                              <Text key={index} style={[styles.horoscopeText, index > 0 && { marginTop: 16 }]}>
                                {paragraph}
                              </Text>
                            ))}
                            <View style={styles.horoscopeSource}>
                              <Text style={styles.horoscopeSourceText}>
                                {monthlyHoroscope.monthRange || new Date(monthlyHoroscope.date).toLocaleDateString('ru-RU', {
                                  month: 'long',
                                  year: 'numeric'
                                })} • Источник: Рамблер
                              </Text>
                            </View>
                          </>
                        ) : (
                          <Text style={styles.horoscopeText}>Не удалось загрузить месячный гороскоп</Text>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <View style={styles.lockedBlock}>
                    <Crown size={28} color="#ffd700" />
                    <Text style={styles.lockedText}>Доступно только для премиум</Text>
                    <TouchableOpacity style={styles.unlockButton} onPress={() => router.push("/subscription")}>
                      <LinearGradient colors={["#ffd700", "#ffed4e"]} style={styles.unlockGradient}>
                        <Text style={styles.unlockText}>Открыть доступ</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              {isPremium ? (
                <View style={styles.infoCards}>
                  <View style={styles.infoCard}>
                    <Gem size={24} color="#ffd700" />
                    <Text style={styles.infoTitle}>Камни-талисманы</Text>
                    <Text style={styles.infoText}>{zodiacData?.stones.join(", ") || ""}</Text>
                  </View>
                  <View style={styles.infoCard}>
                    <Heart size={24} color="#ff69b4" />
                    <Text style={styles.infoTitle}>Тотемное животное</Text>
                    <Text style={styles.infoText}>{zodiacData?.totem || ""}</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.lockedBlock}>
                  <Crown size={28} color="#ffd700" />
                  <Text style={styles.lockedText}>Камни и тотемное животное доступны только для премиум</Text>
                  <TouchableOpacity style={styles.unlockButton} onPress={() => router.push("/subscription")}>
                    <LinearGradient colors={["#ffd700", "#ffed4e"]} style={styles.unlockGradient}>
                      <Text style={styles.unlockText}>Открыть доступ</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )}
              <View style={styles.compatibilityCard}>
                <Text style={styles.compatibilityTitle}>Совместимость</Text>
                <View style={styles.compatibilityList}>
                  <View style={styles.compatibilityItem}>
                    <Text style={styles.compatibilityLabel}>Лучшая:</Text>
                    <Text style={styles.compatibilityValue}>{zodiacData?.compatibility.best.join(", ") || ""}</Text>
                  </View>
                  <View style={styles.compatibilityItem}>
                    <Text style={styles.compatibilityLabel}>Хорошая:</Text>
                    <Text style={styles.compatibilityValue}>{zodiacData?.compatibility.good.join(", ") || ""}</Text>
                  </View>
                  <View style={styles.compatibilityItem}>
                    <Text style={styles.compatibilityLabel}>Сложная:</Text>
                    <Text style={styles.compatibilityValue}>{zodiacData?.compatibility.challenging.join(", ") || ""}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          {activeTab === "matrix" && matrixData && (
            <View key="matrix-content">
              <View style={styles.matrixContainer}>
                <MatrixSVG matrix={matrixData.matrixArray} />
              </View>
              <View style={styles.interpretationContainer}>
                <Text style={styles.interpretationTitle}>Расшифровка точек</Text>
                {matrixData.matrixArray.map((point, index) => {
                  const isLocked = !isPremium && index > 4; // Lock points after the first 5 for non-premium users
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[styles.pointCard, isLocked && styles.pointCardLocked]}
                      onPress={() => {
                        if (isLocked) {
                          router.push("/subscription");
                        }
                      }}
                    >
                      <View style={styles.pointHeader}>
                        <View style={styles.pointInfo}>
                          <Text style={styles.pointValue}>{isLocked ? "?" : point.value}</Text>
                          <View>
                            <Text style={styles.pointMeaning}>Точка {index + 1}</Text>
                            {!isLocked && (
                              <Text style={styles.arcanaName}>{getArcanaName(point.value)}</Text>
                            )}
                          </View>
                        </View>
                        {isLocked && <Sparkles size={20} color="#666" />}
                      </View>
                      {!isLocked && (
                        <Text style={styles.pointDescription}>{getPointDescription(point.value)}</Text>
                      )}
                      {isLocked && (
                        <Text style={styles.lockedText}>Разблокируйте полную расшифровку с премиум подпиской</Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
              {!isPremium && (
                <TouchableOpacity
                  style={[styles.unlockButton, { marginVertical: 10 }]}
                  onPress={() => router.push("/subscription")}
                >
                  <LinearGradient colors={["#ffd700", "#ffed4e"]} style={styles.unlockGradient}>
                    <Sparkles size={20} color="#1a1a2e" />
                    <Text style={styles.unlockText}>Разблокировать полную матрицу</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>
          )}
          <TouchableOpacity
            style={styles.changeButton}
            onPress={() => {
              setBirthDate("");
              setDateInput("");
            }}
          >
            <Calendar size={20} color="#ffd700" />
            <Text style={styles.changeText}>Изменить дату рождения</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f1e",
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  dateInputContainer: {
    padding: 20,
    alignItems: "center",
  },
  inputLabel: {
    fontSize: 16,
    color: "#b8b8d0",
    marginBottom: 20,
  },
  dateInput: {
    width: "100%",
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  submitButton: {
    width: "100%",
  },
  submitGradient: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  submitText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a2e",
  },
  tabSelector: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  tabButtonActive: {
    borderWidth: 1,
    borderColor: "#ffd700",
    elevation: 4,
    shadowColor: "#ffd700",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  tabButtonInactive: {
    borderWidth: 1,
    borderColor: "#666",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  tabGradient: {
    padding: 12,
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#fff",
  },
  tabTextInactive: {
    color: "#b8b8d0",
  },
  zodiacCard: {
    margin: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  zodiacGradient: {
    padding: 30,
    alignItems: "center",
  },
  zodiacSymbol: {
    fontSize: 60,
    marginBottom: 10,
  },
  zodiacName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  zodiacDates: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 8,
  },
  zodiacElement: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  periodSelector: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 20,
  },
  periodButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
  },
  periodButtonActive: {
    backgroundColor: "rgba(255,215,0,0.2)",
    borderWidth: 1,
    borderColor: "#ffd700",
  },
  periodText: {
    color: "#b8b8d0",
    fontSize: 14,
    fontWeight: "500",
  },
  periodTextActive: {
    color: "#ffd700",
  },
  horoscopeCard: {
    margin: 20,
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
  },
  horoscopeTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffd700",
    marginBottom: 12,
  },
  horoscopeText: {
    fontSize: 14,
    color: "#b8b8d0",
    lineHeight: 22,
  },
  horoscopeSource: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  horoscopeSourceText: {
    fontSize: 12,
    color: "#b8b8d0",
    opacity: 0.7,
  },
  infoCards: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
  },
  infoCard: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    marginTop: 8,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: "#b8b8d0",
    textAlign: "center",
  },
  compatibilityCard: {
    margin: 20,
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
  },
  compatibilityTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffd700",
    marginBottom: 16,
  },
  compatibilityList: {
    gap: 12,
  },
  compatibilityItem: {
    flexDirection: "row",
    gap: 8,
  },
  compatibilityLabel: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
    width: 80,
  },
  compatibilityValue: {
    fontSize: 14,
    color: "#b8b8d0",
    flex: 1,
  },
  changeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    margin: 20,
    padding: 12,
    backgroundColor: "rgba(255,215,0,0.2)",
    borderRadius: 12,
  },
  changeText: {
    color: "#ffd700",
    fontSize: 14,
    fontWeight: "500",
  },
  lockedBlock: {
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  lockedText: {
    color: "#b8b8d0",
    fontSize: 14,
    textAlign: "center",
    paddingLeft: 30,
    paddingRight: 30,
  },
  unlockButton: {
    marginHorizontal: 10,
    marginTop: 12,
  },
  unlockGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 10,
    borderRadius: 12,
  },
  unlockText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a2e",
  },
  matrixContainer: {
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  interpretationContainer: {
    padding: 20,
    paddingTop: 10,
  },
  interpretationTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffd700",
    marginBottom: 12,
  },
  pointCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  pointCardLocked: {
    opacity: 0.6,
  },
  pointHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  pointInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  pointValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffd700",
    width: 40,
    textAlign: "center",
  },
  pointMeaning: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  arcanaName: {
    fontSize: 12,
    color: "#b8b8d0",
    marginTop: 2,
  },
  pointDescription: {
    fontSize: 14,
    color: "#b8b8d0",
    lineHeight: 20,
  },
});