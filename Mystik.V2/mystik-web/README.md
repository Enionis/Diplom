# 🔮 Mystik - Система аутентификации

Полнофункциональная система регистрации и входа с серверной базой данных.

## ⚡ Быстрый старт

```bash
# 1. Установка
cd mystik-web/server && npm install
cd .. && npm install

# 2. Конфигурация
echo VITE_API_URL=http://localhost:3001 > .env

# 3. Запуск сервера (Терминал 1)
cd server && npm run dev

# 4. Запуск клиента (Терминал 2)
cd .. && npm run dev
```

Откройте http://localhost:5173

## ✨ Возможности

### 🔐 Аутентификация
- ✅ Регистрация с email, логином, паролем, именем и датой рождения
- ✅ Вход по email или логину
- ✅ Автоматическое сохранение сессии
- ✅ Проверка сессии при загрузке

### 👤 Профиль
- ✅ Просмотр всех данных
- ✅ Редактирование имени и даты рождения
- ✅ Смена пароля с проверкой старого
- ✅ Выход из аккаунта

### 🔒 Безопасность
- ✅ Хеширование паролей (bcrypt)
- ✅ Защита от SQL-инъекций
- ✅ Валидация данных
- ✅ Уникальность email и логина

## 📚 Документация

| Файл | Описание |
|------|----------|
| [QUICKSTART.md](QUICKSTART.md) | ⚡ Быстрый старт за 5 минут |
| [ИНСТРУКЦИЯ.md](ИНСТРУКЦИЯ.md) | 🇷🇺 Пошаговая инструкция |
| [README_AUTH.md](README_AUTH.md) | 📖 Полная документация |
| [COMMANDS.md](COMMANDS.md) | 💻 Все команды |
| [ARCHITECTURE.md](ARCHITECTURE.md) | 🏗️ Архитектура системы |
| [SETUP.md](SETUP.md) | 🔧 Подробная настройка |
| [SUMMARY.md](SUMMARY.md) | 📝 Краткое резюме |
| [CHANGELOG.md](CHANGELOG.md) | 📋 История изменений |

## 🎯 Начало работы

### Для пользователей
1. Прочитайте [QUICKSTART.md](QUICKSTART.md) или [ИНСТРУКЦИЯ.md](ИНСТРУКЦИЯ.md)
2. Следуйте инструкциям
3. Зарегистрируйтесь и пользуйтесь!

### Для разработчиков
1. Изучите [ARCHITECTURE.md](ARCHITECTURE.md)
2. Прочитайте [SETUP.md](SETUP.md)
3. Посмотрите [README_AUTH.md](README_AUTH.md)

## 🛠️ Технологии

### Backend
- Node.js + Express
- SQLite (better-sqlite3)
- bcryptjs
- CORS

### Frontend
- React 18 + TypeScript
- React Router
- Vite
- Lucide Icons

## 📊 API Endpoints

| Метод | URL | Описание |
|-------|-----|----------|
| POST | `/api/register` | Регистрация |
| POST | `/api/login` | Вход |
| GET | `/api/user/:id` | Получение данных |
| PUT | `/api/user/:id` | Обновление профиля |
| POST | `/api/user/:id/change-password` | Смена пароля |

## 🗄️ База данных

```sql
CREATE TABLE users (
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
```

## 🧪 Тестирование

```bash
cd mystik-web/server
npm test
```

## 📁 Структура проекта

```
mystik-web/
├── server/              # Backend (Node.js + Express)
│   ├── index.js        # API endpoints
│   ├── db.js           # База данных
│   ├── migrate.js      # Миграция
│   └── test-api.js     # Тесты
├── src/
│   ├── pages/          # Страницы
│   │   ├── Auth.tsx    # Вход/Регистрация
│   │   └── Profile.tsx # Профиль
│   ├── providers/      # Провайдеры
│   │   └── AuthProvider.tsx
│   └── utils/          # Утилиты
│       ├── apiAuth.ts
│       └── authDatabase.ts
└── docs/               # Документация
```

## 🔧 Конфигурация

Создайте файл `.env`:
```env
VITE_API_URL=http://localhost:3001
```

## 🐛 Решение проблем

### Сервер не запускается
```bash
netstat -ano | findstr :3001
taskkill /PID <номер> /F
```

### API не работает
Проверьте файл `.env` и перезапустите клиент

### Подробнее
См. [ИНСТРУКЦИЯ.md](ИНСТРУКЦИЯ.md) → "Решение проблем"

## 📝 Требования

- Node.js >= 14
- npm >= 6
- Современный браузер

## 🚀 Команды

```bash
# Установка
npm install

# Разработка
npm run dev

# Миграция БД
npm run migrate

# Тесты
npm test
```

## 📈 Статистика

- ✅ 5 API endpoints
- ✅ 2 страницы аутентификации
- ✅ 10+ файлов документации
- ✅ Полное покрытие тестами
- ✅ Безопасность на уровне production

## 🎓 Обучение

1. [QUICKSTART.md](QUICKSTART.md) - Начните здесь (5 минут)
2. [ИНСТРУКЦИЯ.md](ИНСТРУКЦИЯ.md) - Подробная инструкция
3. [ARCHITECTURE.md](ARCHITECTURE.md) - Как всё работает
4. [README_AUTH.md](README_AUTH.md) - Полная документация

## 🤝 Вклад

Проект создан для хакатона. Предложения и улучшения приветствуются!

## 📄 Лицензия

MIT

## 🙏 Благодарности

Создано с помощью Kiro AI Assistant

---

**Версия:** 2.0.0  
**Статус:** ✅ Готово к использованию  
**Документация:** ✅ Полная  
**Тесты:** ✅ Покрыто

## 🔗 Быстрые ссылки

- 📖 [Полная документация](README_AUTH.md)
- ⚡ [Быстрый старт](QUICKSTART.md)
- 🇷🇺 [Инструкция на русском](ИНСТРУКЦИЯ.md)
- 💻 [Команды](COMMANDS.md)
- 🏗️ [Архитектура](ARCHITECTURE.md)

**Готовы начать?** → [QUICKSTART.md](QUICKSTART.md) ⚡
