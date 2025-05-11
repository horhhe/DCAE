# DCAE
Distributed calculator of arithmetic expressions
# finalproject
**Распределённый калькулятор**, при себе имеет:

- Регистрация и JWT-авторизация
- Хранениу данных в SQLite (через GORM)  
- Agent, который опрашивает задачи по HTTP и возвращает результаты  
- Веб-интерфейс на React + Vite + TailwindCSS  
- End-to-end и unit-тесты


## Требования

- **Go** ≥ 1.20 (рекомендуется 1.23+)  
- **Node.js** ≥ 16 и **npm** или **yarn**  

---

## Установка и запуск

### Backend без фронтенда

1. Клонируйте репозиторий и перейдите в папку проекта:
   ```bash
   git clone https://github.com/horhhe/DCAE.git
   cd DCAE
   ```

2. Запустите HTTP-сервис (оркестратор):
   ```bash
   go run ./cmd/orchestrator/...
   ```

### Agent

В отдельном терминале **из того же корня**:

```bash
cd DCAE
go run ./cmd/agent/...
```

- Agent будет опрашивать `GET http://localhost:8080/api/v1/internal/task`  
- Симулировать задержку и отправлять результат на `POST http://localhost:8080/api/v1/internal/task`

### Frontend

1. Перейдите в директорию фронтенда:
   ```bash
   cd DCAE
   cd frontend
   ```

2. Установите зависимости:
   ```bash
   npm install
   # или, если вы используете yarn:
   # yarn install
   ```

3. Запустите dev-сервер:
   ```bash
   npm run dev
   # или yarn dev
   ```
   - Dev-сервер Vite по умолчанию на `http://localhost:5173`  
   - Он проксирует все запросы `/api/v1/**` → `http://localhost:8080`

4. Откройте в браузере `http://localhost:5173/register`, создайте учетную запись и войдите в неё, затем откройте в браузере `http://localhost:5173/calculator` и работайте с калькулятором

---

## 🔧 Использование API без фронтенда

Можно оперировать cURL / Postman:

```bash
# 1. Регистрация
curl -i -X POST http://localhost:8080/api/v1/register \
  -H "Content-Type: application/json" \
  -d '{"login":"user1","password":"pass1"}'

# 2. Логин → получаем JSON { "token": "..." }
curl -s -X POST http://localhost:8080/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"login":"user1","password":"pass1"}'

# 3. Вычислить выражение (Bearer токен)
TOKEN=eyJhbGciOi...
curl -i -X POST http://localhost:8080/api/v1/calculate \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"expression":"(2+3)*4/2"}'

# 4. Получить историю
curl -s -X GET http://localhost:8080/api/v1/expressions \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🛠 Исправление ошибки `Cannot find module '@vitejs/plugin-react'`

Если при `npm run dev` видите:

```
Error: Cannot find module '@vitejs/plugin-react'
```

нужно:

1. Перейти в папку фронтенда:
   ```bash
   cd DCAE
   cd frontend
   ```

2. Установить плагин:
   ```bash
   npm install --save-dev @vitejs/plugin-react
   ```

3. Перезапустить:
   ```bash
   npm run dev
   ```

Также убедитесь, что в вашем `package.json` присутствуют:

```json
{
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.4",
    "postcss": "^8.4.24",
    "autoprefixer": "^10.4.14"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.1"
  }
}
```

и затем выполнить `npm install`.

---

## Запуск тестов

### Unit-тесты (Go)

```bash
go test ./tests/unit/...
```

### Integration-тесты (Go)

```bash
go test ./tests/integration/...
```
