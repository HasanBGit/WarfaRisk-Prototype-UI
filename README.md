# WarfaRisk Prototype Interface

A three-step web interface for warfarin dose decision support. It shows fixed example data and is not connected to a live model.

![License](https://img.shields.io/badge/license-Apache--2.0-blue) ![status](https://img.shields.io/badge/status-v0.9--prototype-lightgrey)

> This is a research prototype. It is not clinically validated and must not be used to make a dosing decision.

Live demo: <https://hasanbgit.github.io/WarfaRisk-Prototype-UI/>

The pipeline and trained models this interface is based on are in [HasanBGit/WarfaRisk](https://github.com/HasanBGit/WarfaRisk). The interface connected to the trained model (a vanilla JavaScript app with a Flask server) is `prototype_app/` in that repository. This repository is the React and Django demo with fixed example data.

## Contents

- [What it does](#what-it-does)
- [Project layout](#project-layout)
- [Getting started](#getting-started)
- [API](#api)
- [Citation](#citation)
- [License](#license)

## What it does

The interface walks a user through three screens:

1. Patient input: clinical parameters, comedications and optional CYP2C9 and VKORC1 genotypes.
2. Dose result: a predicted weekly dose with a 90% conformal interval.
3. Explainability: SHAP feature attributions and a retrieval-based explanation (MedGemma-27b-it, grounded in SHAP output and PharmGKB and CPIC guidelines).

It also has:

- A clinical-only fallback when the genotype fields are blank.
- A calibration notice and portability flag for each ancestry subgroup.
- A stub FHIR R4 `MedicationRequest` export.

Built with React, Vite, Tailwind CSS and React Router. The optional backend uses Django and Django REST Framework.

## Project layout

| Path | Contents |
| :--- | :--- |
| `frontend/src/screens/` | The three wizard screens |
| `frontend/src/components/` | Cards, form fields, the SHAP chart and navigation |
| `frontend/src/context/` | Wizard state: `WizardProvider.jsx`, `useWizard.js`, `wizardContext.js` |
| `frontend/src/layout/` | App shell, step indicator and the guard for direct links to later steps |
| `frontend/src/api/` | Client that calls the backend, or returns mock data when none is set |
| `frontend/src/mocks/` | Fixed example data |
| `backend/dosing/` | API views, serializers and mock data |
| `backend/warfarisk_backend/` | Django project settings and URLs |

## Getting started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173/`. It needs no backend.

### Backend (optional)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py runserver
```

To make the frontend use the backend, set this in `frontend/.env`:

```
VITE_API_BASE_URL=http://localhost:8000
```

## API

| Endpoint | Method | Response |
| :--- | :--- | :--- |
| `/api/health/` | GET | `{ status: "ok" }` |
| `/api/predict/` | POST | Dose, interval, metrics, calibration and portability |
| `/api/explain/` | POST | SHAP attributions, pharmacogenomic summary, evidence links and the generated explanation |
| `/api/fhir/medication-request/` | POST | Stub FHIR R4 `MedicationRequest` |

## Citation

This interface is described in the following paper.

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

The pipeline and trained models behind it are described in this one.

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

A machine-readable version is in [`CITATION.cff`](CITATION.cff).

## License

Apache License 2.0. See [LICENSE](LICENSE).
