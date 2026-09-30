import Card from "./Card.jsx";

export function DoseCard({ result }) {
  return (
    <Card>
      <div className="text-center">
        <p className="text-sm text-gray-500">Predicted Stable Weekly Dose</p>
        <p className="mt-2 text-5xl font-bold text-gray-900">
          {result.dose.weekly.toFixed(1)}
        </p>
        <p className="text-sm text-gray-500">mg / week</p>
        <p className="mt-2 text-xs text-gray-500">
          ≈ {result.dose.daily.toFixed(1)} mg/day · {result.model} ·{" "}
          <span className="font-semibold text-gray-700">
            {result.featureSet === "combined" ? "Combined features" : "Clinical-only features"}
          </span>
        </p>
      </div>
    </Card>
  );
}

export function IntervalCard({ result }) {
  const { low, high, confidence, calibrated } = result.interval;
  const pct = (v) => ((v - low) / (high - low)) * 100;
  return (
    <Card>
      <div className="text-center">
        <p className="text-sm text-gray-500">
          {calibrated
            ? `${confidence}% Conformal Prediction Interval`
            : "Illustrative Dose Interval (not conformally calibrated)"}
        </p>
        <p className="mt-1 text-xl font-bold text-gray-900">
          {low.toFixed(1)} to {high.toFixed(1)} mg/week
        </p>
      </div>
      <div className={`relative mt-3 h-2 w-full rounded-full ${calibrated ? "bg-green-200" : "bg-gray-200"}`}>
        <div
          className="absolute top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rotate-45 bg-gray-900"
          style={{ left: `${pct(result.dose.weekly)}%` }}
        />
      </div>
      <div className="mt-1 flex justify-between text-xs text-gray-400">
        <span>{low.toFixed(1)}</span>
        <span>{result.dose.weekly.toFixed(1)}</span>
        <span>{high.toFixed(1)}</span>
      </div>
      <p className="mt-2 text-center text-xs italic text-gray-400">
        {calibrated
          ? "Combined model. Subgroup coverage is reported at right."
          : "No conformal calibration was run for the clinical-only model. This range is illustrative and carries no coverage claim."}
      </p>
    </Card>
  );
}

export function MetricTilesRow({ metrics }) {
  if (!metrics) return null;
  const tiles = [
    { label: "MAE", value: `${metrics.mae.toFixed(2)} mg/week` },
    { label: "R²", value: metrics.r2.toFixed(3), sub: "variance expl." },
    { label: "PW20", value: metrics.pw20.toFixed(3), sub: "within 20%" },
  ];
  return (
    <div className="grid grid-cols-3 gap-3">
      {tiles.map((t) => (
        <div key={t.label} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-center shadow-sm">
          <p className="text-xs font-medium text-gray-400">{t.label}</p>
          <p className="text-base font-semibold text-gray-900">{t.value}</p>
          {t.sub && <p className="text-[10px] text-gray-400">{t.sub}</p>}
        </div>
      ))}
    </div>
  );
}

export function DataTrainingSummaryCard({ trainingSummary }) {
  const rows = [
    ["Dataset", `${trainingSummary.dataset} (n=${trainingSummary.n.toLocaleString()} patients)`],
    ["Split", trainingSummary.split],
    ["Pipeline", trainingSummary.pipeline],
    ["Feature set", trainingSummary.featureSetLabel],
  ];
  return (
    <Card>
      <p className="mb-3 text-center text-sm font-bold text-gray-900">
        Data &amp; Training Summary
      </p>
      <dl className="space-y-1.5 text-xs">
        {rows.map(([k, v]) => (
          <div key={k} className="flex gap-4">
            <dt className="w-16 shrink-0 text-gray-400">{k}</dt>
            <dd className="text-gray-700">{v}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

export function CalibrationNoticeCard({ calibration }) {
  if (!calibration.available) {
    return (
      <Card accent="gray" title="Calibration Notice" badge="N/A">
        <p className="text-xs text-gray-500">
          Not available for the clinical-only model.
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Subgroup calibration (coverage per ancestry group) has only been
          computed for the combined (clinical + genetic) model.
        </p>
        <p className="mt-1 text-xs italic text-gray-400">
          No coverage figure is shown because none has been measured for this
          feature set.
        </p>
      </Card>
    );
  }
  return (
    <Card accent="green" title="Calibration Notice">
      <p className="text-sm text-gray-800">
        {calibration.subgroup} subgroup coverage: {calibration.coverage.toFixed(1)}%
      </p>
      <p className="text-xs text-gray-500">
        Target: {calibration.target}% ({calibration.met ? "met" : "not met"})
      </p>
      <p className="mt-1 text-xs italic text-gray-400">
        Coverage meets the target for this subgroup and is reported per ancestry subgroup as well as overall.
      </p>
    </Card>
  );
}

export function PortabilityFlagCard({ portability }) {
  if (!portability.available) {
    return (
      <Card accent="gray" title="Portability Flag" badge="N/A">
        <p className="text-xs text-gray-500">
          Not available for the clinical-only model.
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Ancestry-exclusion (portability) analysis was run only for the
          combined model.
        </p>
      </Card>
    );
  }
  return (
    <Card accent="red" title="Portability Flag">
      <p className="text-sm text-gray-800">
        {portability.subgroup}: MAE rises by {portability.stackingPenalty.toFixed(2)} mg/week
        when this ancestry group is excluded from training (stacking ensemble).
      </p>
      <p className="mt-1 text-xs italic text-gray-400">
        CatBoost independently shows a rise of {portability.catboostPenalty.toFixed(2)} mg/week in the same direction.
      </p>
    </Card>
  );
}
