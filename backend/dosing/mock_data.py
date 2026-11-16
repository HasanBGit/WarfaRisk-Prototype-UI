"""
Static example data reproducing the numbers already published in the WarfaRisk
manuscript's own UI figures
"""

COMBINED_RESULT = {
    "featureSet": "combined",
    "dose": {"weekly": 35.0, "daily": 5.0},
    "model": "Stacking Ensemble",
    "interval": {"low": 22.6, "high": 47.4, "confidence": 90, "calibrated": True},
    "metrics": {"mae": 9.05, "r2": 0.431, "pw20": 0.447},
    "trainingSummary": {
        "dataset": "IWPC-6256",
        "n": 6037,
        "split": "80/20 by patient ID, seed 20260725",
        "pipeline": "sklearn.Pipeline (fit on train only)",
        "featureSetLabel": "Clinical + Genetic (combined)",
    },
    "calibration": {
        "available": True,
        "subgroup": "Han Chinese",
        "coverage": 100.0,
        "target": 90,
        "met": True,
    },
    "portability": {
        "available": True,
        "subgroup": "Han Chinese",
        "stackingPenalty": 1.55,
        "catboostPenalty": 2.13,
    },
}

CLINICAL_ONLY_RESULT = {
    "featureSet": "clinical-only",
    "dose": {"weekly": 38.5, "daily": 5.5},
    "model": "Stacking Ensemble",
    "interval": {"low": 24.1, "high": 52.9, "confidence": None, "calibrated": False},
    "metrics": None,
    "trainingSummary": {
        "dataset": "IWPC-6256",
        "n": 6037,
        "split": "80/20 by patient ID, seed 20260725",
        "pipeline": "sklearn.Pipeline (fit on train only)",
        "featureSetLabel": "Clinical only (no genetic inputs)",
    },
    "calibration": {"available": False},
    "portability": {"available": False},
}

SHAP_ATTRIBUTIONS = [
    {"feature": "VKORC1 1639G>A (AG)", "value": 0.82},
    {"feature": "VKORC1 1639G>A (AA)", "value": -0.23},
    {"feature": "Age (68 yr)", "value": -0.18},
    {"feature": "Weight (72 kg)", "value": 0.14},
    {"feature": "CYP2C9 *1/*1", "value": 0.09},
    {"feature": "Height (175 cm)", "value": 0.07},
    {"feature": "Statin use", "value": -0.04},
    {"feature": "Amiodarone", "value": 0.01},
]

PHARMACOGENOMIC_SUMMARY = {
    "geneticPct": 64,
    "clinicalPct": 36,
    "note": "VKORC1 (AG allele) raises dose sensitivity. Consistent with IWPC-1780 population mean.",
}

EVIDENCE_LINKS = [
    {"label": "VKORC1", "source": "CPIC 2017 Guideline"},
    {"label": "CYP2C9", "source": "CYP2C9 Metabolizer Categories"},
    {"label": "Clinical", "source": "IWPC Dosing Formula"},
]

RAG_EXPLANATION = {
    "model": "MedGemma-27b-it",
    "backend": "Hugging Face Inference Providers",
    "text": (
        "MedGemma-27b-it generates a natural-language rationale grounded in "
        "SHAP values + PharmGKB/CPIC guidelines (verified against evidence tier)."
    ),
}

PORTABILITY_NOTE = {
    "subgroup": "Han Chinese",
    "stackingPenalty": 1.55,
    "calibrationCoverage": 100.0,
}


def get_dose_result(has_genotype: bool) -> dict:
    return COMBINED_RESULT if has_genotype else CLINICAL_ONLY_RESULT


def get_explanation(has_genotype: bool) -> dict:
    return {
        "shapAttributions": SHAP_ATTRIBUTIONS,
        "pharmacogenomicSummary": PHARMACOGENOMIC_SUMMARY,
        "evidenceLinks": EVIDENCE_LINKS,
        "ragExplanation": RAG_EXPLANATION,
        "portabilityNote": PORTABILITY_NOTE if has_genotype else None,
    }
