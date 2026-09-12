import { useEffect, useMemo, useState } from "react";
import homeBg from "./assets/home-bg.png";
import {
  MapPin,
  Droplets,
  Wind,
  Eye,
  Sun,
  Moon,
  CloudSun,
  ArrowLeft,
  Gauge,
  Navigation,
} from "lucide-react";
import SearchBar from "./components/SearchBar";

const API = "/api/weather";

function getWeatherType(condition, isDay) {
  const text = condition?.toLowerCase() || "";

  if (
    text.includes("thunder") ||
    text.includes("storm")
  ) {
    return "storm";
  }

  if (
    text.includes("rain") ||
    text.includes("drizzle") ||
    text.includes("shower")
  ) {
    return "rain";
  }

  if (
    text.includes("snow") ||
    text.includes("sleet") ||
    text.includes("ice")
  ) {
    return "snow";
  }

  if (
    text.includes("cloud") ||
    text.includes("overcast")
  ) {
    return "cloudy";
  }

  if (!isDay) {
    return "night";
  }

  return "sunny";
}

const themes = {
  sunny: {
    background:
      "linear-gradient(135deg, #79c9f2 0%, #bfe7f7 45%, #fff1c7 100%)",
    accent: "#f59e0b",
    icon: Sun,
    label: "Sunny",
  },

  cloudy: {
    background:
      "linear-gradient(135deg, #9db8c8 0%, #d8e2e8 50%, #eef3f5 100%)",
    accent: "#64748b",
    icon: CloudSun,
    label: "Cloudy",
  },

  rain: {
    background:
      "linear-gradient(135deg, #314e68 0%, #52738d 50%, #8baabd 100%)",
    accent: "#60a5fa",
    icon: Droplets,
    label: "Rainy",
  },

  storm: {
    background:
      "linear-gradient(135deg, #172033 0%, #303b59 50%, #59657b 100%)",
    accent: "#a78bfa",
    icon: Wind,
    label: "Storm",
  },

  snow: {
    background:
      "linear-gradient(135deg, #b9d8e8 0%, #e8f4f8 50%, #ffffff 100%)",
    accent: "#38bdf8",
    icon: CloudSun,
    label: "Snow",
  },

  night: {
    background:
      "linear-gradient(135deg, #101a3a 0%, #1e3261 50%, #4b5185 100%)",
    accent: "#c4b5fd",
    icon: Moon,
    label: "Clear Night",
  },
};

function WeatherBackground({ type,home,image }) {
  return (
    <div
      className={`weather-background weather-${type} ${
        home ? "home-background" : ""
      }`}
      style={
        home
          ? {backgroundImage: `url(${image})`,}
          : {}
          }
          >
      <div className="background-orb orb-one" />
      <div className="background-orb orb-two" />

      {type === "rain" && (
        <div className="rain-animation">
          {Array.from({ length: 35 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      )}

      {type === "snow" && (
        <div className="snow-animation">
          {Array.from({ length: 30 }).map((_, i) => (
            <span key={i}>•</span>
          ))}
        </div>
      )}

      {type === "sunny" && (
        <div className="sun-glow">
          <div className="sun-core" />
        </div>
      )}

      {type === "night" && (
        <div className="stars">
          {Array.from({ length: 35 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function LoadingScreen({ city }) {
  return (
    <div className="loading-screen">
      <div className="loading-ring">
        <div />
      </div>

      <h2>Checking the sky</h2>

      <p>
        Looking at the weather around{" "}
        <strong>{city}</strong>
      </p>

      <div className="loading-dots">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function WeatherCard({ weather, type }) {
  const theme = themes[type];
  const Icon = theme.icon;

  const current = weather.current;
  const location = weather.location;

  const forecast =
    weather.forecast?.forecastday?.[0]?.hour || [];

  const currentHour = new Date(location.localtime).getHours();

  const nextHours = forecast
    .filter((hour) => {
      const hourTime = new Date(hour.time).getHours();
      return hourTime >= currentHour;
    })
    .slice(0, 5);

  return (
    <div className="weather-result">
      <div className="location-line">
        <MapPin size={18} />

        <div>
          <h2>{location.name}</h2>
          <p>
            {`location.region
              ? ${location.region}, 
              : ""`}
            {location.country}
          </p>
        </div>
      </div>
      <div className="main-weather">
        <div className="weather-icon-large">
          <img
            src={`https:${current.condition.icon}`}
            alt={current.condition.text}
          />
        </div>

        <div className="temperature">
          <span>{Math.round(current.temp_c)}</span>
          <small>°C</small>
        </div>

        <div className="condition">
          <div className="condition-title">
            <Icon size={20} />
            {current.condition.text}
          </div>

          <p>
            Feels like {Math.round(current.feelslike_c)}°C
          </p>
        </div>
      </div>

      <div className="weather-stats">
        <div>
          <Droplets />
          <span>Humidity</span>
          <strong>{current.humidity}%</strong>
        </div>

        <div>
          <Wind />
          <span>Wind</span>
          <strong>{Math.round(current.wind_kph)} km/h</strong>
        </div>

        <div>
          <Gauge />
          <span>Pressure</span>
          <strong>{Math.round(current.pressure_mb)} mb</strong>
        </div>

        <div>
          <Eye />
          <span>Visibility</span>
          <strong>{current.vis_km} km</strong>
        </div>

        <div>
          <Sun />
          <span>UV Index</span>
          <strong>{current.uv}</strong>
        </div>
      </div>

      <div className="forecast-card">
        <div className="forecast-heading">
          <div>
            <p>Today's forecast</p>
            <h3>How the sky changes</h3>
          </div>

          <Navigation size={18} />
        </div>

        <div className="hourly-row">
          {nextHours.map((hour) => (
            <div className="hour" key={hour.time}>
              <span>
                {new Date(hour.time).toLocaleTimeString([], {
                  hour: "numeric",
                })}
              </span>

              <img
                src={`https:${hour.condition.icon}`}
                alt=""
              />

              <strong>
                {Math.round(hour.temp_c)}°
              </strong>
            </div>
          ))}
        </div>
      </div>

      <div className="seven-days">
        <div>
          <span>Next 7 days</span>
          <small>
            Full forecast for {location.name}
          </small>
        </div>

        <div className="arrow-button">
          →
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchingLocation, setSearchingLocation] =
    useState("");
  const [error, setError] = useState("");

  async function searchWeather(city) {
    setLoading(true);
    setError("");
    setSearchingLocation(city);

    try {
      const response = await fetch(
       `${API}?city=${encodeURIComponent(city)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Location not found."
        );
      }

      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(
        err.message ||
          "We couldn't find this location."
      );
    } finally {
      setLoading(false);
    }
  }

  const weatherType = useMemo(() => {
    if (!weather) return "sunny";

    return getWeatherType(
      weather.current.condition.text,
      weather.current.is_day === 1
    );
  }, [weather]);

  const theme = themes[weatherType];

  useEffect(() => {
    document.body.style.background =
      theme.background;

    return () => {
      document.body.style.background = "";
    };
  }, [theme]);

  return (
    <main
      className={`app weather-page ${weather ? "has-weather" : "search-page"
        }`}
      style={{
        "--weather-accent": theme.accent,
        "--weather-bg": theme.background,
      }}
    >
      <WeatherBackground
      type={weatherType}
      home={!weather && !loading}
      image={homeBg}
    />

      <div className="content">
   {/* HEADER */}
        <header className="top-header">
          <div className="brand">
            <div className="brand-icon">
              <CloudSun size={24} />
            </div>

            <div>
              <h1>Skyly</h1>
              <span>Weather, reimagined.</span>
            </div>
          </div>

          {weather && (
            <button
              className="back-button"
              onClick={() => {
                setWeather(null);
                setError("");
              }}
            >
              <ArrowLeft size={18} />
              New search
            </button>
          )}
        </header>

        {/* FIRST SCREEN */}
        {!weather && !loading && (
          <section className="hero-search">

            <div className="hero-icon">
              <CloudSun size={46} />
            </div>

            <span className="eyebrow">
              WEATHER EXPLORER
            </span>

            <h2>
              Discover the sky
              <br />
              <span>anywhere in the world.</span>
            </h2>

            <p>
              Enter a city or country and let Skyly
              create a weather experience for you.
            </p>

            <SearchBar
              onSearch={searchWeather}
              loading={loading}
            />

            {error && (
              <div className="error-box">
                <span>!</span>
                <div>
                  <strong>We couldn't find that place.</strong>
                  <p>{error}</p>
                </div>
              </div>
            )}

            <div className="popular">
              <span>Try somewhere</span>

              <div>
                {[
                  "Cairo",
                  "London",
                  "Paris",
                  "Dubai",
                  "Tokyo",
                  "New York",
                ].map((city) => (
                  <button
                    key={city}
                    onClick={() => searchWeather(city)}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

          </section>
        )}

        {/* LOADING */}
        {loading && (
          <LoadingScreen city={searchingLocation} />
        )}

        {/* WEATHER RESULT */}
        {weather && !loading && (
          <WeatherCard
            weather={weather}
            type={weatherType}
          />
        )}

      </div>
    </main>
  );
}