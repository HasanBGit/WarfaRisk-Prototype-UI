
export const PATIENT_INPUT_DEFAULTS = {
  age: 68,
  weight: 72,
  height: 175,
  targetInr: 2.5,
  indication: "Atrial Fibrillation",
  ancestry: "Han Chinese",
  amiodarone: false,
  statin: true,
  enzymeInducer: false,
  cyp2c9: "*1/*1 (Normal metabolizer)",
  vkorc1: "AG (Intermediate sensitivity)",
};

export const INDICATION_OPTIONS = [
  "Atrial Fibrillation",
  "Venous Thromboembolism",
  "Mechanical Heart Valve",
  "Other",
];

export const ANCESTRY_OPTIONS = [
  "White",
  "Black or African American",
  "Han Chinese",
  "Japanese",
  "Korean",
  "Asian (Other)",
  "Other / Unspecified",
];

export const CYP2C9_OPTIONS = [
  "*1/*1 (Normal metabolizer)",
  "*1/*2 (Intermediate metabolizer)",
  "*1/*3 (Intermediate metabolizer)",
  "*2/*2 (Poor metabolizer)",
  "*2/*3 (Poor metabolizer)",
  "*3/*3 (Poor metabolizer)",
];

export const VKORC1_OPTIONS = [
  "GG (Normal sensitivity)",
  "AG (Intermediate sensitivity)",
  "AA (High sensitivity)",
];

const COMBINED_RESULT = {
  featureSet: "combined",
  dose: { weekly: 35.0, daily: 5.0 },
  model: "Stacking Ensemble",
  interval: { low: 22.6, high: 47.4, confidence: 90, calibrated: true },
  metrics: { mae: 9.05, r2: 0.431, pw20: 0.447 },
  trainingSummary: {
    dataset: "IWPC-6256",
    n: 6037,
    split: "80/20 by patient ID, seed 20260725",
    pipeline: "sklearn.Pipeline (fit on train only)",
    featureSetLabel: "Clinical + Genetic (combined)",
  },
  calibration: {
    available: true,
    subgroup: "Han Chinese",
    coverage: 100.0,
    target: 90,
    met: true,
  },
  portability: {
    available: true,
    subgroup: "Han Chinese",
    stackingPenalty: 1.55,
    catboostPenalty: 2.13,
  },
};

const CLINICAL_ONLY_RESULT = {
  featureSet: "clinical-only",
  dose: { weekly: 38.5, daily: 5.5 },
  model: "Stacking Ensemble",
  interval: { low: 24.1, high: 52.9, confidence: null, calibrated: false },
  metrics: null,
  trainingSummary: {
    dataset: "IWPC-6256",
    n: 6037,
    split: "80/20 by patient ID, seed 20260725",
    pipeline: "sklearn.Pipeline (fit on train only)",
    featureSetLabel: "Clinical only (no genetic inputs)",
  },
  calibration: { available: false },
  portability: { available: false },
};

export function getDoseResult(hasGenotype) {
  return hasGenotype ? COMBINED_RESULT : CLINICAL_ONLY_RESULT;
}

export const SHAP_ATTRIBUTIONS = [
  { feature: "VKORC1 1639G>A (AG)", value: 0.82 },
  { feature: "VKORC1 1639G>A (AA)", value: -0.23 },
  { feature: "Age (68 yr)", value: -0.18 },
  { feature: "Weight (72 kg)", value: 0.14 },
  { feature: "CYP2C9 *1/*1", value: 0.09 },
  { feature: "Height (175 cm)", value: 0.07 },
  { feature: "Statin use", value: -0.04 },
  { feature: "Amiodarone", value: 0.01 },
];

export const PHARMACOGENOMIC_SUMMARY = {
  geneticPct: 64,
  clinicalPct: 36,
  note: "VKORC1 (AG allele) raises dose sensitivity, consistent with the IWPC-1780 population mean.",
};

export const EVIDENCE_LINKS = [
  { label: "VKORC1", source: "CPIC 2017 Guideline" },
  { label: "CYP2C9", source: "CYP2C9 Metabolizer Categories" },
  { label: "Clinical", source: "IWPC Dosing Formula" },
];

export const RAG_EXPLANATION = {
  model: "MedGemma-27b-it",
  backend: "Hugging Face Inference Providers",
  text: "MedGemma-27b-it generates a natural-language rationale grounded in SHAP values and PharmGKB/CPIC guidelines, verified against evidence tier.",
};

export const PORTABILITY_NOTE = {
  subgroup: "Han Chinese",
  stackingPenalty: 1.55,
  calibrationCoverage: 100.0,
};
