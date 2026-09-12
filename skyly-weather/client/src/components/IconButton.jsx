export default function IconButton({ children, label, onClick, active = false }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`grid h-10 w-10 place-items-center rounded-xl border transition ${
        active
          ? "border-sky-400/40 bg-sky-400/15 text-sky-300"
          : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
