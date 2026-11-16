import { useState, useCallback } from "react";
import { PATIENT_INPUT_DEFAULTS } from "../mocks/mockData.js";
import { predictDose, fetchExplanation } from "../api/client.js";
import { WizardContext } from "./wizardContext.js";

const EMPTY_INPUT = {
  ...PATIENT_INPUT_DEFAULTS,
  cyp2c9: "",
  vkorc1: "",
};

export function WizardProvider({ children }) {
  const [patientInput, setPatientInput] = useState(EMPTY_INPUT);
  const [doseResult, setDoseResult] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [step1Complete, setStep1Complete] = useState(false);
  const [step2Complete, setStep2Complete] = useState(false);

  const hasGenotype = Boolean(patientInput.cyp2c9 && patientInput.vkorc1);

  const submitPatientInput = useCallback(async (input) => {
    setPatientInput(input);
    const genotype = Boolean(input.cyp2c9 && input.vkorc1);
    const result = await predictDose(input, genotype);
    setDoseResult(result);
    setStep1Complete(true);
  }, []);

  const loadExplanation = useCallback(async () => {
    const result = await fetchExplanation(patientInput, hasGenotype);
    setExplanation(result);
    setStep2Complete(true);
  }, [patientInput, hasGenotype]);

  const resetWizard = useCallback(() => {
    setPatientInput(EMPTY_INPUT);
    setDoseResult(null);
    setExplanation(null);
    setStep1Complete(false);
    setStep2Complete(false);
  }, []);

  const value = {
    patientInput,
    doseResult,
    explanation,
    hasGenotype,
    step1Complete,
    step2Complete,
    submitPatientInput,
    loadExplanation,
    resetWizard,
  };

  return (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  );
}
