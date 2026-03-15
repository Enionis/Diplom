import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import * as cheerio from 'cheerio';
import { initDatabase, getDatabase } from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Инициализация базы данных
initDatabase();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS настройки для продакшена и разработки
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173', 
  'http://localhost:5175',
  'http://127.0.0.1:5175',
  'http://localhost:8081',
  'http://127.0.0.1:8081',
  'https://linadugau-mystik-39d3.twc1.net',
  // Добавляем поддержку Expo tunnel URLs
  /^https:\/\/.*\.exp\.direct$/,
  /^https:\/\/.*\.ngrok\.io$/,
  /^https:\/\/.*\.railway\.app$/,
  // Локальные IP адреса для мобильной разработки
  /^http:\/\/192\.168\.\d+\.\d+:(3001|8081)$/,
  /^http:\/\/10\.\d+\.\d+\.\d+:(3001|8081)$/,
];

// Если есть переменная окружения с дополнительными origins
if (process.env.CORS_ORIGINS) {
  allowedOrigins.push(...process.env.CORS_ORIGINS.split(','));
}

app.use(cors({
  origin: (origin, callback) => {
    console.log('CORS check for origin:', origin);
    
    // Разрешаем запросы без origin (мобильные приложения)
    if (!origin) {
      console.log('No origin - allowing');
      return callback(null, true);
    }
    
    // Проверяем разрешенные origins
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') {
        const match = origin === allowedOrigin;
        if (match) console.log('String match:', allowedOrigin);
        return match;
      }
      if (allowedOrigin instanceof RegExp) {
        const match = allowedOrigin.test(origin);
        if (match) console.log('Regex match:', allowedOrigin);
        return match;
      }
      return false;
    });
    
    if (isAllowed) {
      console.log('Origin allowed:', origin);
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      console.log('Allowed origins:', allowedOrigins);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Логирование запросов для отладки
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Query:', JSON.stringify(req.query, null, 2));
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    ok: true, 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    port: PORT
  });
});

const SALT_ROUNDS = 10;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;
const MIN_PASSWORD_LENGTH = 6;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 255;

function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  return trimmed.length <= MAX_EMAIL_LENGTH && EMAIL_REGEX.test(trimmed);
}

function validateUsername(username) {
  if (!username || typeof username !== 'string') return false;
  return USERNAME_REGEX.test(username.trim());
}

function validateName(name) {
  if (!name || typeof name !== 'string') return false;
  return name.trim().length > 0 && name.trim().length <= MAX_NAME_LENGTH;
}

function validatePassword(password) {
  return typeof password === 'string' && password.length >= MIN_PASSWORD_LENGTH;
}

function validateBirthDate(birthDate) {
  if (!birthDate) return true; // optional
  const date = new Date(birthDate);
  return !isNaN(date.getTime()) && date < new Date();
}

/** POST /api/register — регистрация. Защита: bcrypt, валидация, prepared statements */
app.post('/api/register', (req, res) => {
  try {
    const { email, username, password, name, birthDate } = req.body || {};
    
    if (!validateEmail(email)) {
      return res.status(400).json({ ok: false, error: 'Некорректный email' });
    }
    if (!validateUsername(username)) {
      return res.status(400).json({ ok: false, error: 'Логин должен быть 3-20 символов (буквы, цифры, _)' });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ ok: false, error: 'Пароль не менее 6 символов' });
    }
    if (!validateName(name)) {
      return res.status(400).json({ ok: false, error: 'Укажите имя (до 100 символов)' });
    }
    if (!validateBirthDate(birthDate)) {
      return res.status(400).json({ ok: false, error: 'Некорректная дата рождения' });
    }

    const db = getDatabase();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedUsername = username.trim();
    const trimmedName = name.trim();

    const existingEmail = db.prepare('SELECT id FROM users WHERE email = ? AND is_guest = 0').get(trimmedEmail);
    if (existingEmail) {
      return res.status(409).json({ ok: false, error: 'Такой email уже зарегистрирован' });
    }

    const existingUsername = db.prepare('SELECT id FROM users WHERE username = ? AND is_guest = 0').get(trimmedUsername);
    if (existingUsername) {
      return res.status(409).json({ ok: false, error: 'Такой логин уже занят' });
    }

    const passwordHash = bcrypt.hashSync(password, SALT_ROUNDS);
    const id = `user_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    const now = new Date().toISOString();

    db.prepare(
      `INSERT INTO users (id, email, username, name, birth_date, password_hash, is_guest, created_at, last_login)
       VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?)`
    ).run(id, trimmedEmail, trimmedUsername, trimmedName, birthDate || null, passwordHash, now, now);

    res.json({ 
      ok: true, 
      user: { 
        id, 
        email: trimmedEmail, 
        username: trimmedUsername,
        name: trimmedName,
        birthDate: birthDate || null
      } 
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ ok: false, error: 'Ошибка сервера' });
  }
});

/** POST /api/login — вход. Защита: bcrypt.compare, prepared statements */
app.post('/api/login', (req, res) => {
  try {
    const { login, password } = req.body || {};
    
    if (!login || typeof login !== 'string') {
      return res.status(400).json({ ok: false, error: 'Укажите email или логин' });
    }
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ ok: false, error: 'Укажите пароль' });
    }

    const db = getDatabase();
    const trimmedLogin = login.trim().toLowerCase();
    
    // Поиск по email или username
    const row = db.prepare(
      'SELECT id, email, username, name, birth_date, password_hash FROM users WHERE (email = ? OR username = ?) AND is_guest = 0'
    ).get(trimmedLogin, trimmedLogin);

    if (!row) {
      return res.status(401).json({ ok: false, error: 'Неверный логин или пароль' });
    }

    const match = bcrypt.compareSync(password, row.password_hash);
    if (!match) {
      return res.status(401).json({ ok: false, error: 'Неверный логин или пароль' });
    }

    const now = new Date().toISOString();
    db.prepare('UPDATE users SET last_login = ? WHERE id = ?').run(now, row.id);

    res.json({ 
      ok: true, 
      user: { 
        id: row.id, 
        email: row.email, 
        username: row.username,
        name: row.name,
        birthDate: row.birth_date
      } 
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ ok: false, error: 'Ошибка сервера' });
  }
});

/** GET /api/user/:id — проверка пользователя по id (для сессии) */
app.get('/api/user/:id', (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ ok: false, error: 'Нет id' });

    const db = getDatabase();
    const row = db.prepare('SELECT id, email, username, name, birth_date FROM users WHERE id = ? AND is_guest = 0').get(id);
    if (!row) {
      return res.status(404).json({ ok: false, error: 'Пользователь не найден' });
    }
    res.json({ 
      ok: true, 
      user: { 
        id: row.id, 
        email: row.email, 
        username: row.username,
        name: row.name,
        birthDate: row.birth_date
      } 
    });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ ok: false, error: 'Ошибка сервера' });
  }
});

/** PUT /api/user/:id — обновление профиля */
app.put('/api/user/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, birthDate } = req.body || {};

    if (!id) return res.status(400).json({ ok: false, error: 'Нет id' });

    const db = getDatabase();
    const user = db.prepare('SELECT id FROM users WHERE id = ? AND is_guest = 0').get(id);
    if (!user) {
      return res.status(404).json({ ok: false, error: 'Пользователь не найден' });
    }

    if (name !== undefined) {
      if (!validateName(name)) {
        return res.status(400).json({ ok: false, error: 'Некорректное имя' });
      }
      db.prepare('UPDATE users SET name = ? WHERE id = ?').run(name.trim(), id);
    }

    if (birthDate !== undefined) {
      if (!validateBirthDate(birthDate)) {
        return res.status(400).json({ ok: false, error: 'Некорректная дата рождения' });
      }
      db.prepare('UPDATE users SET birth_date = ? WHERE id = ?').run(birthDate || null, id);
    }

    const updated = db.prepare('SELECT id, email, username, name, birth_date FROM users WHERE id = ?').get(id);
    res.json({ 
      ok: true, 
      user: { 
        id: updated.id, 
        email: updated.email, 
        username: updated.username,
        name: updated.name,
        birthDate: updated.birth_date
      } 
    });
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ ok: false, error: 'Ошибка сервера' });
  }
});

/** GET /api/quizzes — получение списка тестов */
app.get('/api/quizzes', (req, res) => {
  try {
    const db = getDatabase();
    console.log('Getting quizzes from database...');
    
    const quizzes = db.prepare('SELECT id, title, description, is_premium FROM quizzes').all();
    console.log('Found quizzes:', quizzes.length);
    
    const formattedQuizzes = quizzes.reduce((acc, quiz) => {
      acc[quiz.id] = {
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        isPremium: quiz.is_premium === 1
      };
      return acc;
    }, {});
    
    res.json({ ok: true, quizzes: formattedQuizzes });
  } catch (err) {
    console.error('Get quizzes error:', err);
    res.status(500).json({ ok: false, error: 'Ошибка сервера' });
  }
});

/** GET /api/quiz/:id — получение конкретного теста */
app.get('/api/quiz/:id', (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ ok: false, error: 'Нет id теста' });

    const db = getDatabase();
    const quiz = db.prepare('SELECT * FROM quizzes WHERE id = ?').get(id);
    
    if (!quiz) {
      return res.status(404).json({ ok: false, error: 'Тест не найден' });
    }

    res.json({ 
      ok: true, 
      quiz: {
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        isPremium: quiz.is_premium === 1,
        questions: JSON.parse(quiz.questions)
      }
    });
  } catch (err) {
    console.error('Get quiz error:', err);
    res.status(500).json({ ok: false, error: 'Ошибка сервера' });
  }
});

/** GET /api/user/:userId/quiz/:quizId/result — получение результата теста пользователя */
app.get('/api/user/:userId/quiz/:quizId/result', (req, res) => {
  try {
    const { userId, quizId } = req.params;
    if (!userId || !quizId) {
      return res.status(400).json({ ok: false, error: 'Нет userId или quizId' });
    }

    const db = getDatabase();
    const result = db.prepare('SELECT * FROM quiz_results WHERE user_id = ? AND quiz_id = ?').get(userId, quizId);
    
    if (!result) {
      return res.status(404).json({ ok: false, error: 'Результат не найден' });
    }

    res.json({ 
      ok: true, 
      result: {
        id: result.id,
        userId: result.user_id,
        quizId: result.quiz_id,
        answers: JSON.parse(result.answers),
        result: JSON.parse(result.result),
        createdAt: result.created_at,
        updatedAt: result.updated_at
      }
    });
  } catch (err) {
    console.error('Get quiz result error:', err);
    res.status(500).json({ ok: false, error: 'Ошибка сервера' });
  }
});

/** POST /api/user/:userId/quiz/:quizId/result — сохранение результата теста */
app.post('/api/user/:userId/quiz/:quizId/result', (req, res) => {
  try {
    const { userId, quizId } = req.params;
    const { answers, result } = req.body || {};

    if (!userId || !quizId) {
      return res.status(400).json({ ok: false, error: 'Нет userId или quizId' });
    }

    if (!answers || !result) {
      return res.status(400).json({ ok: false, error: 'Нет данных ответов или результата' });
    }

    const db = getDatabase();
    
    // Проверяем существование пользователя
    const user = db.prepare('SELECT id FROM users WHERE id = ?').get(userId);
    if (!user) {
      return res.status(404).json({ ok: false, error: 'Пользователь не найден' });
    }

    // Проверяем существование теста
    const quiz = db.prepare('SELECT id FROM quizzes WHERE id = ?').get(quizId);
    if (!quiz) {
      return res.status(404).json({ ok: false, error: 'Тест не найден' });
    }

    const now = new Date().toISOString();
    const resultId = `result_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;

    // Используем INSERT OR REPLACE для обновления существующего результата
    db.prepare(`
      INSERT OR REPLACE INTO quiz_results (id, user_id, quiz_id, answers, result, created_at, updated_at)
      VALUES (
        COALESCE((SELECT id FROM quiz_results WHERE user_id = ? AND quiz_id = ?), ?),
        ?, ?, ?, ?, 
        COALESCE((SELECT created_at FROM quiz_results WHERE user_id = ? AND quiz_id = ?), ?),
        ?
      )
    `).run(userId, quizId, resultId, userId, quizId, JSON.stringify(answers), JSON.stringify(result), userId, quizId, now, now);

    res.json({ 
      ok: true, 
      message: 'Результат сохранен',
      result: {
        userId,
        quizId,
        answers,
        result,
        updatedAt: now
      }
    });
  } catch (err) {
    console.error('Save quiz result error:', err);
    res.status(500).json({ ok: false, error: 'Ошибка сервера' });
  }
});

/** POST /api/user/:id/change-password — смена пароля */
app.post('/api/user/:id/change-password', (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword, confirmPassword } = req.body || {};

    if (!id) return res.status(400).json({ ok: false, error: 'Нет id' });

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ ok: false, error: 'Заполните все поля' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ ok: false, error: 'Новые пароли не совпадают' });
    }

    if (!validatePassword(newPassword)) {
      return res.status(400).json({ ok: false, error: 'Новый пароль должен быть не менее 6 символов' });
    }

    const db = getDatabase();
    const user = db.prepare('SELECT id, password_hash FROM users WHERE id = ? AND is_guest = 0').get(id);
    if (!user) {
      return res.status(404).json({ ok: false, error: 'Пользователь не найден' });
    }

    const match = bcrypt.compareSync(oldPassword, user.password_hash);
    if (!match) {
      return res.status(401).json({ ok: false, error: 'Неверный старый пароль' });
    }

    const newPasswordHash = bcrypt.hashSync(newPassword, SALT_ROUNDS);
    db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(newPasswordHash, id);

    res.json({ ok: true, message: 'Пароль успешно изменён' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ ok: false, error: 'Ошибка сервера' });
  }
});

/** GET /api/tarot/spreads — получение всех раскладов таро */
app.get('/api/tarot/spreads', (req, res) => {
  try {
    const db = getDatabase();
    console.log('Getting tarot spreads from database...');
    
    const spreads = db.prepare('SELECT * FROM tarot_spreads ORDER BY card_count ASC').all();
    console.log('Found tarot spreads:', spreads.length);
    
    const formattedSpreads = spreads.map(spread => ({
      id: spread.id,
      name: spread.name,
      description: spread.description,
      cardCount: spread.card_count,
      positions: JSON.parse(spread.positions),
      isPremium: spread.is_premium === 1
    }));
    
    res.json({ ok: true, spreads: formattedSpreads });
  } catch (err) {
    console.error('Get tarot spreads error:', err);
    res.status(500).json({ ok: false, error: 'Ошибка сервера' });
  }
});

/** GET /api/tarot/cards — получение всех карт таро */
app.get('/api/tarot/cards', (req, res) => {
  try {
    const db = getDatabase();
    const cards = db.prepare('SELECT * FROM tarot_cards ORDER BY id ASC').all();
    
    res.json({ ok: true, cards });
  } catch (err) {
    console.error('Get tarot cards error:', err);
    res.status(500).json({ ok: false, error: 'Ошибка сервера' });
  }
});

/** POST /api/tarot/reading — создание нового гадания */
app.post('/api/tarot/reading', (req, res) => {
  try {
    const { userId, spreadId, cardIds } = req.body || {};
    
    if (!userId || !spreadId || !cardIds || !Array.isArray(cardIds)) {
      return res.status(400).json({ ok: false, error: 'Неверные параметры' });
    }
    
    const db = getDatabase();
    
    // Проверяем существование пользователя
    const user = db.prepare('SELECT id FROM users WHERE id = ?').get(userId);
    if (!user) {
      return res.status(404).json({ ok: false, error: 'Пользователь не найден' });
    }
    
    // Проверяем существование расклада
    const spread = db.prepare('SELECT * FROM tarot_spreads WHERE id = ?').get(spreadId);
    if (!spread) {
      return res.status(404).json({ ok: false, error: 'Расклад не найден' });
    }
    
    // Получаем карты
    const cards = [];
    const interpretations = [];
    
    for (let i = 0; i < cardIds.length; i++) {
      const cardId = cardIds[i];
      const card = db.prepare('SELECT * FROM tarot_cards WHERE id = ?').get(cardId);
      if (!card) {
        return res.status(404).json({ ok: false, error: `Карта ${cardId} не найдена` });
      }
      
      // Получаем толкование для этой карты в этом раскладе на этой позиции
      const interpretation = db.prepare(`
        SELECT interpretation FROM tarot_interpretations 
        WHERE card_id = ? AND spread_id = ? AND position_index = ?
      `).get(cardId, spreadId, i);
      
      cards.push({
        ...card,
        position: JSON.parse(spread.positions)[i] || `Позиция ${i + 1}`
      });
      
      interpretations.push({
        position: JSON.parse(spread.positions)[i] || `Позиция ${i + 1}`,
        card: card,
        interpretation: interpretation ? interpretation.interpretation : 'Толкование не найдено'
      });
    }
    
    // Сохраняем гадание
    const readingId = `reading_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    const now = new Date().toISOString();
    
    db.prepare(`
      INSERT INTO tarot_readings (id, user_id, spread_id, cards, created_at)
      VALUES (?, ?, ?, ?, ?)
    `).run(readingId, userId, spreadId, JSON.stringify(cardIds), now);
    
    res.json({
      ok: true,
      reading: {
        id: readingId,
        spread: {
          id: spread.id,
          name: spread.name,
          description: spread.description,
          cardCount: spread.card_count,
          positions: JSON.parse(spread.positions)
        },
        cards,
        interpretations,
        createdAt: now
      }
    });
    
  } catch (err) {
    console.error('Create tarot reading error:', err);
    res.status(500).json({ ok: false, error: 'Ошибка сервера' });
  }
});

/** GET /api/user/:userId/tarot/readings — получение гаданий пользователя */
app.get('/api/user/:userId/tarot/readings', (req, res) => {
  try {
    const { userId } = req.params;
    const { date } = req.query;
    
    if (!userId) {
      return res.status(400).json({ ok: false, error: 'Нет userId' });
    }
    
    const db = getDatabase();
    
    let query = `
      SELECT tr.*, ts.name as spread_name, ts.description as spread_description 
      FROM tarot_readings tr
      JOIN tarot_spreads ts ON tr.spread_id = ts.id
      WHERE tr.user_id = ?
    `;
    const params = [userId];
    
    if (date) {
      query += ` AND DATE(tr.created_at) = ?`;
      params.push(date);
    }
    
    query += ` ORDER BY tr.created_at DESC`;
    
    const readings = db.prepare(query).all(...params);
    
    res.json({ 
      ok: true, 
      readings: readings.map(reading => ({
        id: reading.id,
        spreadId: reading.spread_id,
        spreadName: reading.spread_name,
        spreadDescription: reading.spread_description,
        cards: JSON.parse(reading.cards),
        createdAt: reading.created_at
      }))
    });
    
  } catch (err) {
    console.error('Get user tarot readings error:', err);
    res.status(500).json({ ok: false, error: 'Ошибка сервера' });
  }
});

// API для получения гороскопа
app.get('/api/horoscope/:sign', async (req, res) => {
  try {
    const { sign } = req.params;
    const validSigns = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
    
    if (!validSigns.includes(sign)) {
      return res.status(400).json({ ok: false, error: 'Неверный знак зодиака' });
    }

    // Функция для получения гороскопа с сайта
    async function fetchHoroscope(url) {
      try {
        console.log('Fetching horoscope from:', url);
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });
        
        if (!response.ok) {
          console.log('Response not ok:', response.status);
          return null;
        }
        
        const html = await response.text();
        const $ = cheerio.load(html);
        
        // Ищем текст гороскопа по различным селекторам
        let horoscopeText = null;
        
        // Попробуем разные селекторы
        const selectors = [
          '.horoscope-text',
          '.horoscope__text',
          '.text',
          'p:contains("Гороскоп")',
          '.content p',
          'article p',
          '.description',
          '.forecast-text'
        ];
        
        for (const selector of selectors) {
          const element = $(selector).first();
          if (element.length > 0) {
            const text = element.text().trim();
            if (text.length > 50 && !text.includes('Реклама')) {
              horoscopeText = text;
              console.log('Found horoscope with selector:', selector);
              break;
            }
          }
        }
        
        // Если не нашли по селекторам, ищем по тексту
        if (!horoscopeText) {
          $('p').each((i, elem) => {
            const text = $(elem).text().trim();
            if (text.includes('Гороскоп на сегодня') || text.includes('говорит, что') || 
                (text.length > 100 && text.includes('Овн') && !text.includes('Реклама'))) {
              horoscopeText = text;
              console.log('Found horoscope by text search');
              return false; // break
            }
          });
        }
        
        return horoscopeText;
      } catch (error) {
        console.error('Error fetching horoscope:', error);
        return null;
      }
    }

    // Функция для проверки даты на сайте и определения какой гороскоп брать
    async function determineHoroscopeSource(sign) {
      try {
        const today = new Date();
        const todayDay = today.getDate();
        const todayMonth = today.getMonth() + 1; // getMonth() возвращает 0-11
        const todayYear = today.getFullYear();
        
        console.log(`Current date: ${todayDay}.${todayMonth}.${todayYear}`);
        
        // Сначала проверяем обычную страницу
        const todayUrl = `https://horoscopes.rambler.ru/${sign}/`;
        const response = await fetch(todayUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });
        
        if (!response.ok) {
          return { url: todayUrl, isTomorrow: false };
        }
        
        const html = await response.text();
        const $ = cheerio.load(html);
        
        // Ищем дату на странице
        const pageText = $('body').text();
        
        // Проверяем есть ли на странице сегодняшняя дата
        const todayPatterns = [
          `${todayDay} марта ${todayYear}`,
          `${todayDay}.${todayMonth}.${todayYear}`,
          `${todayDay}.0${todayMonth}.${todayYear}`,
          `0${todayDay}.${todayMonth}.${todayYear}`
        ];
        
        const hasTodayDate = todayPatterns.some(pattern => pageText.includes(pattern));
        
        if (hasTodayDate) {
          console.log('Found today\'s date on main page, using today\'s horoscope');
          return { url: todayUrl, isTomorrow: false };
        }
        
        // Если сегодняшней даты нет, проверяем есть ли вчерашняя дата
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const yesterdayDay = yesterday.getDate();
        const yesterdayMonth = yesterday.getMonth() + 1;
        const yesterdayYear = yesterday.getFullYear();
        
        const yesterdayPatterns = [
          `${yesterdayDay} марта ${yesterdayYear}`,
          `${yesterdayDay}.${yesterdayMonth}.${yesterdayYear}`
        ];
        
        const hasYesterdayDate = yesterdayPatterns.some(pattern => pageText.includes(pattern));
        
        if (hasYesterdayDate) {
          console.log('Found yesterday\'s date on main page, using tomorrow\'s horoscope');
          return { url: `https://horoscopes.rambler.ru/${sign}/tomorrow/`, isTomorrow: true };
        }
        
        // Если не можем определить по дате, проверяем завтрашнюю страницу
        const tomorrowUrl = `https://horoscopes.rambler.ru/${sign}/tomorrow/`;
        const tomorrowResponse = await fetch(tomorrowUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });
        
        if (tomorrowResponse.ok) {
          const tomorrowHtml = await tomorrowResponse.text();
          const $tomorrow = cheerio.load(tomorrowHtml);
          const tomorrowText = $tomorrow('body').text();
          
          // Проверяем есть ли на завтрашней странице сегодняшняя дата
          const hasTodayOnTomorrow = todayPatterns.some(pattern => tomorrowText.includes(pattern));
          
          if (hasTodayOnTomorrow) {
            console.log('Found today\'s date on tomorrow page, using tomorrow\'s horoscope');
            return { url: tomorrowUrl, isTomorrow: true };
          }
        }
        
        // По умолчанию используем сегодняшнюю страницу
        console.log('Could not determine date, using today\'s horoscope by default');
        return { url: todayUrl, isTomorrow: false };
        
      } catch (error) {
        console.error('Error determining horoscope source:', error);
        return { url: `https://horoscopes.rambler.ru/${sign}/`, isTomorrow: false };
      }
    }

    let horoscopeText = null;
    
    // Получаем текущую локальную дату (не UTC)
    const today = new Date();
    const localDate = new Date(today.getTime() - (today.getTimezoneOffset() * 60000));
    let actualDate = localDate;
    
    try {
      // Определяем какой URL использовать на основе даты
      const { url, isTomorrow } = await determineHoroscopeSource(sign);
      console.log(`Using URL: ${url} (isTomorrow: ${isTomorrow})`);
      
      // Если мы используем tomorrow страницу, значит гороскоп актуален на сегодня
      // Если мы используем обычную страницу, тоже актуален на сегодня
      // В любом случае гороскоп актуален на текущую дату
      actualDate = localDate;
      
      // Получаем гороскоп с определенного URL
      horoscopeText = await fetchHoroscope(url);
      
      // Если не получилось с основного URL, пробуем альтернативный
      if (!horoscopeText || horoscopeText.length < 50) {
        const alternativeUrl = isTomorrow 
          ? `https://horoscopes.rambler.ru/${sign}/`
          : `https://horoscopes.rambler.ru/${sign}/tomorrow/`;
        
        console.log(`Trying alternative URL: ${alternativeUrl}`);
        horoscopeText = await fetchHoroscope(alternativeUrl);
      }
      
      // Очищаем текст от лишних символов
      if (horoscopeText) {
        horoscopeText = horoscopeText
          .replace(/\s+/g, ' ')
          .replace(/^\s*Гороскоп на сегодня — \w+\s*/, '')
          .replace(/^\s*Сегодня\s+/, 'Сегодня ')
          .trim();
      }
      
    } catch (error) {
      console.error('Ошибка при получении гороскопа:', error);
    }

    // Если не удалось получить с сайта, возвращаем заглушку
    if (!horoscopeText || horoscopeText.length < 50) {
      console.log('Using fallback text for', sign);
      const fallbackTexts = {
        aries: 'Сегодня звезды советуют Овнам проявить активность и решительность. Хороший день для новых начинаний.',
        taurus: 'Тельцам рекомендуется сосредоточиться на практических делах. Стабильность принесет успех.',
        gemini: 'Близнецы могут рассчитывать на интересные знакомства и плодотворное общение.',
        cancer: 'Ракам стоит уделить внимание семье и домашним делам. Интуиция подскажет правильное решение.',
        leo: 'Львы будут в центре внимания. Используйте свою харизму для достижения целей.',
        virgo: 'Девам рекомендуется заняться планированием и организацией. Внимание к деталям принесет результат.',
        libra: 'Весы найдут гармонию в отношениях. День благоприятен для творчества и красоты.',
        scorpio: 'Скорпионам стоит довериться интуиции. Глубокий анализ поможет найти скрытые возможности.',
        sagittarius: 'Стрельцы могут планировать путешествия или изучение нового. Расширение горизонтов принесет радость.',
        capricorn: 'Козерогам рекомендуется сосредоточиться на карьере. Упорство и дисциплина приведут к успеху.',
        aquarius: 'Водолеи могут рассчитывать на поддержку друзей. Оригинальные идеи найдут воплощение.',
        pisces: 'Рыбам стоит прислушаться к своим чувствам. Творческий подход поможет решить проблемы.'
      };
      horoscopeText = fallbackTexts[sign] || 'Сегодня звезды благосклонны к вам. Следуйте своей интуиции.';
    }

    console.log('Final horoscope text:', horoscopeText.substring(0, 100) + '...');
    console.log('Actual date being sent:', actualDate.toISOString().split('T')[0]);

    res.json({
      ok: true,
      horoscope: {
        sign,
        text: horoscopeText,
        date: actualDate.toISOString().split('T')[0] // Используем актуальную дату гороскопа
      }
    });

  } catch (error) {
    console.error('Ошибка API гороскопа:', error);
    res.status(500).json({ ok: false, error: 'Внутренняя ошибка сервера' });
  }
});

// API для получения недельного гороскопа
app.get('/api/horoscope/:sign/weekly', async (req, res) => {
  try {
    const { sign } = req.params;
    const validSigns = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
    
    if (!validSigns.includes(sign)) {
      return res.status(400).json({ ok: false, error: 'Неверный знак зодиака' });
    }

    // Функция для получения гороскопа с сайта
    async function fetchHoroscope(url) {
      try {
        console.log('Fetching weekly horoscope from:', url);
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });
        
        if (!response.ok) {
          console.log('Response not ok:', response.status);
          return null;
        }
        
        const html = await response.text();
        const $ = cheerio.load(html);
        
        // Ищем текст гороскопа - для недельного гороскопа нужно собрать все абзацы
        let horoscopeText = null;
        
        // Сначала попробуем найти контейнер с гороскопом
        const containerSelectors = [
          '.horoscope-content',
          '.horoscope__content',
          '.content',
          'article',
          '.forecast-content',
          '.text-content'
        ];
        
        for (const containerSelector of containerSelectors) {
          const container = $(containerSelector).first();
          if (container.length > 0) {
            // Собираем все параграфы из контейнера
            const paragraphs = [];
            container.find('p').each((i, elem) => {
              const text = $(elem).text().trim();
              if (text.length > 20 && !text.includes('Реклама') && !text.includes('©')) {
                paragraphs.push(text);
              }
            });
            
            if (paragraphs.length > 0) {
              horoscopeText = paragraphs.join('\n\n');
              console.log('Found weekly horoscope in container:', containerSelector, 'paragraphs:', paragraphs.length);
              break;
            }
          }
        }
        
        // Если не нашли в контейнере, попробуем собрать все подходящие параграфы
        if (!horoscopeText) {
          const paragraphs = [];
          let foundStart = false;
          
          $('p').each((i, elem) => {
            const text = $(elem).text().trim();
            
            // Ищем начало гороскопа
            if (!foundStart && (text.includes('На этой неделе') || text.includes('Овны на этой неделе') || 
                text.includes('Гороскоп на неделю'))) {
              foundStart = true;
            }
            
            // Если нашли начало, собираем все подходящие параграфы
            if (foundStart && text.length > 20 && !text.includes('Реклама') && 
                !text.includes('©') && !text.includes('Подписывайтесь') && 
                !text.includes('Читайте также')) {
              paragraphs.push(text);
            }
            
            // Останавливаемся если встретили конец контента
            if (foundStart && (text.includes('Читайте также') || text.includes('Другие гороскопы') || 
                text.includes('Подписывайтесь'))) {
              return false; // break
            }
          });
          
          if (paragraphs.length > 0) {
            horoscopeText = paragraphs.join('\n\n');
            console.log('Found weekly horoscope by paragraph collection, paragraphs:', paragraphs.length);
            console.log('Sample paragraphs:', paragraphs.map((p, i) => `${i+1}: ${p.substring(0, 50)}...`));
            console.log('Final joined text preview:', horoscopeText.substring(0, 200) + '...');
            console.log('Contains newlines:', horoscopeText.includes('\n\n'));
          }
        }
        
        // Если все еще не нашли, попробуем простой поиск
        if (!horoscopeText) {
          $('p').each((i, elem) => {
            const text = $(elem).text().trim();
            if (text.includes('На этой неделе') || text.includes('Овны на этой неделе') || 
                (text.length > 100 && !text.includes('Реклама'))) {
              horoscopeText = text;
              console.log('Found weekly horoscope by simple text search');
              return false; // break
            }
          });
        }
        
        return horoscopeText;
      } catch (error) {
        console.error('Error fetching weekly horoscope:', error);
        return null;
      }
    }

    // Функция для определения правильного недельного гороскопа
    async function determineWeeklyHoroscopeSource(sign) {
      try {
        const today = new Date();
        const todayDay = today.getDate();
        
        console.log(`Current date for weekly: ${todayDay}.${today.getMonth() + 1}.${today.getFullYear()}`);
        
        // Сначала проверяем текущую неделю
        const weeklyUrl = `https://horoscopes.rambler.ru/${sign}/weekly/`;
        const response = await fetch(weeklyUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });
        
        if (!response.ok) {
          return { url: weeklyUrl, isNextWeek: false };
        }
        
        const html = await response.text();
        const $ = cheerio.load(html);
        const pageText = $('body').text();
        
        // Ищем диапазон дат на странице (например "9-15 марта")
        const dateRangeMatch = pageText.match(/(\d{1,2})-(\d{1,2})\s+марта/);
        
        if (dateRangeMatch) {
          const startDay = parseInt(dateRangeMatch[1]);
          const endDay = parseInt(dateRangeMatch[2]);
          
          console.log(`Found weekly range: ${startDay}-${endDay} марта`);
          
          // Если текущий день в диапазоне недели
          if (todayDay >= startDay && todayDay <= endDay) {
            console.log('Current day is within weekly range, using current week');
            return { url: weeklyUrl, isNextWeek: false };
          }
          
          // Если текущий день больше конца недели, используем следующую неделю
          if (todayDay > endDay) {
            console.log('Current day is after weekly range, using next week');
            return { url: `https://horoscopes.rambler.ru/${sign}/next-week/`, isNextWeek: true };
          }
        }
        
        // Если не можем определить по дате, проверяем следующую неделю
        const nextWeekUrl = `https://horoscopes.rambler.ru/${sign}/next-week/`;
        const nextWeekResponse = await fetch(nextWeekUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });
        
        if (nextWeekResponse.ok) {
          const nextWeekHtml = await nextWeekResponse.text();
          const $nextWeek = cheerio.load(nextWeekHtml);
          const nextWeekText = $nextWeek('body').text();
          
          // Проверяем есть ли на странице следующей недели текущая дата
          const nextWeekDateMatch = nextWeekText.match(/(\d{1,2})-(\d{1,2})\s+марта/);
          
          if (nextWeekDateMatch) {
            const nextStartDay = parseInt(nextWeekDateMatch[1]);
            const nextEndDay = parseInt(nextWeekDateMatch[2]);
            
            if (todayDay >= nextStartDay && todayDay <= nextEndDay) {
              console.log('Found current day in next week range, using next week');
              return { url: nextWeekUrl, isNextWeek: true };
            }
          }
        }
        
        // По умолчанию используем текущую неделю
        console.log('Could not determine weekly date, using current week by default');
        return { url: weeklyUrl, isNextWeek: false };
        
      } catch (error) {
        console.error('Error determining weekly horoscope source:', error);
        return { url: `https://horoscopes.rambler.ru/${sign}/weekly/`, isNextWeek: false };
      }
    }

    let horoscopeText = null;
    
    // Получаем текущую локальную дату (не UTC)
    const today = new Date();
    const localDate = new Date(today.getTime() - (today.getTimezoneOffset() * 60000));
    let actualDate = localDate;
    let weekRange = null;
    
    try {
      // Определяем какой URL использовать для недельного гороскопа
      const { url, isNextWeek } = await determineWeeklyHoroscopeSource(sign);
      console.log(`Using weekly URL: ${url} (isNextWeek: ${isNextWeek})`);
      
      // Получаем недельный гороскоп
      horoscopeText = await fetchHoroscope(url);
      
      // Пытаемся извлечь диапазон дат из URL или контента
      if (url.includes('/weekly/')) {
        // Для текущей недели - определяем диапазон на основе текущей даты
        const currentDay = localDate.getDate();
        if (currentDay >= 9 && currentDay <= 15) {
          weekRange = "9-15 марта 2026";
        } else if (currentDay >= 16 && currentDay <= 22) {
          weekRange = "16-22 марта 2026";
        } else if (currentDay >= 23 && currentDay <= 29) {
          weekRange = "23-29 марта 2026";
        } else if (currentDay >= 2 && currentDay <= 8) {
          weekRange = "2-8 марта 2026";
        } else {
          weekRange = `${currentDay} марта 2026`;
        }
      } else if (url.includes('/next-week/')) {
        // Для следующей недели - добавляем 7 дней к текущему диапазону
        const currentDay = localDate.getDate();
        if (currentDay >= 9 && currentDay <= 15) {
          weekRange = "16-22 марта 2026";
        } else if (currentDay >= 16 && currentDay <= 22) {
          weekRange = "23-29 марта 2026";
        } else if (currentDay >= 2 && currentDay <= 8) {
          weekRange = "9-15 марта 2026";
        } else {
          weekRange = `${currentDay + 7} марта 2026`;
        }
      }
      
      // Если не получилось с основного URL, пробуем альтернативный
      if (!horoscopeText || horoscopeText.length < 50) {
        const alternativeUrl = isNextWeek 
          ? `https://horoscopes.rambler.ru/${sign}/weekly/`
          : `https://horoscopes.rambler.ru/${sign}/next-week/`;
        
        console.log(`Trying alternative weekly URL: ${alternativeUrl}`);
        horoscopeText = await fetchHoroscope(alternativeUrl);
      }
      
      // Очищаем текст от лишних символов
      if (horoscopeText) {
        horoscopeText = horoscopeText
          .replace(/[ \t]+/g, ' ')  // Заменяем множественные пробелы и табы на одиночные пробелы
          .replace(/^\s*Гороскоп на неделю — \w+\s*/, '')
          .replace(/^\s*На этой неделе\s+/, 'На этой неделе ')
          .trim();
      }
      
    } catch (error) {
      console.error('Ошибка при получении недельного гороскопа:', error);
    }

    // Если не удалось получить с сайта, возвращаем заглушку
    if (!horoscopeText || horoscopeText.length < 50) {
      console.log('Using fallback weekly text for', sign);
      const fallbackTexts = {
        aries: 'На этой неделе Овнам рекомендуется проявить инициативу в важных делах. Звезды благоприятствуют новым проектам и активным действиям.',
        taurus: 'Тельцам стоит сосредоточиться на стабильности и практических вопросах. Неделя благоприятна для финансовых решений.',
        gemini: 'Близнецы могут рассчитывать на интересные знакомства и плодотворное общение. Хорошее время для обучения.',
        cancer: 'Ракам рекомендуется уделить внимание семье и домашним делам. Интуиция будет особенно сильной.',
        leo: 'Львы будут в центре внимания на этой неделе. Используйте харизму для достижения поставленных целей.',
        virgo: 'Девам стоит заняться планированием и организацией. Внимание к деталям принесет отличные результаты.',
        libra: 'Весы найдут гармонию в отношениях. Неделя благоприятна для творчества и эстетических проектов.',
        scorpio: 'Скорпионам рекомендуется довериться интуиции. Глубокий анализ поможет найти скрытые возможности.',
        sagittarius: 'Стрельцы могут планировать путешествия или изучение нового. Расширение горизонтов принесет радость.',
        capricorn: 'Козерогам стоит сосредоточиться на карьерных вопросах. Упорство и дисциплина приведут к успеху.',
        aquarius: 'Водолеи могут рассчитывать на поддержку друзей. Оригинальные идеи найдут практическое воплощение.',
        pisces: 'Рыбам рекомендуется прислушаться к своим чувствам. Творческий подход поможет решить сложные задачи.'
      };
      horoscopeText = fallbackTexts[sign] || 'На этой неделе звезды благосклонны к вам. Следуйте своей интуиции и действуйте решительно.';
    }

    console.log('Final weekly horoscope text:', horoscopeText.substring(0, 100) + '...');
    console.log('Text length:', horoscopeText.length);
    console.log('Contains \\n\\n:', horoscopeText.includes('\n\n'));
    console.log('Newline positions:', [...horoscopeText.matchAll(/\n\n/g)].map(m => m.index));

    console.log('Final weekly horoscope text:', horoscopeText.substring(0, 100) + '...');
    console.log('Week range determined:', weekRange);

    res.json({
      ok: true,
      horoscope: {
        sign,
        text: horoscopeText,
        period: 'week',
        date: actualDate.toISOString().split('T')[0],
        weekRange: weekRange // Добавляем диапазон недели
      }
    });

  } catch (error) {
    console.error('Ошибка API недельного гороскопа:', error);
    res.status(500).json({ ok: false, error: 'Внутренняя ошибка сервера' });
  }
});

// API для получения месячного гороскопа
app.get('/api/horoscope/:sign/monthly', async (req, res) => {
  try {
    const { sign } = req.params;
    const validSigns = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
    
    if (!validSigns.includes(sign)) {
      return res.status(400).json({ ok: false, error: 'Неверный знак зодиака' });
    }

    // Функция для получения месячного гороскопа с сайта
    async function fetchMonthlyHoroscope(url) {
      try {
        console.log('Fetching monthly horoscope from:', url);
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });
        
        if (!response.ok) {
          console.log('Response not ok:', response.status);
          return null;
        }
        
        const html = await response.text();
        const $ = cheerio.load(html);
        
        // Ищем текст гороскопа - для месячного гороскопа нужно собрать все абзацы до "Прогноз предоставлен Astrostar.ru"
        let horoscopeText = null;
        
        // Сначала попробуем найти контейнер с гороскопом
        const containerSelectors = [
          '.horoscope-content',
          '.horoscope__content',
          '.content',
          'article',
          '.forecast-content',
          '.text-content'
        ];
        
        for (const containerSelector of containerSelectors) {
          const container = $(containerSelector).first();
          if (container.length > 0) {
            // Собираем все параграфы из контейнера до стоп-фразы
            const paragraphs = [];
            container.find('p').each((i, elem) => {
              const text = $(elem).text().trim();
              
              // Останавливаемся если встретили стоп-фразу
              if (text.includes('Прогноз предоставлен Astrostar.ru')) {
                return false; // break
              }
              
              if (text.length > 20 && !text.includes('Реклама') && !text.includes('©')) {
                paragraphs.push(text);
              }
            });
            
            if (paragraphs.length > 0) {
              horoscopeText = paragraphs.join('\n\n');
              console.log('Found monthly horoscope in container:', containerSelector, 'paragraphs:', paragraphs.length);
              break;
            }
          }
        }
        
        // Если не нашли в контейнере, попробуем собрать все подходящие параграфы
        if (!horoscopeText) {
          const paragraphs = [];
          let foundStart = false;
          
          $('p').each((i, elem) => {
            const text = $(elem).text().trim();
            
            // Останавливаемся если встретили стоп-фразу
            if (text.includes('Прогноз предоставлен Astrostar.ru')) {
              return false; // break
            }
            
            // Ищем начало гороскопа
            if (!foundStart && (text.includes('Гороскоп на') || text.includes('В этом месяце') || 
                text.length > 100)) {
              foundStart = true;
            }
            
            // Если нашли начало, собираем все подходящие параграфы
            if (foundStart && text.length > 20 && !text.includes('Реклама') && 
                !text.includes('©') && !text.includes('Подписывайтесь') && 
                !text.includes('Читайте также')) {
              paragraphs.push(text);
            }
          });
          
          if (paragraphs.length > 0) {
            horoscopeText = paragraphs.join('\n\n');
            console.log('Found monthly horoscope by paragraph collection, paragraphs:', paragraphs.length);
          }
        }
        
        return horoscopeText;
      } catch (error) {
        console.error('Error fetching monthly horoscope:', error);
        return null;
      }
    }

    // Функция для определения правильного месячного гороскопа
    async function determineMonthlyHoroscopeSource(sign) {
      try {
        const today = new Date();
        const currentMonth = today.getMonth(); // 0-11
        const currentDay = today.getDate();
        
        // Названия месяцев для URL
        const monthNames = [
          'january', 'february', 'march', 'april', 'may', 'june',
          'july', 'august', 'september', 'october', 'november', 'december'
        ];
        
        console.log(`Current date for monthly: ${currentDay}.${currentMonth + 1}.${today.getFullYear()}`);
        
        // Если уже конец месяца (после 25 числа), проверяем следующий месяц
        let targetMonth = currentMonth;
        if (currentDay >= 25) {
          // Проверяем, есть ли уже гороскоп на следующий месяц
          const nextMonth = (currentMonth + 1) % 12;
          const nextMonthUrl = `https://horoscopes.rambler.ru/${sign}/${monthNames[nextMonth]}/`;
          
          try {
            const response = await fetch(nextMonthUrl, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
              }
            });
            
            if (response.ok) {
              console.log('Found next month horoscope, using next month');
              return { url: nextMonthUrl, isNextMonth: true, monthName: monthNames[nextMonth] };
            }
          } catch (error) {
            console.log('Next month horoscope not available, using current month');
          }
        }
        
        // Используем текущий месяц
        const monthlyUrl = `https://horoscopes.rambler.ru/${sign}/monthly/`;
        console.log('Using current month horoscope');
        return { url: monthlyUrl, isNextMonth: false, monthName: monthNames[currentMonth] };
        
      } catch (error) {
        console.error('Error determining monthly horoscope source:', error);
        return { url: `https://horoscopes.rambler.ru/${sign}/monthly/`, isNextMonth: false, monthName: 'march' };
      }
    }

    // Получаем текущую локальную дату (не UTC)
    const today = new Date();
    const localDate = new Date(today.getTime() - (today.getTimezoneOffset() * 60000));
    let actualDate = localDate;
    let monthRange = null;
    let horoscopeText = null;
    
    try {
      // Определяем какой URL использовать для месячного гороскопа
      const { url, isNextMonth, monthName } = await determineMonthlyHoroscopeSource(sign);
      console.log(`Using monthly URL: ${url} (isNextMonth: ${isNextMonth})`);
      
      // Определяем название месяца для отображения
      const monthNames = {
        'january': 'Январь',
        'february': 'Февраль', 
        'march': 'Март',
        'april': 'Апрель',
        'may': 'Май',
        'june': 'Июнь',
        'july': 'Июль',
        'august': 'Август',
        'september': 'Сентябрь',
        'october': 'Октябрь',
        'november': 'Ноябрь',
        'december': 'Декабрь'
      };
      
      monthRange = `${monthNames[monthName]} ${localDate.getFullYear()}`;
      
      // Получаем месячный гороскоп
      horoscopeText = await fetchMonthlyHoroscope(url);
      
      // Если не получилось с основного URL, пробуем альтернативный
      if (!horoscopeText || horoscopeText.length < 50) {
        console.log('Trying alternative monthly URL');
        const alternativeUrl = `https://horoscopes.rambler.ru/${sign}/${monthName}/`;
        horoscopeText = await fetchMonthlyHoroscope(alternativeUrl);
      }
      
      // Очищаем текст от лишних символов, но сохраняем переносы строк
      if (horoscopeText) {
        horoscopeText = horoscopeText
          .replace(/[ \t]+/g, ' ')  // Заменяем множественные пробелы и табы на одиночные пробелы
          .replace(/^\s*Гороскоп на месяц — \w+\s*/, '')
          .replace(/^\s*В этом месяце\s+/, 'В этом месяце ')
          .trim();
      }
      
    } catch (error) {
      console.error('Ошибка при получении месячного гороскопа:', error);
    }

    // Если не удалось получить с сайта, возвращаем заглушку
    if (!horoscopeText || horoscopeText.length < 50) {
      console.log('Using fallback monthly text for', sign);
      const fallbackTexts = {
        aries: 'В этом месяце Овнам рекомендуется сосредоточиться на долгосрочных целях и планах. Звезды благоприятствуют новым начинаниям и активным действиям.',
        taurus: 'Тельцам стоит уделить внимание финансовым вопросам и стабильности. Месяц благоприятен для практических решений.',
        gemini: 'Близнецы могут рассчитывать на активное общение и новые знакомства. Хорошее время для обучения и развития.',
        cancer: 'Ракам рекомендуется сосредоточиться на семейных делах и домашнем уюте. Интуиция будет особенно сильной.',
        leo: 'Львы будут в центре внимания в этом месяце. Используйте харизму для достижения амбициозных целей.',
        virgo: 'Девам стоит заняться систематизацией и планированием. Внимание к деталям принесет отличные результаты.',
        libra: 'Весы найдут гармонию в отношениях и творчестве. Месяц благоприятен для эстетических проектов.',
        scorpio: 'Скорпионам рекомендуется довериться интуиции и заняться глубоким самоанализом.',
        sagittarius: 'Стрельцы могут планировать дальние поездки и расширение горизонтов. Месяц открытий и возможностей.',
        capricorn: 'Козерогам стоит сосредоточиться на карьерных достижениях. Упорство приведет к значительному успеху.',
        aquarius: 'Водолеи могут рассчитывать на поддержку друзей и единомышленников. Время для реализации оригинальных идей.',
        pisces: 'Рыбам рекомендуется прислушаться к внутреннему голосу. Творческий подход поможет в решении задач.'
      };
      horoscopeText = fallbackTexts[sign] || 'В этом месяце звезды благосклонны к вам. Следуйте своей интуиции и действуйте решительно.';
    }

    console.log('Final monthly horoscope text:', horoscopeText.substring(0, 100) + '...');
    console.log('Month range determined:', monthRange);

    res.json({
      ok: true,
      horoscope: {
        sign,
        text: horoscopeText,
        period: 'month',
        date: actualDate.toISOString().split('T')[0],
        monthRange: monthRange // Добавляем название месяца
      }
    });

  } catch (error) {
    console.error('Ошибка API месячного гороскопа:', error);
    res.status(500).json({ ok: false, error: 'Внутренняя ошибка сервера' });
  }
});

// Отдача статических файлов веб-приложения (после всех API роутов)
const distPath = path.join(__dirname, '..', 'dist');

// ВАЖНО: Исключаем папку /api из статических файлов
app.use(express.static(distPath, {
  index: false, // Не обслуживать index.html автоматически
  setHeaders: (res, path) => {
    // Не кешировать API запросы
    if (path.includes('/api/')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

console.log('Serving static files from:', distPath);

// Глобальная обработка ошибок для API
app.use('/api/*', (err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({ ok: false, error: 'Внутренняя ошибка сервера' });
});

// SPA fallback - отдаем index.html для всех не-API роутов
app.get('*', (req, res) => {
  // Если запрос не к API, отдаем index.html
  if (!req.path.startsWith('/api')) {
    try {
      const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
      res.sendFile(indexPath);
    } catch (error) {
      res.status(404).json({ ok: false, error: 'Страница не найдена' });
    }
  } else {
    res.status(404).json({ ok: false, error: 'API endpoint не найден' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
  console.log(`DB file: server/data/mystic.db`);
});
