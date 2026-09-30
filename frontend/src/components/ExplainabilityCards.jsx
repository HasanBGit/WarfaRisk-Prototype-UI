import Card from "./Card.jsx";

export function PharmacogenomicSummaryCard({ summary }) {
  return (
    <Card title="Pharmacogenomic Summary">
      <div className="flex h-7 w-full overflow-hidden text-xs font-medium">
        <div
          className="flex items-center justify-center bg-gray-800 text-white"
          style={{ width: `${summary.geneticPct}%` }}
        >
          {summary.geneticPct}% Genetic
        </div>
        <div
          className="flex items-center justify-center bg-gray-300 text-gray-700"
          style={{ width: `${summary.clinicalPct}%` }}
        >
          {summary.clinicalPct}% Clin.
        </div>
      </div>
      <p className="mt-2 text-xs text-gray-600">
        Genetic features: {summary.geneticPct}% of total attribution · Clinical
        features: {summary.clinicalPct}%.
      </p>
      <p className="mt-1 text-xs text-gray-400">{summary.note}</p>
    </Card>
  );
}

export function EvidenceLinksCard({ links }) {
  return (
    <Card title="Evidence Links">
      <ul className="space-y-1.5 text-xs">
        {links.map((l) => (
          <li key={l.label}>
            <span className="font-medium text-gray-700">{l.label}:</span>{" "}
            <span className="font-semibold text-gray-800 underline underline-offset-2">
              {l.source}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function RagExplanationCard({ rag }) {
  return (
    <Card title="RAG Explanation (Phase 9)">
      <p className="text-xs text-gray-600">{rag.text}</p>
    </Card>
  );
}

export function PortabilityNoteCard({ note }) {
  if (!note) return null;
  return (
    <Card accent="red" title="Portability note">
      <p className="text-xs text-gray-600">
        🚩 This subgroup showed a +{note.stackingPenalty.toFixed(2)} mg/week
        penalty when excluded from training (Phase 4). Calibration itself is
        nominal ({note.calibrationCoverage.toFixed(1)}% coverage) for this
        subgroup.
      </p>
    </Card>
  );
}
