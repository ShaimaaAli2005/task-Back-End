# Skyly Weather 🌤️

A modern full-stack weather dashboard built with:

- React + Vite
- Tailwind CSS
- Node.js + Express
- WeatherAPI
- Recharts
- Lucide React

## Project idea

Skyly is not a clone of a traditional weather app. The interface is designed around a dynamic "weather journey":

- **Now** — current conditions
- **Today** — hourly temperature journey
- **Insights** — readable weather analysis
- Dynamic visual mood based on sunny / cloudy / rainy / stormy / snowy / night conditions
- City search
- Saved locations using localStorage
- Temperature unit switch
- Sunrise / sunset
- Weather metrics
- Responsive layout

## Run it

### 1. Backend

```bash
cd server
npm install
```

Copy `.env.example` to `.env` and put your WeatherAPI key:

```env
WEATHER_API_KEY=YOUR_KEY_HERE
PORT=5000
```

Then:

```bash
npm run dev
```

### 2. Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The frontend runs on the Vite URL shown in the terminal, usually `http://localhost:5173`.

## API flow

```text
React
  ↓
GET /api/weather?city=Cairo
  ↓
Express
  ↓
WeatherAPI
  ↓
React
```

The API key stays on the server and is never placed in the React app.

## Demo mode

If the backend is unavailable, the frontend automatically shows a polished demo dataset so the UI can still be explored. Once the backend is running and the API key is configured, real weather data is used.

## Main files

```text
skyly-weather/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── ...
├── server/
│   ├── src/
│   │   └── server.js
│   ├── package.json
│   └── .env.example
└── README.md
```
