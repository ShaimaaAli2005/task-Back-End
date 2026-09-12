import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { formatHour, displayTemp, weatherEmoji } from "../utils/weather";

export default function HourlyChart({ hours, unit }) {
  const data = hours.map((h) => ({
    label: formatHour(h.time),
    temp: displayTemp(h.temp_c, unit),
    rain: h.chance_of_rain,
    icon: weatherEmoji(h.condition?.text, 1)
  }));

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-5">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Today</p>
          <h2 className="mt-1 text-xl font-semibold">Temperature journey</h2>
        </div>
        <span className="text-xs text-slate-500">Next hours</span>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 5, left: -22, bottom: 0 }}>
            <defs>
              <linearGradient id="skylyTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="label" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
            <Tooltip
              cursor={{ stroke: "rgba(148,163,184,.18)" }}
              contentStyle={{
                background: "#0f172a",
                border: "1px solid rgba(148,163,184,.18)",
                borderRadius: 14,
                color: "#fff"
              }}
              formatter={(value) => [`${value}°`, "Temperature"]}
            />
            <Area type="monotone" dataKey="temp" stroke="#38bdf8" strokeWidth={3} fill="url(#skylyTemp)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex overflow-x-auto border-t border-white/5 pt-3 scrollbar-hide">
        {data.map((item) => (
          <div key={item.label} className="min-w-[72px] flex-1 text-center">
            <div className="text-lg">{item.icon}</div>
            <div className="mt-1 text-sm font-semibold">{item.temp}°</div>
            <div className="mt-1 text-[10px] text-slate-500">{item.rain}% rain</div>
          </div>
        ))}
      </div>
    </div>
  );
}
