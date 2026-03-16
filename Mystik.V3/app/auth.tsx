import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Eye, EyeOff, Sparkles } from 'lucide-react-native';
import { useAuthContext } from '../providers/AuthProvider';
import { LinearGradient } from 'expo-linear-gradient';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuthContext();
  const router = useRouter();

  const handleSubmit = async () => {
    if (isLogin) {
      if (!email || !password) {
        Alert.alert('Ошибка', 'Заполните все поля');
        return;
      }
    } else {
      if (!email || !username || !password || !name) {
        Alert.alert('Ошибка', 'Заполните все обязательные поля');
        return;
      }
      const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
      if (!usernameRegex.test(username)) {
        Alert.alert('Ошибка', 'Логин должен быть 3-20 символов (буквы, цифры, _)');
        return;
      }
    }
    
    if (password.length < 6) {
      Alert.alert('Ошибка', 'Пароль должен содержать минимум 6 символов');
      return;
    }
    
    if (!isLogin) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert('Ошибка', 'Введите корректный email');
        return;
      }
      
      // Валидация даты рождения
      if (birthDate && birthDate.length === 10) {
        const [day, month, year] = birthDate.split('.').map(Number);
        const date = new Date(year, month - 1, day);
        const today = new Date();
        
        if (isNaN(date.getTime()) || date >= today || year < 1900) {
          Alert.alert('Ошибка', 'Введите корректную дату рождения');
          return;
        }
      }
    }

    setLoading(true);

    try {
      let success = false;
      
      if (isLogin) {
        success = await login(email, password);
      } else {
        // Конвертируем дату из ДД.ММ.ГГГГ в ГГГГ-ММ-ДД для API
        let apiDate = '';
        if (birthDate && birthDate.length === 10) {
          const [day, month, year] = birthDate.split('.');
          apiDate = `${year}-${month}-${day}`;
        }
        success = await register(email, password, name, username, apiDate || undefined);
      }

      if (success) {
        Alert.alert('Успешно', isLogin ? 'Вы вошли в аккаунт' : 'Аккаунт создан');
        // AuthGuard автоматически перенаправит на главную страницу
      } else {
        Alert.alert(
          'Ошибка',
          isLogin ? 'Неверный логин или пароль' : 'Не удалось создать аккаунт'
        );
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Произошла ошибка. Попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    // Создаем гостевого пользователя для демонстрации
    Alert.alert(
      'Гостевой режим',
      'В гостевом режиме некоторые функции могут быть ограничены. Рекомендуем создать аккаунт для полного доступа.',
      [
        {
          text: 'Создать аккаунт',
          style: 'default'
        },
        {
          text: 'Продолжить как гость',
          style: 'cancel',
          onPress: () => router.replace('/(tabs)')
        }
      ]
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Header */}
          <LinearGradient
            colors={['#2196f3', '#3f51b5']}
            style={styles.header}
          >
            <Sparkles size={40} color="#ffd700" style={{ marginBottom: 20 }} />
            <Text style={styles.title}>
              Mystik
            </Text>
            <Text style={styles.subtitle}>
              {isLogin ? 'Добро пожаловать обратно!' : 'Откройте тайны судьбы'}
            </Text>
            {!isLogin && (
              <Text style={styles.description}>
                Персональные гороскопы, таро и матрица судьбы
              </Text>
            )}
          </LinearGradient>

          <View style={styles.form}>
            {!isLogin && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Имя *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Введите ваше имя"
                    placeholderTextColor="#666"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Дата рождения</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="ДД.ММ.ГГГГ"
                    placeholderTextColor="#666"
                    value={birthDate}
                    onChangeText={(text) => {
                      // Форматирование даты
                      const digits = text.replace(/\D/g, '');
                      let formatted = '';
                      for (let i = 0; i < digits.length && i < 8; i++) {
                        if (i === 2 || i === 4) formatted += '.';
                        formatted += digits[i];
                      }
                      setBirthDate(formatted);
                    }}
                    keyboardType="numeric"
                    maxLength={10}
                  />
                </View>
              </>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                {isLogin ? 'Email или логин *' : 'Email *'}
              </Text>
              <TextInput
                style={styles.input}
                placeholder={isLogin ? 'Email или логин' : 'example@mail.com'}
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
                keyboardType={isLogin ? 'default' : 'email-address'}
                autoCapitalize="none"
              />
            </View>

            {!isLogin && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Логин *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="3-20 символов (буквы, цифры, _)"
                  placeholderTextColor="#666"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Пароль *</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="Минимум 6 символов"
                  placeholderTextColor="#666"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#666" />
                  ) : (
                    <Eye size={20} color="#666" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.switchButton}
              onPress={() => setIsLogin(!isLogin)}
            >
              <Text style={styles.switchText}>
                {isLogin ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
                <Text style={styles.switchTextAccent}>
                  {isLogin ? 'Зарегистрироваться' : 'Войти'}
                </Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.skipButton}
              onPress={handleSkip}
            >
              <Text style={styles.skipText}>
                Продолжить без регистрации
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    padding: 40,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  input: {
    backgroundColor: '#2a2a3e',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#444',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 4,
  },
  button: {
    backgroundColor: '#ffd700',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  switchButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  switchText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
  },
  switchTextAccent: {
    color: '#ffd700',
    fontWeight: '600',
  },
  skipButton: {
    alignItems: 'center',
    marginTop: 24,
  },
  skipText: {
    fontSize: 14,
    color: '#888',
  },
});