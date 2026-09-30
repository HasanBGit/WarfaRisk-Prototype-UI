import { Navigate } from "react-router-dom";
import { useWizard } from "../context/WizardContext.jsx";

// Deep-link guard: if a reviewer bookmarks or reloads on /dose-result or
// /explainability without having submitted Screen 1 yet, send them back to
// the start instead of rendering a broken/empty state.
export default function RequireStep({ requires, children }) {
  const { step1Complete } = useWizard();
  if (requires === "step1" && !step1Complete) {
    return <Navigate to="/patient-input" replace />;
  }
  return children;
}
