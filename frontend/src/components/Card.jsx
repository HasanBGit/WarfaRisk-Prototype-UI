export default function Card({ title, accent, badge, children, className = "" }) {
  const accentBorder =
    accent === "green"
      ? "border-l-4 border-l-emerald-500"
      : accent === "red"
      ? "border-l-4 border-l-rose-500"
      : accent === "gray"
      ? "border-l-4 border-l-gray-300"
      : "";

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white shadow-sm ${accentBorder} ${className}`}
    >
      <div className="px-4 py-3">
        {(title || badge) && (
          <div className="mb-2 flex items-center justify-between">
            {title && (
              <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
            )}
            {badge && (
              <span className="rounded border border-gray-300 px-2 py-0.5 text-xs font-medium text-gray-500">
                {badge}
              </span>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
