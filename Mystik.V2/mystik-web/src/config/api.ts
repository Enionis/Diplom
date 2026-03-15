// API Configuration for Web App
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 
  ((import.meta as any).env?.DEV ? 'http://localhost:3001' : '');

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

export { API_BASE_URL };