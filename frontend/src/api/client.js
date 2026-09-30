// If VITE_API_BASE_URL is set, this talks to the real Django backend.
// Otherwise (the default, and what the deployed GitHub Pages build uses),
// it resolves from the static mock data directly, with no network calls.

import {
  getDoseResult,
  SHAP_ATTRIBUTIONS,
  PHARMACOGENOMIC_SUMMARY,
  EVIDENCE_LINKS,
  RAG_EXPLANATION,
  PORTABILITY_NOTE,
} from "../mocks/mockData.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function predictDose(patientInput, hasGenotype) {
  if (!API_BASE_URL) {
    return getDoseResult(hasGenotype);
  }
  const res = await fetch(`${API_BASE_URL}/api/predict/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patientInput),
  });
  if (!res.ok) throw new Error(`predict failed: ${res.status}`);
  return res.json();
}

export async function fetchExplanation(patientInput, hasGenotype) {
  if (!API_BASE_URL) {
    return {
      shapAttributions: SHAP_ATTRIBUTIONS,
      pharmacogenomicSummary: PHARMACOGENOMIC_SUMMARY,
      evidenceLinks: EVIDENCE_LINKS,
      ragExplanation: RAG_EXPLANATION,
      portabilityNote: hasGenotype ? PORTABILITY_NOTE : null,
    };
  }
  const res = await fetch(`${API_BASE_URL}/api/explain/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patientInput),
  });
  if (!res.ok) throw new Error(`explain failed: ${res.status}`);
  return res.json();
}
