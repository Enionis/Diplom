# 🚀 Деплой Mystik сервера на Fly.io

## 🌟 Почему Fly.io?
- ✅ **Бесплатно**: 3 приложения, 256MB RAM
- ✅ **Работает без VPN** из России
- ✅ **Поддержка Docker**
- ✅ **Persistent volumes** для SQLite
- ✅ **Автоматическое масштабирование**
- ✅ **HTTPS автоматически**

## 📋 Пошаговая инструкция

### Шаг 1: Установка Fly CLI

**Windows (PowerShell):**
```powershell
iwr https://fly.io/install.ps1 -useb | iex
```

**Или через npm:**
```bash
npm install -g @flydotio/flyctl
```

### Шаг 2: Регистрация и авторизация
```bash
# Регистрация/вход
fly auth login

# Проверка авторизации
fly auth whoami
```

### Шаг 3: Создание приложения
```bash
# Переходим в папку сервера
cd mystik-web/server

# Создаем приложение (замените mystik-server на уникальное имя)
fly apps create mystik-server

# Или используйте автогенерацию имени
fly apps create
```

### Шаг 4: Создание volume для базы данных
```bash
# Создаем persistent volume для SQLite
fly volumes create mystik_data --region ams --size 1
```

### Шаг 5: Деплой
```bash
# Первый деплой
fly deploy

# Проверяем статус
fly status

# Смотрим логи
fly logs
```

## 🔧 Конфигурация

### fly.toml (уже создан)
```toml
app = "mystik-server"
primary_region = "ams"

[build]

[env]
  NODE_ENV = "production"
  PORT = "8080"

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0

[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 256

[mounts]
  source = "mystik_data"
  destination = "/app/mystik-web/server/data"
```

### Dockerfile (уже создан)
Создан в `mystik-web/server/Dockerfile`

## 📱 Обновление мобильного приложения

После успешного деплоя:

1. Получите URL вашего приложения:
```bash
fly info
```

2. Обновите `constants/api.ts`:
```typescript
const PRODUCTION_API_URL = 'https://your-app-name.fly.dev';
```

## ✅ Проверка работы

1. Откройте `https://your-app-name.fly.dev/api/health`
2. Должен вернуться: `{"ok": true, "status": "healthy"}`

## 🛠️ Полезные команды

```bash
# Просмотр логов в реальном времени
fly logs -f

# Подключение к консоли приложения
fly ssh console

# Перезапуск приложения
fly apps restart mystik-server

# Масштабирование
fly scale count 1

# Обновление после изменений
fly deploy

# Удаление приложения (если нужно)
fly apps destroy mystik-server
```

## 🔍 Отладка

### Если приложение не запускается:
```bash
# Проверяем логи
fly logs

# Подключаемся к машине
fly ssh console

# Проверяем файлы
ls -la /app/mystik-web/server/
```

### Если база данных не работает:
```bash
# Проверяем volume
fly volumes list

# Проверяем монтирование
fly ssh console
ls -la /app/mystik-web/server/data/
```

## 💰 Лимиты бесплатного плана

- **3 приложения** бесплатно
- **256MB RAM** на приложение
- **3GB** persistent storage
- **160GB** трафика в месяц

## 🚀 Автоматический деплой

Для автоматического деплоя при изменениях создайте GitHub Action:

```yaml
# .github/workflows/fly.yml
name: Fly Deploy
on:
  push:
    branches:
      - main
jobs:
  deploy:
    name: Deploy app
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: superfly/flyctl-actions/setup-flyctl@master
      - run: flyctl deploy --remote-only
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
```

---

**🎯 Готово!** Ваш сервер будет доступен по адресу `https://your-app-name.fly.dev`