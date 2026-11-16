# WarfaRisk: Warfarin Dose Decision Support (Prototype Interface)

![License](https://img.shields.io/badge/license-Apache--2.0-blue) ![status](https://img.shields.io/badge/status-v0.9--prototype-lightgrey)

> **Research prototype only.** Not clinically validated. Do not use for actual dosing decisions.

A demo interface for warfarin dose prediction. It shows fixed example data and is not connected to a live model.

## Features

- 3-step wizard: Patient Input → Dose Result (90% conformal interval) → SHAP Explainability
- Clinical-only fallback when genotype fields are blank
- Per-ancestry-subgroup calibration notice and portability flag
- FHIR R4 export stub (`MedicationRequest`)
- RAG explanation card (MedGemma-27b-it, grounded in SHAP + PharmGKB/CPIC)

## Tech stack

- **Frontend:** React + Vite + Tailwind CSS + React Router
- **Backend:** Django + Django REST Framework (optional)

## Getting started

### Frontend

```
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5173/`. No backend required.

### Backend

```
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py runserver
```

To use it from the frontend, set this in `frontend/.env`:

```
VITE_API_BASE_URL=http://localhost:8000
```

## API

| Endpoint | Method | Response |
|---|---|---|
| `/api/health/` | GET | `{ status: "ok" }` |
| `/api/predict/` | POST | dose, interval, metrics, calibration, portability |
| `/api/explain/` | POST | SHAP attributions, pharmacogenomic summary, evidence links, RAG explanation |
| `/api/fhir/medication-request/` | POST | stub FHIR R4 `MedicationRequest` |

## Citation

```bibtex
@article{barmandah2026warfarisk,
  author  = {Barmandah, Hassan and Marghalani, Siraj Aldeen and Bawazir, Omar Abdullah
             and Shaat, Muath and Alkattan, Abdullah N. and AlEissa, Mariam M.},
  title   = {{WarfaRisk}: A Reproducible, Fairness-Aware Machine Learning Pipeline for
             Warfarin Dose Prediction (Prototype)},
  journal = {AI},
  publisher = {MDPI},
  volume  = {7},
  number  = {10},
  pages   = {431},
  year    = {2026},
  doi     = {10.3390/ai7100431},
}
```

The pipeline and trained models behind this interface are described in:

```bibtex
@article{jpm16100531,
  author  = {Barmandah, Hassan and Bawazir, Omar A. and Marghalani, Siraj Aldeen and Shaat, Muath and Alkattan, Abdullah N. and AlEissa, Mariam M.},
  title   = {Beyond Mean Absolute Error: Ancestry-Stratified Calibration and Explainability for Warfarin Dosing Models},
  journal = {Journal of Personalized Medicine},
  volume  = {16},
  number  = {10},
  pages   = {531},
  year    = {2026},
  doi     = {10.3390/jpm16100531},
}
```

A machine-readable version is in [`CITATION.cff`](CITATION.cff). Pipeline code: <https://github.com/HasanBGit/WarfaRisk>.

## License

Apache License 2.0. See [LICENSE](LICENSE).
