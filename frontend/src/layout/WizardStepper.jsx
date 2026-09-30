const STEPS = [
  { key: "patient-input", label: "Patient Input" },
  { key: "dose-result", label: "Dose Result" },
  { key: "explainability", label: "Explainability" },
];

export default function WizardStepper({ activeStep, completedSteps }) {
  return (
    <ol className="flex items-center justify-center gap-2 py-4">
      {STEPS.map((step, idx) => {
        const isActive = idx === activeStep;
        const isComplete = completedSteps.includes(idx);
        return (
          <li key={step.key} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span
                className={
                  "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold " +
                  (isActive
                    ? "border-gray-900 bg-gray-900 text-white"
                    : isComplete
                    ? "border-gray-900 bg-white text-gray-900"
                    : "border-gray-300 bg-white text-gray-400")
                }
              >
                {isComplete && !isActive ? "✓" : idx + 1}
              </span>
              <span
                className={
                  "text-sm font-medium " +
                  (isActive ? "text-gray-900" : "text-gray-400")
                }
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <span className="mx-1 h-px w-8 bg-gray-200" aria-hidden="true" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
