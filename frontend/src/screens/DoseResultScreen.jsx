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
import Card from "../components/Card.jsx";
import WizardFooterNav from "../components/WizardFooterNav.jsx";

export default function DoseResultScreen() {
  const navigate = useNavigate();
  const { patientInput, doseResult, hasGenotype } = useWizard();

  if (!doseResult) return null;

  return (
    <div className="space-y-4">
      <PatientSummaryStrip patientInput={patientInput} hasGenotype={hasGenotype} />

      {!hasGenotype && (
        <Card accent="gray">
          <p className="text-xs text-gray-600">
            No CYP2C9 or VKORC1 genotype was entered, so the prediction uses
            the clinical-only model without pharmacogenomic information.
          </p>
        </Card>
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
          <Card>
            <label className="flex items-center gap-2 text-xs text-gray-600">
              <input type="checkbox" checked readOnly className="h-3.5 w-3.5 rounded border-gray-300 text-gray-900" />
              FHIR R4 ready: the MedicationRequest includes the dose and interval
            </label>
          </Card>
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
