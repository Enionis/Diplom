// API Configuration
import Constants from 'expo-constants';

// Определяем базовый URL в зависимости от окружения
function getApiBaseUrl(): string {
  // Продакшен URL - ваш деплой
  const PRODUCTION_API_URL = 'https://linadugau-mystik-39d3.twc1.net';
  
  // В продакшене используем деплой URL
  if (!__DEV__) {
    return PRODUCTION_API_URL;
  }
  
  // В режиме разработки с tunnel используем локальный IP
  if (__DEV__ && Constants.expoConfig?.hostUri) {
    const hostUri = Constants.expoConfig.hostUri;
    const ip = hostUri.split(':')[0];
    return `http://${ip}:8080`;
  }
  
  // Fallback на localhost для локальной разработки
  return 'http://localhost:8080';
}

export const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/api/login',
  REGISTER: '/api/register',
  
  // User
  USER: '/api/user',
  
  // Horoscope
  HOROSCOPE: '/api/horoscope',
  
  // Quizzes
  QUIZZES: '/api/quizzes',
  QUIZ: '/api/quiz',
  QUIZ_RESULT: '/api/user/:userId/quiz/:quizId/result',
  
  // Tarot
  TAROT_SPREADS: '/api/tarot/spreads',
  TAROT_CARDS: '/api/tarot/cards',
  TAROT_READING: '/api/tarot/reading',
  
  // Health check
  HEALTH: '/api/health',
} as const;

export function buildUrl(endpoint: string, params?: Record<string, string | number>): string {
  let url = `${API_BASE_URL}${endpoint}`;
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, String(value));
    });
  }
  
  return url;
}

// Логирование для отладки
console.log('API_BASE_URL:', API_BASE_URL);
console.log('Environment:', __DEV__ ? 'development' : 'production');