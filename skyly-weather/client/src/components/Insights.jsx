import { ArrowUpRight, Droplets, Umbrella, SunMedium, Thermometer } from "lucide-react";

function Insight({ icon: Icon, title, text }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sky-400/10 text-sky-300">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <p className="mt-1 text-xs leading-5 text-slate-400">{text}</p>
      </div>
    </div>
  );
}

export default function Insights({ current, forecast, unit, display }) {
  const today = forecast.forecastday[0];
  const max = display(today.day.maxtemp_c);
  const min = display(today.day.mintemp_c);
  const feel = display(current.feelslike_c);
  const rain = today.day.daily_chance_of_rain ?? 0;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-5">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Insights</p>
        <h2 className="mt-1 text-xl font-semibold">How will today feel?</h2>
      </div>

      <div className="mb-4 rounded-2xl bg-gradient-to-r from-sky-400/10 to-violet-400/10 p-4">
        <p className="text-sm leading-6 text-slate-300">
          Expect a high of <strong className="text-white">{max}°</strong> and a low of{" "}
          <strong className="text-white">{min}°</strong>. It currently feels like{" "}
          <strong className="text-white">{feel}°</strong>, with a{" "}
          <strong className="text-white">{rain}%</strong> chance of rain.
        </p>
      </div>

      <div className="grid gap-3">
        <Insight
          icon={Thermometer}
          title="Temperature"
          text={max - min >= 9 ? "There is a noticeable temperature swing today. Layers can help as the day changes." : "Temperatures stay fairly steady through the day."}
        />
        <Insight
          icon={Umbrella}
          title="Rain plan"
          text={rain >= 50 ? "Rain is likely. Consider carrying an umbrella." : "Rain chances are low, so outdoor plans look comfortable."}
        />
        <Insight
          icon={SunMedium}
          title="UV & daylight"
          text={`UV is currently ${current.uv}. Around midday, sunlight may feel stronger, so take breaks from direct sun.`}
        />
        <Insight
          icon={Droplets}
          title="Air feel"
          text={`Humidity is ${current.humidity}%, with visibility around ${current.vis_km} km.`}
        />
      </div>
    </div>
  );
}
