import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWizard } from "../context/WizardContext.jsx";
import { NumberField, SelectField, CheckboxField, SectionHeader } from "../components/FormField.jsx";
import {
  PATIENT_INPUT_DEFAULTS,
  INDICATION_OPTIONS,
  ANCESTRY_OPTIONS,
  CYP2C9_OPTIONS,
  VKORC1_OPTIONS,
} from "../mocks/mockData.js";

export default function PatientInputScreen() {
  const navigate = useNavigate();
  const { submitPatientInput } = useWizard();
  const [form, setForm] = useState({ ...PATIENT_INPUT_DEFAULTS });
  const [submitting, setSubmitting] = useState(false);

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  async function handlePredict() {
    setSubmitting(true);
    try {
      await submitPatientInput(form);
      navigate("/dose-result");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <section>
        <SectionHeader>Clinical Parameters</SectionHeader>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberField label="Age" unit="years" value={form.age} onChange={set("age")} min={18} max={100} />
          <NumberField label="Weight" unit="kg" value={form.weight} onChange={set("weight")} min={30} max={200} />
          <NumberField label="Height" unit="cm" value={form.height} onChange={set("height")} min={100} max={230} />
          <NumberField
            label="Target INR"
            value={form.targetInr}
            onChange={set("targetInr")}
            step={0.1}
            helper="2.0–3.0"
          />
          <SelectField label="Indication" value={form.indication} onChange={set("indication")} options={INDICATION_OPTIONS} />
          <SelectField label="Race / Ancestry" value={form.ancestry} onChange={set("ancestry")} options={ANCESTRY_OPTIONS} />
        </div>
      </section>

      <section>
        <SectionHeader>Comedications</SectionHeader>
        <div className="flex flex-wrap gap-6">
          <CheckboxField label="Amiodarone" checked={form.amiodarone} onChange={set("amiodarone")} />
          <CheckboxField label="Statin use" checked={form.statin} onChange={set("statin")} />
          <CheckboxField label="Enzyme inducer" checked={form.enzymeInducer} onChange={set("enzymeInducer")} />
        </div>
      </section>

      <section>
        <SectionHeader note="optional, falls back to the clinical-only model if absent">
          Genetic Inputs
        </SectionHeader>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SelectField
            label="CYP2C9 genotype"
            value={form.cyp2c9}
            onChange={set("cyp2c9")}
            options={CYP2C9_OPTIONS}
            placeholder="Not entered"
          />
          <SelectField
            label="VKORC1 1639G>A"
            value={form.vkorc1}
            onChange={set("vkorc1")}
            options={VKORC1_OPTIONS}
            placeholder="Not entered"
          />
        </div>
      </section>

      <div className="flex flex-col items-center gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:justify-between">
        <div className="rounded-md border border-dashed border-gray-300 bg-gray-50 px-3 py-2 text-xs text-gray-500">
          ⚠ All transformers fit on training fold only. No test-set information
          used in preprocessing.
        </div>
        <button
          type="button"
          onClick={handlePredict}
          disabled={submitting}
          className="rounded-md bg-gray-900 px-5 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {submitting ? "Predicting…" : "▶ Predict Dose"}
        </button>
      </div>
    </div>
  );
}
