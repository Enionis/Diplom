import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'data', 'mystic.db');

let db = null;

function initSchema(database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      username TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      birth_date TEXT,
      password_hash TEXT NOT NULL,
      is_guest INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      last_login TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

    CREATE TABLE IF NOT EXISTS quizzes (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      is_premium INTEGER NOT NULL DEFAULT 0,
      questions TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS quiz_results (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      quiz_id TEXT NOT NULL,
      answers TEXT NOT NULL,
      result TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (quiz_id) REFERENCES quizzes(id),
      UNIQUE(user_id, quiz_id)
    );
    CREATE INDEX IF NOT EXISTS idx_quiz_results_user ON quiz_results(user_id);
    CREATE INDEX IF NOT EXISTS idx_quiz_results_quiz ON quiz_results(quiz_id);

    CREATE TABLE IF NOT EXISTS tarot_spreads (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      card_count INTEGER NOT NULL,
      positions TEXT NOT NULL,
      is_premium INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS tarot_cards (
      id TEXT PRIMARY KEY,
      number TEXT NOT NULL,
      name TEXT NOT NULL,
      symbol TEXT NOT NULL,
      meaning TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS tarot_interpretations (
      id TEXT PRIMARY KEY,
      card_id TEXT NOT NULL,
      spread_id TEXT NOT NULL,
      position_index INTEGER NOT NULL,
      interpretation TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (card_id) REFERENCES tarot_cards(id),
      FOREIGN KEY (spread_id) REFERENCES tarot_spreads(id),
      UNIQUE(card_id, spread_id, position_index)
    );
    CREATE INDEX IF NOT EXISTS idx_tarot_interpretations_card ON tarot_interpretations(card_id);
    CREATE INDEX IF NOT EXISTS idx_tarot_interpretations_spread ON tarot_interpretations(spread_id);

    CREATE TABLE IF NOT EXISTS tarot_readings (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      spread_id TEXT NOT NULL,
      cards TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (spread_id) REFERENCES tarot_spreads(id)
    );
    CREATE INDEX IF NOT EXISTS idx_tarot_readings_user ON tarot_readings(user_id);
    CREATE INDEX IF NOT EXISTS idx_tarot_readings_spread ON tarot_readings(spread_id);
  `);
}

function getDb() {
  if (db) return db;
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  db = new Database(DB_PATH);
  db.exec('PRAGMA journal_mode = WAL');
  initSchema(db);
  return db;
}

export function initDatabase() {
  return getDb();
}

export function getDatabase() {
  if (!db) throw new Error('Database not initialized. Call initDatabase() first.');
  return db;
}
