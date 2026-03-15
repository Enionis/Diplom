# Используем официальный Node.js образ
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci --only=production

# Копируем исходный код
COPY . .

# Создаем директорию для базы данных
RUN mkdir -p data

# Устанавливаем права на директорию данных
RUN chmod 755 data

# Открываем порт
EXPOSE 8080

# Запускаем приложение
CMD ["npm", "start"]