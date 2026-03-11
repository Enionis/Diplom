import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { initDatabase, getDatabase } from './db.js';

initDatabase();

const app = express();

// CORS настройки
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

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
    const quizzes = db.prepare('SELECT id, title, description, is_premium FROM quizzes').all();
    
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
    const spreads = db.prepare('SELECT * FROM tarot_spreads ORDER BY card_count ASC').all();
    
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`DB file: server/data/mystic.db`);
});
