import React, { useState, useMemo, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar, Gem, Heart, Crown, Sparkles } from "lucide-react-native";
import { useUser } from "@/providers/UserProvider";
import { useSubscription } from "@/providers/SubscriptionProvider";
import { ZODIAC_SIGNS, getZodiacSign } from "@/constants/zodiac";
import { PERSONALITY_TRAITS } from "@/constants/personality";
import { router, useLocalSearchParams } from "expo-router";
import { useDatabase } from "@/hooks/useDatabase";
import { useHoroscope } from "@/hooks/useHoroscope";
import DestinyMatrixSVG from "@/components/DestinyMatrixSVG";
import { calculateDestinyMatrix } from "@/utils/destinyMatrix";
import { useAuth } from "@/providers/AuthProvider";
import { 
  PURPOSE_20_40, 
  PURPOSE_40_60, 
  TALENTS,
  CHALLENGES,
  MONEY_DIRECTION,
  MONEY_SUCCESS,
} from "@/constants/destinyMatrix";

const { width, height } = Dimensions.get("window");

export default function HoroscopeScreen() {
  const { birthDate, setBirthDate } = useUser();
  const { isPremium } = useSubscription();
  const { logHoroscopeClick } = useDatabase();
  const { tab } = useLocalSearchParams<{ tab?: string }>();
  const { user } = useAuth();
  const [dateInput, setDateInput] = useState(birthDate || "");
  const [selectedPeriod, setSelectedPeriod] = useState<"today" | "week" | "month">("today");
  const [activeTab, setActiveTab] = useState<"horoscope" | "matrix">(tab === "matrix" ? "matrix" : "horoscope");
  const [matrixTab, setMatrixTab] = useState<"visual" | "purpose" | "talents" | "money" | "challenges">("visual");

  const normalizeAccountBirthDate = (value?: string): string | null => {
    if (!value) return null;
    const trimmed = value.trim();
    if (!trimmed) return null;
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(trimmed)) return trimmed;
    const iso = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (iso) {
      const [, y, m, d] = iso;
      return `${d}.${m}.${y}`;
    }
    return null;
  };

  useEffect(() => {
    if (birthDate) return;
    const accountDate = normalizeAccountBirthDate(user?.birthDate);
    if (!accountDate) return;
    setBirthDate(accountDate);
    setDateInput(accountDate);
  }, [user?.birthDate, birthDate, setBirthDate]);

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

  // Конвертация даты из ДД.ММ.ГГГГ в ГГГГ-ММ-ДД для расчета матрицы
  const convertDateForMatrix = (date: string): string => {
    const match = date.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
    if (!match) return "";
    const [, day, month, year] = match;
    return `${year}-${month}-${day}`;
  };

  const matrixData = useMemo(() => {
    if (!birthDate || !/^\d{2}\.\d{2}\.\d{4}$/.test(birthDate)) return null;
    const isoDate = convertDateForMatrix(birthDate);
    return calculateDestinyMatrix(isoDate);
  }, [birthDate]);

  const calculateAge = () => {
    if (!birthDate) return 0;
    const match = birthDate.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
    if (!match) return 0;
    const [, day, month, year] = match;
    const birth = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const getPurposeForAge = () => {
    const age = calculateAge();
    if (age < 40) return PURPOSE_20_40;
    return PURPOSE_40_60;
  };

  const getArcanaName = (num: number): string => {
    const arcanas = [
      "", "Маг", "Верховная Жрица", "Императрица", "Император", "Иерофант", "Влюбленные", "Колесница", "Сила", "Отшельник",
      "Колесо Фортуны", "Справедливость", "Повешенный", "Смерть", "Умеренность", "Дьявол", "Башня", "Звезда", "Луна", "Солнце",
      "Суд", "Мир", "Шут"
    ];
    return arcanas[num] || `Аркан ${num}`;
  };

  const getPointDescription = (index: number): string => {
    const descriptions = [
      "Центральная точка матрицы (Д) - предназначение, жизненный сценарий, основная задача души, здоровье, руководство по жизни.",
      "День рождения (А2) - глубинные личные качества, таланты, программы из прошлой жизни, предназначение.",
      "Месяц рождения (Б2) - глубинная зона комфорта, родители, женская линия, сексуальность, отношения.",
      "Год рождения (В2) - глубинные таланты, наследство от предков, деньги, прошлая жизнь.",
      "Сумма А+Б+В (Г2) - глубинная кармическая задача, прошлая жизнь, отношения, дети.",
      "А + Б (Е2) - глубинная энергия родителей, семейные программы, детство, здоровье.",
      "Б + В (Ж2) - глубинная энергия отношений, сексуальность, партнерство, дети.",
      "В + Г (И2) - глубинная энергия карьеры, деньги, таланты в работе, успех.",
      "А + Г (З2) - глубинная энергия здоровья, программы, жизненный сценарий, руководство по жизни.",
      "А - личные качества, характер, таланты, предназначение, программы.",
      "Б - зона комфорта, эмоциональная сфера, родители, женская энергия, сексуальность.",
      "В - таланты, душа, прошлая жизнь, деньги, предназначение.",
      "Г - кармическая задача, отец линия, прошлая жизнь, отношения, дети.",
      "Е - энергия родителей, детство, семейные программы, здоровье.",
      "Ж - энергия отношений, сексуальность, партнерство, дети.",
      "И - энергия денег, карьера, успех, таланты.",
      "З - энергия здоровья, программы, жизненный сценарий, руководство по жизни.",
      "А1 - внутренняя личные качества, глубокие таланты, программы.",
      "Б1 - внутренняя зона комфорта, глубокие отношения с родителями, сексуальность.",
      "В1 - внутренние таланты, глубокие способности, деньги, прошлая жизнь.",
      "Г1 - внутренняя кармическая задача, глубокая прошлая жизнь, отношения.",
      "Е1 - внутренняя энергия родителей, глубокие программы, здоровье, детство.",
      "Ж1 - внутренняя энергия отношений, глубокая сексуальность, партнерство, дети.",
      "И1 - внутренняя энергия карьеры, глубокие деньги, успех, таланты.",
      "З1 - внутренняя энергия здоровья, глубокие программы, жизненный сценарий, руководство."
    ];
    return descriptions[index] || "Дополнительная энергетическая характеристика матрицы судьбы.";
  };

  const zodiacSign = birthDate ? getZodiacSign(birthDate) : null;
  const zodiacData = zodiacSign ? ZODIAC_SIGNS[zodiacSign] : null;
  const zodiacSignName = zodiacData?.name || "";

  const { horoscope: dailyHoroscope, loading: dailyLoading, error: dailyError } = useHoroscope(zodiacSignName, "today");
  const { horoscope: weeklyHoroscope, loading: weeklyLoading, error: weeklyError } = useHoroscope(zodiacSignName, "week");
  const { horoscope: monthlyHoroscope, loading: monthlyLoading, error: monthlyError } = useHoroscope(zodiacSignName, "month");

  const formatRuDate = (isoDate: string, opts?: Intl.DateTimeFormatOptions) => {
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) return isoDate;
    return date.toLocaleDateString("ru-RU", opts);
  };

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
                    {selectedPeriod === "today" ? (
                      dailyLoading ? (
                        <Text style={styles.horoscopeText}>Загрузка гороскопа...</Text>
                      ) : dailyError ? (
                        <Text style={styles.horoscopeText}>{dailyError}</Text>
                      ) : dailyHoroscope ? (
                        <>
                          {dailyHoroscope.text
                            .split("\n\n")
                            .filter(Boolean)
                            .map((paragraph, index) => (
                              <Text key={index} style={[styles.horoscopeText, index > 0 && { marginTop: 12 }]}>
                                {paragraph}
                              </Text>
                            ))}
                          <Text style={styles.horoscopeMeta}>
                            {formatRuDate(dailyHoroscope.date, { day: "numeric", month: "long", year: "numeric" })} • Источник: Рамблер
                          </Text>
                        </>
                      ) : (
                        <Text style={styles.horoscopeText}>{zodiacData?.horoscope.today || ""}</Text>
                      )
                    ) : selectedPeriod === "week" ? (
                      weeklyLoading ? (
                        <Text style={styles.horoscopeText}>Загрузка недельного гороскопа...</Text>
                      ) : weeklyError ? (
                        <Text style={styles.horoscopeText}>{weeklyError}</Text>
                      ) : weeklyHoroscope ? (
                        <>
                          {weeklyHoroscope.text
                            .split("\n\n")
                            .filter(Boolean)
                            .map((paragraph, index) => (
                              <Text key={index} style={[styles.horoscopeText, index > 0 && { marginTop: 12 }]}>
                                {paragraph}
                              </Text>
                            ))}
                          <Text style={styles.horoscopeMeta}>
                            {(weeklyHoroscope.weekRange ||
                              formatRuDate(weeklyHoroscope.date, { day: "numeric", month: "long", year: "numeric" }))}{" "}
                            • Источник: Рамблер
                          </Text>
                        </>
                      ) : (
                        <Text style={styles.horoscopeText}>{zodiacData?.horoscope.week || ""}</Text>
                      )
                    ) : monthlyLoading ? (
                      <Text style={styles.horoscopeText}>Загрузка месячного гороскопа...</Text>
                    ) : monthlyError ? (
                      <Text style={styles.horoscopeText}>{monthlyError}</Text>
                    ) : monthlyHoroscope ? (
                      <>
                        {monthlyHoroscope.text
                          .split("\n\n")
                          .filter(Boolean)
                          .map((paragraph, index) => (
                            <Text key={index} style={[styles.horoscopeText, index > 0 && { marginTop: 12 }]}>
                              {paragraph}
                            </Text>
                          ))}
                        <Text style={styles.horoscopeMeta}>
                          {(monthlyHoroscope.monthRange || formatRuDate(monthlyHoroscope.date, { month: "long", year: "numeric" }))} • Источник: Рамблер
                        </Text>
                      </>
                    ) : (
                      <Text style={styles.horoscopeText}>{zodiacData?.horoscope.month || ""}</Text>
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
              {/* Вкладки матрицы */}
              <View style={styles.matrixTabContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <TouchableOpacity
                    style={[styles.matrixTab, matrixTab === "visual" && styles.matrixTabActive]}
                    onPress={() => setMatrixTab("visual")}
                  >
                    <Text style={[styles.matrixTabText, matrixTab === "visual" && styles.matrixTabTextActive]}>
                      Матрица
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.matrixTab, matrixTab === "purpose" && styles.matrixTabActive]}
                    onPress={() => setMatrixTab("purpose")}
                  >
                    <Text style={[styles.matrixTabText, matrixTab === "purpose" && styles.matrixTabTextActive]}>
                      Предназначение
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.matrixTab, matrixTab === "talents" && styles.matrixTabActive]}
                    onPress={() => setMatrixTab("talents")}
                  >
                    <Text style={[styles.matrixTabText, matrixTab === "talents" && styles.matrixTabTextActive]}>
                      Таланты
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.matrixTab, matrixTab === "money" && styles.matrixTabActive]}
                    onPress={() => setMatrixTab("money")}
                  >
                    <Text style={[styles.matrixTabText, matrixTab === "money" && styles.matrixTabTextActive]}>
                      Деньги
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.matrixTab, matrixTab === "challenges" && styles.matrixTabActive]}
                    onPress={() => setMatrixTab("challenges")}
                  >
                    <Text style={[styles.matrixTabText, matrixTab === "challenges" && styles.matrixTabTextActive]}>
                      Испытания
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>

              {/* Визуализация матрицы */}
              {matrixTab === "visual" && (
                <>
                  <View style={styles.matrixVisualization}>
                    <DestinyMatrixSVG matrix={matrixData.points} width={width * 0.95} height={300} />
                  </View>
                  
                  <View style={styles.purposesCard}>
                    <Text style={styles.purposesTitle}>Предназначения</Text>
                    <View style={styles.purposeRow}>
                      <Text style={styles.purposeLabel}>Личное:</Text>
                      <Text style={styles.purposeValue}>{matrixData.purposes.perspurpose}</Text>
                    </View>
                    <View style={styles.purposeRow}>
                      <Text style={styles.purposeLabel}>Социальное:</Text>
                      <Text style={styles.purposeValue}>{matrixData.purposes.socialpurpose}</Text>
                    </View>
                    <View style={styles.purposeRow}>
                      <Text style={styles.purposeLabel}>Духовное:</Text>
                      <Text style={styles.purposeValue}>{matrixData.purposes.generalpurpose}</Text>
                    </View>
                    <View style={styles.purposeRow}>
                      <Text style={styles.purposeLabel}>Планетарное:</Text>
                      <Text style={styles.purposeValue}>{matrixData.purposes.planetarypurpose}</Text>
                    </View>
                  </View>
                </>
              )}

              {/* Предназначение */}
              {matrixTab === "purpose" && (
                <View style={styles.contentCard}>
                  <Text style={styles.contentTitle}>Предназначение ({calculateAge()} лет)</Text>
                  {matrixData.points[0] && getPurposeForAge()[matrixData.points[0].value] && (
                    <Text style={styles.contentText}>
                      {getPurposeForAge()[matrixData.points[0].value].description}
                    </Text>
                  )}
                </View>
              )}

              {/* Таланты */}
              {matrixTab === "talents" && (
                <View style={styles.contentCard}>
                  <Text style={styles.contentTitle}>Ваши таланты</Text>
                  {matrixData.points[0] && TALENTS[matrixData.points[0].value] && (
                    <Text style={styles.contentText}>
                      {TALENTS[matrixData.points[0].value].description}
                    </Text>
                  )}
                </View>
              )}

              {/* Деньги */}
              {matrixTab === "money" && (
                <View style={styles.contentCard}>
                  <Text style={styles.contentTitle}>Финансы и карьера</Text>
                  {matrixData.points[15] && MONEY_DIRECTION[matrixData.points[15].value] && (
                    <>
                      <Text style={styles.contentSubtitle}>Направление деятельности:</Text>
                      <Text style={styles.contentText}>
                        {MONEY_DIRECTION[matrixData.points[15].value].description}
                      </Text>
                    </>
                  )}
                  {matrixData.points[25] && MONEY_SUCCESS[matrixData.points[25].value] && (
                    <>
                      <Text style={styles.contentSubtitle}>Для достижения успеха:</Text>
                      <Text style={styles.contentText}>
                        {MONEY_SUCCESS[matrixData.points[25].value].description}
                      </Text>
                    </>
                  )}
                </View>
              )}

              {/* Испытания */}
              {matrixTab === "challenges" && (
                <View style={styles.contentCard}>
                  <Text style={styles.contentTitle}>Жизненные испытания</Text>
                  {matrixData.points[0] && CHALLENGES[matrixData.points[0].value] && (
                    <Text style={styles.contentText}>
                      {CHALLENGES[matrixData.points[0].value].description}
                    </Text>
                  )}
                </View>
              )}

              {!isPremium && (
                <TouchableOpacity
                  style={[styles.unlockButton, { marginVertical: 20 }]}
                  onPress={() => router.push("/subscription")}
                >
                  <LinearGradient colors={["#ffd700", "#ffed4e"]} style={styles.unlockGradient}>
                    <Sparkles size={20} color="#1a1a2e" />
                    <Text style={styles.unlockText}>Разблокировать полную матрицу</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}

              {matrixTab === "visual" && (
                <View style={styles.personalityContainer}>
                  <Text style={styles.personalityTitle}>Характер и суперсила по матрице</Text>

                  <View style={styles.personalityCard}>
                    <Text style={styles.personalityCardTitle}>В плюсе</Text>
                    <Text style={styles.personalityLabel}>
                      День рождения: {matrixData.points[1]?.value}
                    </Text>
                    <Text style={styles.personalityText}>
                      {PERSONALITY_TRAITS[matrixData.points[1]?.value || 0]?.positive || "Описание отсутствует"}
                    </Text>
                    {matrixData.points[2] && matrixData.points[2].value !== matrixData.points[1]?.value && (
                      <>
                        <View style={styles.personalityDivider} />
                        <Text style={styles.personalityLabel}>
                          Месяц рождения: {matrixData.points[2].value}
                        </Text>
                        <Text style={styles.personalityText}>
                          {PERSONALITY_TRAITS[matrixData.points[2].value]?.positive || "Описание отсутствует"}
                        </Text>
                      </>
                    )}
                  </View>

                  <View style={styles.personalityCard}>
                    <Text style={styles.personalityCardTitle}>В минусе</Text>
                    <Text style={styles.personalityLabel}>
                      День рождения: {matrixData.points[1]?.value}
                    </Text>
                    <Text style={styles.personalityText}>
                      {PERSONALITY_TRAITS[matrixData.points[1]?.value || 0]?.negative || "Описание отсутствует"}
                    </Text>
                    {matrixData.points[2] && matrixData.points[2].value !== matrixData.points[1]?.value && (
                      <>
                        <View style={styles.personalityDivider} />
                        <Text style={styles.personalityLabel}>
                          Месяц рождения: {matrixData.points[2].value}
                        </Text>
                        <Text style={styles.personalityText}>
                          {PERSONALITY_TRAITS[matrixData.points[2].value]?.negative || "Описание отсутствует"}
                        </Text>
                      </>
                    )}
                  </View>

                  <View style={styles.personalityCard}>
                    <Text style={styles.personalityCardTitle}>В общении</Text>
                    <Text style={styles.personalityLabel}>
                      Центральная точка: {matrixData.points[0]?.value}
                    </Text>
                    <Text style={styles.personalityText}>
                      {PERSONALITY_TRAITS[matrixData.points[0]?.value || 0]?.communication || "Описание отсутствует"}
                    </Text>
                  </View>

                  <View style={styles.personalityCard}>
                    <Text style={styles.personalityCardTitle}>Ваша суперсила</Text>
                    <Text style={styles.personalityLabel}>
                      Центральная точка: {matrixData.points[0]?.value}
                    </Text>
                    <Text style={styles.personalityText}>
                      {PERSONALITY_TRAITS[matrixData.points[0]?.value || 0]?.superpower || "Описание отсутствует"}
                    </Text>
                  </View>
                </View>
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
  horoscopeMeta: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
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
    marginTop: 0,
    marginBottom: 40,
    minHeight: Math.min(width * 1.2, height * 0.7, 600),
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
  personalityContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  personalityTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffd700",
    marginBottom: 12,
  },
  personalityCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  personalityCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  personalityLabel: {
    fontSize: 13,
    color: "#ffd700",
    marginBottom: 4,
  },
  personalityText: {
    fontSize: 13,
    color: "#b8b8d0",
    lineHeight: 20,
  },
  personalityDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 10,
  },
  matrixTabContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  matrixTab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  matrixTabActive: {
    backgroundColor: "rgba(255,215,0,0.2)",
    borderWidth: 1,
    borderColor: "#ffd700",
  },
  matrixTabText: {
    color: "#b8b8d0",
    fontSize: 14,
    fontWeight: "500",
  },
  matrixTabTextActive: {
    color: "#ffd700",
  },
  matrixVisualization: {
    alignItems: "center",
    marginBottom: 20,
  },
  purposesCard: {
    margin: 20,
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
  },
  purposesTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffd700",
    marginBottom: 16,
  },
  purposeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  purposeLabel: {
    fontSize: 14,
    color: "#b8b8d0",
  },
  purposeValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffd700",
  },
  contentCard: {
    margin: 20,
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffd700",
    marginBottom: 16,
  },
  contentSubtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#9c27b0",
    marginTop: 16,
    marginBottom: 8,
  },
  contentText: {
    fontSize: 14,
    color: "#b8b8d0",
    lineHeight: 22,
  },
});