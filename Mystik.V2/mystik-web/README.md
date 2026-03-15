# 🚀 Mystik Web - Локальная разработка

## 📋 Требования
- Node.js 18+
- npm или yarn

## 🛠️ Установка

```bash
# Установка зависимостей фронтенда
npm install

# Установка зависимостей сервера
cd server
npm install
cd ..
```

## 🚀 Запуск

### Вариант 1: Все вместе (рекомендуется)
```bash
npm run full
```
Запускает одновременно:
- Фронтенд на http://localhost:5173
- Сервер на http://localhost:3001

### Вариант 2: Раздельно
```bash
# Терминал 1: Фронтенд
npm run dev

# Терминал 2: Сервер
npm run server:dev
```

## 🗄️ База данных

```bash
# Выполнить миграцию (создать таблицы)
npm run migrate
```

## 📱 Мобильное приложение

API настроен на `http://localhost:3001` для локальной разработки.

## 🔗 Ссылки

- **Веб-приложение:** http://localhost:5173
- **API сервер:** http://localhost:3001
- **Health check:** http://localhost:3001/api/health