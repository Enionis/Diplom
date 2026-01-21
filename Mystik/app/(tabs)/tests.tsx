import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BookOpen, Lock } from "lucide-react-native";
import { useSubscription } from "@/providers/SubscriptionProvider";
import { router } from "expo-router";
import { QUIZZES } from "@/constants/quiz";
import { useDatabase } from "@/hooks/useDatabase"; // Новый импорт

export default function TestsScreen() {
  const { isPremium } = useSubscription();
  const { logTestClick } = useDatabase(); // Добавляем хук

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Тесты</Text>
        </View>

        <Text style={styles.subtitle}>Выберите тест для прохождения</Text>

        <FlatList
          data={Object.values(QUIZZES)}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.testRow}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.testCard,
                item.isPremium && !isPremium && styles.testCardLocked,
              ]}
              onPress={() => {
                logTestClick(item.id); // Логируем клик по тесту
                router.push(`/quiz/${item.id}`);
              }}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={
                  item.isPremium && !isPremium
                    ? ["#333", "#555"]
                    : ["#4a148c", "#7b1fa2"]
                }
                style={styles.testCardGradient}
              >
                {item.isPremium && !isPremium && (
                  <Lock size={20} color="#ffd700" style={styles.lockIcon} />
                )}
                <BookOpen size={24} color="#fff" style={styles.testIcon} />
                <Text style={styles.testTitle}>{item.title}</Text>
                <Text style={styles.testDescription}>{item.description}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          scrollEnabled={false}
          contentContainerStyle={styles.testsGrid}
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
    padding: 20,
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
  testsGrid: {
    paddingHorizontal: 20,
  },
  testRow: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  testCard: {
    width: "48%",
    height: 160,
    borderRadius: 16,
    overflow: "hidden",
  },
  testCardLocked: {
    opacity: 0.7,
  },
  testCardGradient: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  lockIcon: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  testIcon: {
    marginBottom: 8,
  },
  testTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  testDescription: {
    fontSize: 11,
    color: "#b8b8d0",
    textAlign: "center",
    lineHeight: 16,
  },
});