import { weatherEmoji, formatDay, displayTemp } from "../utils/weather";

export default function WeeklyForecast({ days, unit }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-5">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Outlook</p>
          <h2 className="mt-1 text-xl font-semibold">The next few days</h2>
        </div>
        <span className="text-xs text-slate-500">6 day view</span>
      </div>

      <div className="divide-y divide-white/5">
        {days.slice(0, 6).map((day, index) => {
          const max = displayTemp(day.day.maxtemp_c, unit);
          const min = displayTemp(day.day.mintemp_c, unit);
          return (
            <div key={day.date} className="grid grid-cols-[70px_42px_1fr_auto] items-center gap-3 py-3 first:pt-1 last:pb-1">
              <span className="text-sm text-slate-300">{formatDay(day.date, index)}</span>
              <span className="text-xl">{weatherEmoji(day.day.condition?.text, 1)}</span>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-300 via-cyan-300 to-amber-300"
                  style={{ width: `${Math.max(15, Math.min(100, ((max - min) / 18) * 100))}%` }}
                />
              </div>
              <span className="min-w-[78px] text-right text-sm font-semibold">{max}° <span className="text-slate-500">/ {min}°</span></span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
