#!/bin/bash

echo "🔮 Запуск Mystik Web"
echo ""

# Путь к bun
BUN_PATH="$HOME/.bun/bin/bun"

# Проверка установки bun
if [ ! -f "$BUN_PATH" ]; then
    echo "❌ Bun не найден. Установите его:"
    echo "curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

# Загрузка nvm для клиента
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Использование правильной версии Node.js для клиента
if [ -f .nvmrc ]; then
    nvm use > /dev/null 2>&1
fi

echo ""
echo "📍 Bun: $($BUN_PATH --version)"
echo "📍 Node.js: $(node --version)"
echo ""
echo "Выберите, что запустить:"
echo "  1) Сервер (порт 3001)"
echo "  2) Клиент (порт 5173)"
echo "  3) Оба (сервер в фоне, клиент в текущем терминале)"
echo ""
read -p "Ваш выбор (1-3): " choice

case $choice in
    1)
        echo "🚀 Запуск сервера..."
        cd server
        $BUN_PATH --watch index.js
        ;;
    2)
        echo "🚀 Запуск клиента..."
        npm run dev
        ;;
    3)
        echo "🚀 Запуск сервера в фоновом режиме..."
        cd server
        $BUN_PATH --watch index.js > ../server.log 2>&1 &
        SERVER_PID=$!
        echo "✅ Сервер запущен (PID: $SERVER_PID)"
        echo "📝 Логи сервера: server.log"
        
        cd ..
        sleep 2
        echo ""
        echo "🚀 Запуск клиента..."
        npm run dev
        ;;
    *)
        echo "❌ Неверный выбор"
        exit 1
        ;;
esac
