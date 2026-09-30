const AXIS_MAX = 1.0;

export default function ShapTornadoChart({ attributions }) {
  return (
    <div>
      <div className="space-y-2">
        {attributions.map((row) => {
          const isPositive = row.value >= 0;
          const widthPct = (Math.abs(row.value) / AXIS_MAX) * 50;
          return (
            <div key={row.feature} className="flex items-center gap-2">
              <span className="w-40 shrink-0 text-right text-xs text-gray-600">
                {row.feature}
              </span>
              <div className="relative h-4 flex-1 bg-gray-50">
                <div className="absolute inset-y-0 left-1/2 w-px bg-gray-300" />
                <div
                  className={`absolute inset-y-0 ${isPositive ? "bg-rose-500" : "bg-blue-500"}`}
                  style={
                    isPositive
                      ? { left: "50%", width: `${widthPct}%` }
                      : { right: "50%", width: `${widthPct}%` }
                  }
                />
              </div>
              <span
                className={`w-14 shrink-0 text-xs font-medium ${
                  isPositive ? "text-rose-600" : "text-blue-600"
                }`}
              >
                {isPositive ? "+" : ""}
                {row.value.toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>
      <div className="ml-[168px] mt-2 flex items-center justify-between text-[10px] text-gray-400">
        <span>&minus;1.00</span>
        <span>&minus;0.50</span>
        <span>0</span>
        <span>+0.50</span>
        <span>+1.00</span>
      </div>
      <p className="mt-2 text-center text-[10px] italic text-gray-500">
        SHAP value (mg/week contribution to prediction) ·{" "}
        <span className="text-rose-600">■ increases dose</span>{" "}
        <span className="text-blue-600">■ decreases dose</span>
      </p>
    </div>
  );
}
