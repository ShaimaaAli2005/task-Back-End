export function weatherEmoji(text = "", isDay = 1) {
  const t = text.toLowerCase();

  if (!isDay && (t.includes("clear") || t.includes("sunny"))) return "🌙";
  if (t.includes("thunder")) return "⛈️";
  if (t.includes("snow") || t.includes("sleet") || t.includes("ice")) return "❄️";
  if (t.includes("rain") || t.includes("drizzle")) return "🌧️";
  if (t.includes("cloud")) return t.includes("partly") ? "🌤️" : "☁️";
  if (t.includes("mist") || t.includes("fog")) return "🌫️";
  return isDay ? "☀️" : "🌙";
}

export function weatherMood(text = "", isDay = 1) {
  const t = text.toLowerCase();

  if (!isDay) return {
    label: "Quiet night",
    description: "The city is winding down under a calm night sky.",
    glow: "from-indigo-500/20 via-slate-950 to-violet-500/10"
  };
  if (t.includes("thunder")) return {
    label: "Storm watch",
    description: "A dramatic sky is moving in. Keep an eye on the forecast.",
    glow: "from-violet-500/25 via-slate-950 to-cyan-500/10"
  };
  if (t.includes("rain") || t.includes("drizzle")) return {
    label: "Rainy rhythm",
    description: "A wet day ahead. An umbrella might be a good idea.",
    glow: "from-cyan-500/20 via-slate-950 to-blue-500/10"
  };
  if (t.includes("snow") || t.includes("sleet")) return {
    label: "Winter air",
    description: "Cold conditions are shaping the day.",
    glow: "from-sky-300/20 via-slate-950 to-blue-500/10"
  };
  if (t.includes("cloud")) return {
    label: "Soft skies",
    description: "Clouds are taking the spotlight, with comfortable light.",
    glow: "from-slate-300/15 via-slate-950 to-sky-500/10"
  };
  return {
    label: "Bright day",
    description: "Clear skies are setting the mood for the day.",
    glow: "from-amber-400/20 via-slate-950 to-sky-500/10"
  };
}

export function formatHour(dateString) {
  const date = new Date(dateString.replace(" ", "T"));
  return date.toLocaleTimeString([], { hour: "numeric" });
}

export function formatDay(dateString, index) {
  if (index === 0) return "Today";
  const date = new Date(`${dateString}T12:00:00`);
  return date.toLocaleDateString([], { weekday: "short" });
}

export function kmToMiles(km) {
  return km * 0.621371;
}

export function cToF(c) {
  return c * 9 / 5 + 32;
}

export function displayTemp(c, unit) {
  return Math.round(unit === "C" ? c : cToF(c));
}
