import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWizard } from "../context/WizardContext.jsx";
import { PatientSummaryStrip } from "../components/PatientSummaryStrip.jsx";
import Card from "../components/Card.jsx";
import ShapTornadoChart from "../components/ShapTornadoChart.jsx";
import {
  PharmacogenomicSummaryCard,
  EvidenceLinksCard,
  RagExplanationCard,
  PortabilityNoteCard,
} from "../components/ExplainabilityCards.jsx";
import WizardFooterNav from "../components/WizardFooterNav.jsx";

export default function ExplainabilityScreen() {
  const navigate = useNavigate();
  const { patientInput, doseResult, hasGenotype, explanation, loadExplanation, resetWizard } = useWizard();

  useEffect(() => {
    if (!explanation) {
      loadExplanation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!doseResult || !explanation) return null;

  function handleNewPatient() {
    resetWizard();
    navigate("/patient-input");
  }

  return (
    <div className="space-y-4">
      <PatientSummaryStrip
        patientInput={patientInput}
        hasGenotype={hasGenotype}
        condensed
        predictedDose={doseResult.dose.weekly}
        model={`${doseResult.model}, ${doseResult.featureSet === "combined" ? "Combined features" : "Clinical-only features"}`}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card title={`Feature Attribution (SHAP) · ${doseResult.model} · ${doseResult.featureSet === "combined" ? "Combined features" : "Clinical-only features"}`}>
            <ShapTornadoChart attributions={explanation.shapAttributions} />
          </Card>
        </div>
        <div className="space-y-4">
          <PharmacogenomicSummaryCard summary={explanation.pharmacogenomicSummary} />
          <EvidenceLinksCard links={explanation.evidenceLinks} />
          <RagExplanationCard rag={explanation.ragExplanation} />
          <PortabilityNoteCard note={explanation.portabilityNote} />
        </div>
      </div>

      <WizardFooterNav
        onBack={() => navigate("/dose-result")}
        onNext={handleNewPatient}
        nextLabel="✓ New Patient"
      />
    </div>
  );
}
