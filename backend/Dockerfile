
FROM python:3.9-alpine

# 2. Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# 3. Копируем файл с зависимостями
COPY requirements.txt .

# 4. Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# 5. Копируем весь код бэкенда
COPY . .

# 6. Указываем команду для запуска приложения
CMD ["python", "backend_chat.py"]