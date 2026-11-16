import { Navigate } from "react-router-dom";
import { useWizard } from "../context/useWizard.js";

export default function RequireStep({ requires, children }) {
  const { step1Complete } = useWizard();
  if (requires === "step1" && !step1Complete) {
    return <Navigate to="/patient-input" replace />;
  }
  return children;
}
