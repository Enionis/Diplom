import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, router } from "expo-router";
import { ChevronRight, Crown, ArrowLeft } from "lucide-react-native";
import { useSubscription } from "@/providers/SubscriptionProvider";
import { QUIZZES } from "@/constants/quiz";
import { useQuizResults } from "@/hooks/useQuizResults";
import { useQuiz } from "@/hooks/useQuizzes";

export default function QuizScreen() {
  const { id } = useLocalSearchParams();
  const { isPremium } = useSubscription();
  const { quiz, loading: quizLoading, error: quizError } = useQuiz(id as string);
  const { result, loading: resultLoading, error: resultError, saveResult, clearResult } = useQuizResults(id as string);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  // Используем данные из API, но fallback на локальные константы для логики расчета
  const localQuiz = id && QUIZZES[id as keyof typeof QUIZZES] ? QUIZZES[id as keyof typeof QUIZZES] : null;

  if (quizLoading || resultLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffd700" />
      </View>
    );
  }

  if (quizError || !quiz) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {quizError || 'Тест не найден'}
        </Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Вернуться к тестам</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (quiz.isPremium && !isPremium) {
    return (
      <View style={styles.lockedContainer}>
        <Crown size={64} color="#ffd700" />
        <Text style={styles.lockedTitle}>Только для премиум</Text>
        <Text style={styles.lockedText}>
          Этот тест доступен только подписчикам. Оформите подписку и узнайте больше о себе!
        </Text>
        <TouchableOpacity
          style={styles.unlockButton}
          onPress={() => router.push("/subscription")}
        >
          <LinearGradient
            colors={["#ffd700", "#ffed4e"]}
            style={styles.unlockGradient}
          >
            <Text style={styles.unlockText}>Открыть доступ</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Назад</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Показ результата, если он сохранён
  if (result) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>{quiz.title}</Text>

          {resultError && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorBannerText}>Ошибка: {resultError}</Text>
            </View>
          )}

          {quiz.id === "strengths" && (
            <>
              <Text style={styles.sectionTitle}>1) Доминирующие таланты</Text>
              {result.topTalents?.map((talent: any, index: number) => (
                <View key={index} style={styles.talentContainer}>
                  <Text style={styles.talentTitle}>
                    {talent.theme} — {talent.score}/5
                  </Text>
                  <Text style={styles.talentText}>
                    <Text style={styles.bold}>Описание: </Text>
                    {talent.desc}
                  </Text>
                  <Text style={styles.talentText}>
                    <Text style={styles.bold}>Как использовать: </Text>
                    {talent.use}
                  </Text>
                  <Text style={styles.talentText}>
                    <Text style={styles.bold}>Советы:</Text>
                  </Text>
                  {talent.tips?.map((tip: string, idx: number) => (
                    <Text key={idx} style={styles.talentText}>- {tip}</Text>
                  ))}
                </View>
              ))}

              <Text style={styles.sectionTitle}>2) Профессиональные сферы</Text>
              {result.careers && Object.entries(result.careers).map(([category, roles]: [string, any], index: number) => (
                <View key={index} style={styles.talentContainer}>
                  <Text style={styles.talentTitle}>{category}</Text>
                  {Array.isArray(roles) ? roles.map((role: string, idx: number) => (
                    <Text key={idx} style={styles.talentText}>- {role}</Text>
                  )) : (
                    <Text style={styles.talentText}>- {String(roles)}</Text>
                  )}
                </View>
              ))}

              <Text style={styles.sectionTitle}>3) Рекомендации по развитию</Text>
              <Text style={styles.talentText}>
                <Text style={styles.bold}>Общие рекомендации:</Text>
              </Text>
              {[
                "Составьте личный план развития на 3–6 месяцев с конкретными метриками.",
                "Фокусируйтесь на усилении сильных сторон.",
                "Ищите роли и задачи, где вы проводите хотя бы 50% времени в зонах своего таланта.",
                "Запрашивайте регулярную обратную связь и измеряйте прогресс.",
              ].map((tip: string, idx: number) => (
                <Text key={idx} style={styles.talentText}>- {tip}</Text>
              ))}
            </>
          )}

          {quiz.id === "paei" && (
            <>
              <View style={styles.typeContainer}>
                <Text style={styles.sectionTitle}>Ваш тип личности:</Text>
                <View style={styles.typeBadge}>
                  <Text style={styles.typeBadgeText}>{result.code}</Text>
                </View>
              </View>
              <Text style={styles.talentText}>
                <Text style={styles.bold}>Описание: </Text>
                {result.interpretation?.map((i: any) => `${i.letter} - ${i.description}`).join('\n')}
              </Text>
              <Text style={styles.talentText}>
                <Text style={styles.bold}>Примечание: </Text>
                {result.note}
              </Text>
            </>
          )}

          {quiz.id === "attachment" && (
            <>
              <View style={styles.typeContainer}>
                <Text style={styles.sectionTitle}>Ваш тип привязанности:</Text>
                <View style={styles.typeBadge}>
                  <Text style={styles.typeBadgeText}>{result.type}</Text>
                </View>
              </View>
              <Text style={styles.talentText}>{result.description}</Text>
              <Text style={styles.talentText}>
                <Text style={styles.bold}>Советы:</Text>
              </Text>
              {result.tips?.map((tip: string, idx: number) => (
                <Text key={idx} style={styles.talentText}>- {tip}</Text>
              ))}
            </>
          )}

          {quiz.id === "archetype" && (
            <>
              <View style={styles.typeContainer}>
                <Text style={styles.sectionTitle}>Ваш архетип личности:</Text>
                <View style={styles.typeBadge}>
                  <Text style={styles.typeBadgeText}>{result.archetype}</Text>
                </View>
              </View>
              <Text style={styles.talentText}>{result.description}</Text>
              <Text style={styles.talentText}>
                <Text style={styles.bold}>Рекомендации:</Text>
              </Text>
              {result.recommendations?.map((rec: string, idx: number) => (
                <Text key={idx} style={styles.talentText}>- {rec}</Text>
              ))}
            </>
          )}

          <TouchableOpacity
            style={styles.restartButton}
            onPress={() => {
              clearResult();
              setCurrentQuestion(0);
              setAnswers([]);
            }}
            disabled={resultLoading}
          >
            <LinearGradient
              colors={["#ffd700", "#ffed4e"]}
              style={styles.restartGradient}
            >
              <Text style={styles.restartText}>
                {resultLoading ? 'Сохранение...' : 'Пройти еще раз'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>Вернуться к тестам</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // Логика квиза
  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex + 1];
    setAnswers(newAnswers);

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const result = quiz.calculateResult(newAnswers);
      saveResult(result);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%`,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentQuestion + 1} из {quiz.questions.length}
        </Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          {quiz.questions[currentQuestion].question}
        </Text>

        <View style={styles.optionsContainer}>
          {quiz.questions[currentQuestion].options.map((option: string, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(index)}
            >
              <LinearGradient
                colors={["rgba(156,39,176,0.1)", "rgba(103,58,183,0.1)"]}
                style={styles.optionGradient}
              >
                <Text style={styles.optionText}>{option}</Text>
                <ChevronRight size={20} color="#9c27b0" />
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f1e",
  },
  lockedContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#0f0f1e",
  },
  lockedTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffd700",
    marginTop: 16,
    marginBottom: 8,
  },
  lockedText: {
    fontSize: 16,
    color: "#b8b8d0",
    textAlign: "center",
    marginBottom: 32,
  },
  unlockButton: {
    width: "100%",
    marginBottom: 16,
  },
  unlockGradient: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  unlockText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a2e",
  },
  backButton: {
    padding: 12,
  },
  backText: {
    fontSize: 14,
    color: "#b8b8d0",
  },
  progressContainer: { padding: 20 },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#ffd700",
    borderRadius: 4,
  },
  progressText: {
    color: "#b8b8d0",
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
  },
  questionContainer: { padding: 20 },
  question: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
  optionsContainer: { gap: 12 },
  optionButton: { borderRadius: 16, overflow: "hidden" },
  optionGradient: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  optionText: { fontSize: 16, color: "#fff", flex: 1 },
  resultContainer: { padding: 40, alignItems: "center" },
  resultTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffd700",
    marginBottom: 20,
    textAlign: "center",
  },
  resultDescription: {
    fontSize: 16,
    color: "#b8b8d0",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#ffd700",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  talentContainer: {
    marginBottom: 20,
    alignSelf: "stretch",
  },
  talentTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 10,
  },
  talentText: {
    fontSize: 16,
    color: "#b8b8d0",
    lineHeight: 24,
    marginBottom: 5,
  },
  bold: {
    fontWeight: "600",
    color: "#fff",
  },
  restartButton: { width: "100%", marginBottom: 16, marginTop: 16 },
  restartGradient: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  restartText: { fontSize: 16, fontWeight: "600", color: "#1a1a2e" },
});