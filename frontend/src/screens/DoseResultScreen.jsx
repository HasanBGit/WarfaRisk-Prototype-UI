import { useNavigate } from "react-router-dom";
import { useWizard } from "../context/WizardContext.jsx";
import { PatientSummaryStrip } from "../components/PatientSummaryStrip.jsx";
import {
  DoseCard,
  IntervalCard,
  MetricTilesRow,
  DataTrainingSummaryCard,
  CalibrationNoticeCard,
  PortabilityFlagCard,
} from "../components/DoseResultCards.jsx";
import WizardFooterNav from "../components/WizardFooterNav.jsx";

export default function DoseResultScreen() {
  const navigate = useNavigate();
  const { patientInput, doseResult, hasGenotype } = useWizard();

  if (!doseResult) return null;

  return (
    <div className="space-y-4">
      <PatientSummaryStrip patientInput={patientInput} hasGenotype={hasGenotype} />

      {!hasGenotype && (
        <div className="rounded-md border border-gray-300 border-l-4 border-l-gray-500 bg-gray-50 px-4 py-2.5 text-xs text-gray-700">
          ⓘ <span className="font-semibold">Pharmacogenomic information not incorporated.</span>{" "}
          Clinical-only model in use (no CYP2C9 / VKORC1 genotype entered).
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <DoseCard result={doseResult} />
          <IntervalCard result={doseResult} />
          <MetricTilesRow metrics={doseResult.metrics} />
          <DataTrainingSummaryCard trainingSummary={doseResult.trainingSummary} />
        </div>
        <div className="space-y-4">
          <CalibrationNoticeCard calibration={doseResult.calibration} />
          <PortabilityFlagCard portability={doseResult.portability} />
          <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-medium text-emerald-800">
            ✓ FHIR R4 ready, MedicationRequest populated with dose and interval
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex-1 rounded-md bg-gray-900 px-3 py-2 text-xs font-semibold text-white hover:bg-gray-800"
            >
              Export FHIR R4
            </button>
            <button
              type="button"
              className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
            >
              Print Summary
            </button>
          </div>
        </div>
      </div>

      <WizardFooterNav
        onBack={() => navigate("/patient-input")}
        onNext={() => navigate("/explainability")}
        nextLabel="Explain ▶"
      />
    </div>
  );
}
