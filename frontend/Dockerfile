FROM node:18-alpine as builder

WORKDIR /app


COPY package*.json ./


RUN npm install

# Копируем весь остальной код фронтенда
COPY . .

# Собираем production-версию приложения
RUN npm run build

# --- ЭТАП 2: ЗАПУСК (SERVE) ---
# Используем легкий веб-сервер Nginx для раздачи статических файлов
FROM nginx:stable-alpine

# Копируем собранные файлы из этапа "builder" в директорию Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем наш кастомный конфиг Nginx (мы его сейчас создадим)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Команда для запуска Nginx
CMD ["nginx", "-g", "daemon off;"]