import { Plus, MapPin, X } from "lucide-react";

export default function SavedLocations({ locations, active, onSelect, onAdd, onRemove }) {
  return (
    <aside className="hidden w-56 shrink-0 lg:block">
      <div className="sticky top-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-600">Personal</p>
            <h3 className="mt-1 font-semibold">My places</h3>
          </div>
          <button onClick={onAdd} className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-400 hover:text-white">
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-2">
          {locations.map((location) => (
            <div
              key={location}
              className={`group flex items-center gap-2 rounded-2xl border p-3 transition ${
                active.toLowerCase() === location.toLowerCase()
                  ? "border-sky-400/20 bg-sky-400/10"
                  : "border-white/5 bg-white/[0.02] hover:bg-white/[0.05]"
              }`}
            >
              <button onClick={() => onSelect(location)} className="flex min-w-0 flex-1 items-center gap-3 text-left">
                <MapPin className={`h-4 w-4 shrink-0 ${active.toLowerCase() === location.toLowerCase() ? "text-sky-300" : "text-slate-600"}`} />
                <span className="truncate text-sm">{location}</span>
              </button>
              <button onClick={() => onRemove(location)} aria-label={`Remove ${location}`} className="opacity-0 transition group-hover:opacity-100">
                <X className="h-3.5 w-3.5 text-slate-500 hover:text-white" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
