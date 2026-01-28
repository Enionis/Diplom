import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { initDatabase, getDatabase } from './db.js';

initDatabase();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const SALT_ROUNDS = 10;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 255;

function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  return trimmed.length <= MAX_EMAIL_LENGTH && EMAIL_REGEX.test(trimmed);
}

function validateName(name) {
  if (!name || typeof name !== 'string') return false;
  return name.trim().length > 0 && name.trim().length <= MAX_NAME_LENGTH;
}

function validatePassword(password) {
  return typeof password === 'string' && password.length >= MIN_PASSWORD_LENGTH;
}

/** POST /api/register — регистрация. Защита: bcrypt, валидация, prepared statements */
app.post('/api/register', (req, res) => {
  try {
    const { email, password, name } = req.body || {};
    if (!validateEmail(email)) {
      return res.status(400).json({ ok: false, error: 'Некорректный email' });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ ok: false, error: 'Пароль не менее 6 символов' });
    }
    if (!validateName(name)) {
      return res.status(400).json({ ok: false, error: 'Укажите имя (до 100 символов)' });
    }

    const db = getDatabase();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    const existing = db.prepare('SELECT id FROM users WHERE email = ? AND is_guest = 0').get(trimmedEmail);
    if (existing) {
      return res.status(409).json({ ok: false, error: 'Такой email уже зарегистрирован' });
    }

    const passwordHash = bcrypt.hashSync(password, SALT_ROUNDS);
    const id = `user_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    const now = new Date().toISOString();

    db.prepare(
      `INSERT INTO users (id, email, name, password_hash, is_guest, created_at, last_login)
       VALUES (?, ?, ?, ?, 0, ?, ?)`
    ).run(id, trimmedEmail, trimmedName, passwordHash, now, now);

    res.json({ ok: true, user: { id, email: trimmedEmail, name: trimmedName } });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ ok: false, error: 'Ошибка сервера' });
  }
});

/** POST /api/login — вход. Защита: bcrypt.compare, prepared statements */
app.post('/api/login', (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!validateEmail(email)) {
      return res.status(400).json({ ok: false, error: 'Некорректный email' });
    }
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ ok: false, error: 'Укажите пароль' });
    }

    const db = getDatabase();
    const trimmedEmail = email.trim().toLowerCase();
    const row = db.prepare(
      'SELECT id, email, name, password_hash FROM users WHERE email = ? AND is_guest = 0'
    ).get(trimmedEmail);

    if (!row) {
      return res.status(401).json({ ok: false, error: 'Неверный email или пароль' });
    }

    const match = bcrypt.compareSync(password, row.password_hash);
    if (!match) {
      return res.status(401).json({ ok: false, error: 'Неверный email или пароль' });
    }

    const now = new Date().toISOString();
    db.prepare('UPDATE users SET last_login = ? WHERE id = ?').run(now, row.id);

    res.json({ ok: true, user: { id: row.id, email: row.email, name: row.name } });
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
    const row = db.prepare('SELECT id, email, name FROM users WHERE id = ? AND is_guest = 0').get(id);
    if (!row) {
      return res.status(404).json({ ok: false, error: 'Пользователь не найден' });
    }
    res.json({ ok: true, user: { id: row.id, email: row.email, name: row.name } });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ ok: false, error: 'Ошибка сервера' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`DB file: server/data/mystic.db`);
});
