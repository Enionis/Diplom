import React, { useState, useMemo } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar, Gem, Heart, Crown, Sparkles } from "lucide-react-native";
import { useUser } from "@/providers/UserProvider";
import { useSubscription } from "@/providers/SubscriptionProvider";
import { ZODIAC_SIGNS, getZodiacSign } from "@/constants/zodiac";
import { router } from "expo-router";
import Svg, { Circle, Line, Text as SvgText } from "react-native-svg";
import { useDatabase } from "@/hooks/useDatabase";

const { width, height } = Dimensions.get("window");

interface MatrixPoint {
  value: number;
  x: number;
  y: number;
  meaning: string;
  locked?: boolean;
}

export default function HoroscopeScreen() {
  const { birthDate, setBirthDate } = useUser();
  const { isPremium } = useSubscription();
  const { logHoroscopeClick } = useDatabase();
  const [dateInput, setDateInput] = useState(birthDate || "");
  const [selectedPeriod, setSelectedPeriod] = useState<"today" | "week" | "month">("today");
  const [activeTab, setActiveTab] = useState<"horoscope" | "matrix">("horoscope");

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

  const calculateMatrix = (date: string): MatrixPoint[] | null => {
    const regex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
    const match = date.match(regex);
    if (!match) return null;
    const [, dayStr, monthStr, yearStr] = match;
    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);
    const daysInMonth = new Date(year, month, 0).getDate();
    if (month < 1 || month > 12 || day < 1 || day > daysInMonth) {
      return null;
    }

    const reduceNum = (n: number): number => {
      while (n > 22) {
        n = n.toString().split('').map(Number).reduce((sum, digit) => sum + digit, 0);
      }
      return n;
    };

    const A = reduceNum(day);
    const B = reduceNum(month);
    const V = reduceNum(year);
    const G = reduceNum(A + B + V);
    const D = reduceNum(A + B + V + G);
    const E = reduceNum(A + B);
    const Zh = reduceNum(B + V);
    const I = reduceNum(V + G);
    const Z = reduceNum(A + G);
    const S = reduceNum(E + Zh + I + Z);
    const A1 = reduceNum(A + D);
    const A2 = reduceNum(A1 + A);
    const B1 = reduceNum(B + D);
    const B2 = reduceNum(B1 + B);
    const V1 = reduceNum(V + D);
    const V2 = reduceNum(V1 + V);
    const G1 = reduceNum(G + D);
    const G2 = reduceNum(G1 + G);
    const E1 = reduceNum(E + S);
    const E2 = reduceNum(E1 + E);
    const Zh1 = reduceNum(Zh + S);
    const Zh2 = reduceNum(Zh1 + Zh);
    const I1 = reduceNum(I + S);
    const I2 = reduceNum(I1 + I);
    const Z1 = reduceNum(Z + S);
    const Z2 = reduceNum(Z1 + Z);

    const scaleFactor = Math.min(width / 360, 1);
    const centerX = width / 2;
    const centerY = Math.min(height * 0.35, 250);
    const mainRadius = 100 * scaleFactor;
    const innerRadius = 57 * scaleFactor;
    const outerRadius = 142 * scaleFactor;

    const points: MatrixPoint[] = [
      { value: D, x: centerX, y: centerY, meaning: "Центр матрицы (Д)" },
      { value: A2, x: centerX - mainRadius, y: centerY, meaning: "День рождения (А2)" },
      { value: B2, x: centerX, y: centerY - mainRadius, meaning: "Месяц рождения (Б2)" },
      { value: V2, x: centerX + mainRadius, y: centerY, meaning: "Год рождения (В2)" },
      { value: G2, x: centerX, y: centerY + mainRadius, meaning: "Сумма А+Б+В (Г2)" },
      { value: E2, x: centerX - mainRadius / Math.sqrt(2), y: centerY - mainRadius / Math.sqrt(2), meaning: "А + Б (Е2)", locked: !isPremium },
      { value: Zh2, x: centerX + mainRadius / Math.sqrt(2), y: centerY - mainRadius / Math.sqrt(2), meaning: "Б + В (Ж2)", locked: !isPremium },
      { value: I2, x: centerX + mainRadius / Math.sqrt(2), y: centerY + mainRadius / Math.sqrt(2), meaning: "В + Г (И2)", locked: !isPremium },
      { value: Z2, x: centerX - mainRadius / Math.sqrt(2), y: centerY + mainRadius / Math.sqrt(2), meaning: "А + Г (З2)", locked: !isPremium },
      { value: A, x: centerX - outerRadius, y: centerY, meaning: "А", locked: !isPremium },
      { value: B, x: centerX, y: centerY - outerRadius, meaning: "Б", locked: !isPremium },
      { value: V, x: centerX + outerRadius, y: centerY, meaning: "В", locked: !isPremium },
      { value: G, x: centerX, y: centerY + outerRadius, meaning: "Г", locked: !isPremium },
      { value: E, x: centerX - outerRadius / Math.sqrt(2), y: centerY - outerRadius / Math.sqrt(2), meaning: "Е", locked: !isPremium },
      { value: Zh, x: centerX + outerRadius / Math.sqrt(2), y: centerY - outerRadius / Math.sqrt(2), meaning: "Ж", locked: !isPremium },
      { value: I, x: centerX + outerRadius / Math.sqrt(2), y: centerY + outerRadius / Math.sqrt(2), meaning: "И", locked: !isPremium },
      { value: Z, x: centerX - outerRadius / Math.sqrt(2), y: centerY + outerRadius / Math.sqrt(2), meaning: "З", locked: !isPremium },
      { value: A1, x: centerX - innerRadius, y: centerY, meaning: "А1", locked: !isPremium },
      { value: B1, x: centerX, y: centerY - innerRadius, meaning: "Б1", locked: !isPremium },
      { value: V1, x: centerX + innerRadius, y: centerY, meaning: "В1", locked: !isPremium },
      { value: G1, x: centerX, y: centerY + innerRadius, meaning: "Г1", locked: !isPremium },
      { value: E1, x: centerX - innerRadius / Math.sqrt(2), y: centerY - innerRadius / Math.sqrt(2), meaning: "Е1", locked: !isPremium },
      { value: Zh1, x: centerX + innerRadius / Math.sqrt(2), y: centerY - innerRadius / Math.sqrt(2), meaning: "Ж1", locked: !isPremium },
      { value: I1, x: centerX + innerRadius / Math.sqrt(2), y: centerY + innerRadius / Math.sqrt(2), meaning: "И1", locked: !isPremium },
      { value: Z1, x: centerX - innerRadius / Math.sqrt(2), y: centerY + innerRadius / Math.sqrt(2), meaning: "З1", locked: !isPremium },
    ];
    return points;
  };

  const matrix = useMemo(() => {
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
                    <Text style={styles.horoscopeText}>{zodiacData?.horoscope[selectedPeriod] || ""}</Text>
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
          {activeTab === "matrix" && matrix && (
            <View key="matrix-content">
              <View style={[styles.matrixContainer, { marginTop: 0, marginBottom: 40, minHeight: Math.min(width * 1.2, height * 0.7, 600) }]}>
                <Svg
                  width={width * 0.95}
                  height={Math.min(width * 1.3, height * 0.9, 700)}
                  viewBox={`0 0 ${width * 0.95} ${Math.min(width * 1.3, height * 0.9, 700)}`}
                >
                  {matrix.slice(1, 9).map((point, i) => {
                    const next = matrix[1 + ((i + 1) % 8)];
                    return (
                      <Line
                        key={`side-${i}`}
                        x1={point.x}
                        y1={point.y}
                        x2={next.x}
                        y2={next.y}
                        stroke="#666"
                        strokeWidth="2"
                      />
                    );
                  })}
                  {matrix.slice(1, 9).map((point, i) => {
                    const opposite = matrix[1 + ((i + 4) % 8)];
                    return (
                      <Line
                        key={`diag-${i}`}
                        x1={point.x}
                        y1={point.y}
                        x2={opposite.x}
                        y2={opposite.y}
                        stroke="#999"
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                      />
                    );
                  })}
                  {matrix.slice(1, 9).map((point, i) => (
                    <Line
                      key={`center-${i}`}
                      x1={matrix[0].x}
                      y1={matrix[0].y}
                      x2={point.x}
                      y2={point.y}
                      stroke="#9c27b0"
                      strokeWidth="2"
                      opacity="0.6"
                    />
                  ))}
                  {[...Array(8)].map((_, i) => (
                    <React.Fragment key={`outer-inner-${i}`}>
                      <Line
                        x1={matrix[9 + i].x}
                        y1={matrix[9 + i].y}
                        x2={matrix[9 + ((i + 1) % 8)].x}
                        y2={matrix[9 + ((i + 1) % 8)].y}
                        stroke="#555"
                        strokeWidth="1.5"
                      />
                      <Line
                        x1={matrix[17 + i].x}
                        y1={matrix[17 + i].y}
                        x2={matrix[17 + ((i + 1) % 8)].x}
                        y2={matrix[17 + ((i + 1) % 8)].y}
                        stroke="#444"
                        strokeWidth="1.5"
                      />
                      <Line
                        x1={matrix[0].x}
                        y1={matrix[0].y}
                        x2={matrix[9 + i].x}
                        y2={matrix[9 + i].y}
                        stroke="#777"
                        strokeWidth="1"
                        opacity="0.5"
                      />
                      <Line
                        x1={matrix[0].x}
                        y1={matrix[0].y}
                        x2={matrix[17 + i].x}
                        y2={matrix[17 + i].y}
                        stroke="#777"
                        strokeWidth="1"
                        opacity="0.5"
                      />
                    </React.Fragment>
                  ))}
                  {matrix.map((point, index) => (
                    <React.Fragment key={`point-${index}`}>
                      <Circle
                        cx={point.x}
                        cy={point.y}
                        r={index === 0 ? 26 : 18}
                        fill={index === 0 ? "#1a1a2e" : "#2a2a3e"}
                        stroke={index === 0 ? "#ffd700" : "#9c27b0"}
                        strokeWidth={2}
                      />
                      <SvgText
                        x={point.x}
                        y={point.y + 4}
                        fontSize={index === 0 ? "14" : "12"}
                        fontWeight="bold"
                        fill="#ffd700"
                        textAnchor="middle"
                      >
                        {point.value}
                      </SvgText>
                      <SvgText
                        x={point.x}
                        y={point.y + 30}
                        fontSize="9"
                        fill="#ccc"
                        textAnchor="middle"
                      >
                        {point.meaning}
                      </SvgText>
                    </React.Fragment>
                  ))}
                </Svg>
              </View>
              <View style={[styles.interpretationContainer, { paddingTop: 10 }]}>
                <Text style={styles.interpretationTitle}>Расшифровка точек</Text>
                {matrix.map((point, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.pointCard, point.locked && styles.pointCardLocked]}
                    onPress={() => {
                      if (point.locked) {
                        router.push("/subscription");
                      }
                    }}
                  >
                    <View style={styles.pointHeader}>
                      <View style={styles.pointInfo}>
                        <Text style={styles.pointValue}>{point.locked ? "?" : point.value}</Text>
                        <View>
                          <Text style={styles.pointMeaning}>{point.meaning}</Text>
                          {!point.locked && (
                            <Text style={styles.arcanaName}>{getArcanaName(point.value)}</Text>
                          )}
                        </View>
                      </View>
                      {point.locked && <Sparkles size={20} color="#666" />}
                    </View>
                    {!point.locked && (
                      <Text style={styles.pointDescription}>{getPointDescription(index)}</Text>
                    )}
                    {point.locked && (
                      <Text style={styles.lockedText}>Разблокируйте полную расшифровку с премиум подпиской</Text>
                    )}
                  </TouchableOpacity>
                ))}
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
});