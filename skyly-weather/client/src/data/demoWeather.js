export const demoWeather = {
  location: {
    name: "Cairo",
    region: "Cairo",
    country: "Egypt",
    localtime: "2026-09-12 07:18"
  },
  current: {
    temp_c: 31,
    temp_f: 87.8,
    feelslike_c: 33,
    humidity: 43,
    wind_kph: 13,
    wind_dir: "NE",
    uv: 6,
    vis_km: 10,
    pressure_mb: 1010,
    precip_mm: 0,
    condition: { text: "Sunny", code: 1000, icon: "" },
    is_day: 1
  },
  forecast: {
    forecastday: [
      {
        date: "2026-09-12",
        day: { maxtemp_c: 34, mintemp_c: 24, daily_chance_of_rain: 8, condition: { text: "Sunny", code: 1000, icon: "" } },
        astro: { sunrise: "05:38 AM", sunset: "06:07 PM" },
        hour: [
          { time: "2026-09-12 08:00", temp_c: 28, chance_of_rain: 4, humidity: 48, wind_kph: 8, uv: 2, condition: { text: "Sunny", code: 1000, icon: "" } },
          { time: "2026-09-12 09:00", temp_c: 29, chance_of_rain: 3, humidity: 45, wind_kph: 9, uv: 3, condition: { text: "Sunny", code: 1000, icon: "" } },
          { time: "2026-09-12 10:00", temp_c: 30, chance_of_rain: 3, humidity: 43, wind_kph: 10, uv: 5, condition: { text: "Sunny", code: 1000, icon: "" } },
          { time: "2026-09-12 11:00", temp_c: 31, chance_of_rain: 4, humidity: 41, wind_kph: 11, uv: 6, condition: { text: "Sunny", code: 1000, icon: "" } },
          { time: "2026-09-12 12:00", temp_c: 32, chance_of_rain: 5, humidity: 40, wind_kph: 12, uv: 7, condition: { text: "Partly cloudy", code: 1003, icon: "" } },
          { time: "2026-09-12 13:00", temp_c: 33, chance_of_rain: 6, humidity: 39, wind_kph: 13, uv: 8, condition: { text: "Partly cloudy", code: 1003, icon: "" } },
          { time: "2026-09-12 14:00", temp_c: 34, chance_of_rain: 7, humidity: 38, wind_kph: 14, uv: 8, condition: { text: "Sunny", code: 1000, icon: "" } },
          { time: "2026-09-12 15:00", temp_c: 34, chance_of_rain: 8, humidity: 38, wind_kph: 14, uv: 7, condition: { text: "Sunny", code: 1000, icon: "" } },
          { time: "2026-09-12 16:00", temp_c: 33, chance_of_rain: 8, humidity: 39, wind_kph: 13, uv: 6, condition: { text: "Sunny", code: 1000, icon: "" } },
          { time: "2026-09-12 17:00", temp_c: 32, chance_of_rain: 7, humidity: 41, wind_kph: 12, uv: 5, condition: { text: "Sunny", code: 1000, icon: "" } },
          { time: "2026-09-12 18:00", temp_c: 30, chance_of_rain: 5, humidity: 45, wind_kph: 10, uv: 2, condition: { text: "Clear", code: 1000, icon: "" } },
          { time: "2026-09-12 19:00", temp_c: 29, chance_of_rain: 4, humidity: 48, wind_kph: 9, uv: 0, condition: { text: "Clear", code: 1000, icon: "" } }
        ]
      },
      {
        date: "2026-09-13",
        day: { maxtemp_c: 33, mintemp_c: 24, daily_chance_of_rain: 10, condition: { text: "Partly cloudy", code: 1003, icon: "" } },
        astro: { sunrise: "05:39 AM", sunset: "06:06 PM" },
        hour: []
      },
      {
        date: "2026-09-14",
        day: { maxtemp_c: 31, mintemp_c: 23, daily_chance_of_rain: 22, condition: { text: "Cloudy", code: 1006, icon: "" } },
        astro: { sunrise: "05:39 AM", sunset: "06:05 PM" },
        hour: []
      },
      {
        date: "2026-09-15",
        day: { maxtemp_c: 28, mintemp_c: 22, daily_chance_of_rain: 62, condition: { text: "Light rain", code: 1183, icon: "" } },
        astro: { sunrise: "05:40 AM", sunset: "06:04 PM" },
        hour: []
      },
      {
        date: "2026-09-16",
        day: { maxtemp_c: 30, mintemp_c: 23, daily_chance_of_rain: 38, condition: { text: "Patchy rain nearby", code: 1063, icon: "" } },
        astro: { sunrise: "05:40 AM", sunset: "06:03 PM" },
        hour: []
      },
      {
        date: "2026-09-17",
        day: { maxtemp_c: 32, mintemp_c: 24, daily_chance_of_rain: 12, condition: { text: "Sunny", code: 1000, icon: "" } },
        astro: { sunrise: "05:41 AM", sunset: "06:02 PM" },
        hour: []
      }
    ]
  }
};
