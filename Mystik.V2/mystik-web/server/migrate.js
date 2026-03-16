import { Database } from 'bun:sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'data', 'mystic.db');

console.log('Миграция базы данных...');

const db = new Database(DB_PATH);

try {
  // Проверяем, есть ли уже новые колонки
  const tableInfo = db.query('PRAGMA table_info(users)').all();
  const hasUsername = tableInfo.some(col => col.name === 'username');
  const hasBirthDate = tableInfo.some(col => col.name === 'birth_date');

  if (!hasUsername || !hasBirthDate) {
    console.log('Добавление новых колонок...');
    
    // Создаём новую таблицу с правильной структурой
    db.exec(`
      CREATE TABLE IF NOT EXISTS users_new (
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
    `);

    // Копируем данные из старой таблицы, генерируя username из email
    const oldUsers = db.query('SELECT * FROM users').all();
    const insertStmt = db.query(`
      INSERT INTO users_new (id, email, username, name, birth_date, password_hash, is_guest, created_at, last_login)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const user of oldUsers) {
      const username = user.email.split('@')[0] + '_' + Math.random().toString(36).substr(2, 4);
      insertStmt.run(
        user.id,
        user.email,
        username,
        user.name,
        null, // birth_date
        user.password_hash,
        user.is_guest,
        user.created_at,
        user.last_login
      );
    }

    // Удаляем старую таблицу и переименовываем новую
    db.exec(`
      DROP TABLE users;
      ALTER TABLE users_new RENAME TO users;
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
    `);

    console.log('✓ Миграция завершена успешно!');
    console.log(`✓ Обновлено пользователей: ${oldUsers.length}`);
  } else {
    console.log('✓ База данных уже обновлена');
  }
} catch (error) {
  console.error('✗ Ошибка миграции:', error.message);
  process.exit(1);
} finally {
  db.close();
}
