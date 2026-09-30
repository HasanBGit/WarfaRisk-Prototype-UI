import { Outlet, useLocation } from "react-router-dom";
import WizardStepper from "./WizardStepper.jsx";
import { useWizard } from "../context/WizardContext.jsx";

const STEP_ROUTES = ["/patient-input", "/dose-result", "/explainability"];

export default function AppShell() {
  const location = useLocation();
  const { step1Complete, step2Complete } = useWizard();

  const activeStep = Math.max(0, STEP_ROUTES.indexOf(location.pathname));
  const completedSteps = [
    ...(step1Complete ? [0] : []),
    ...(step2Complete ? [1] : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">WarfaRisk</h1>
            <p className="text-xs text-gray-500">
              Clinical Warfarin Dose Decision Support
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 bg-gray-400" aria-hidden="true" />
            <span className="text-xs font-medium text-gray-700">FHIR</span>
            <span className="ml-2 rounded border border-gray-300 px-2 py-0.5 text-xs font-medium text-gray-600">
              v0.9-prototype
            </span>
          </div>
        </div>
        <div className="border-t border-gray-100">
          <WizardStepper activeStep={activeStep} completedSteps={completedSteps} />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <Outlet />
      </main>

      <footer className="mx-auto max-w-5xl px-6 pb-8 pt-4 text-center text-xs text-gray-400">
        Research prototype only. Not evaluated prospectively or by clinical
        staff; not a validated clinical tool. Do not use for actual dosing
        decisions.
      </footer>
    </div>
  );
}
