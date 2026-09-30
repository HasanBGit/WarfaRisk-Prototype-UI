import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { WizardProvider } from "./context/WizardContext.jsx";
import AppShell from "./layout/AppShell.jsx";
import PatientInputScreen from "./screens/PatientInputScreen.jsx";
import DoseResultScreen from "./screens/DoseResultScreen.jsx";
import ExplainabilityScreen from "./screens/ExplainabilityScreen.jsx";
import RequireStep from "./layout/RequireStep.jsx";

export default function App() {
  return (
    <WizardProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<Navigate to="/patient-input" replace />} />
            <Route path="/patient-input" element={<PatientInputScreen />} />
            <Route
              path="/dose-result"
              element={
                <RequireStep requires="step1">
                  <DoseResultScreen />
                </RequireStep>
              }
            />
            <Route
              path="/explainability"
              element={
                <RequireStep requires="step1">
                  <ExplainabilityScreen />
                </RequireStep>
              }
            />
            <Route path="*" element={<Navigate to="/patient-input" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WizardProvider>
  );
}
