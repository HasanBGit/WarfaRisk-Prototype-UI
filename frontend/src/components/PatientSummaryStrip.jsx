export function PatientSummaryStrip({ patientInput, hasGenotype, condensed, predictedDose, model }) {
  if (condensed) {
    const parts = [
      `Male, ${patientInput.age} yr, ${patientInput.weight} kg, ${patientInput.ancestry}`,
      predictedDose != null ? `Predicted: ${predictedDose.toFixed(1)} mg/week` : null,
      model ? `Model: ${model}` : null,
    ].filter(Boolean);
    return <Strip parts={parts} />;
  }

  const parts = [
    `Male, ${patientInput.age} yr, ${patientInput.weight} kg`,
    patientInput.ancestry,
    patientInput.indication,
    `Statin use: ${patientInput.statin ? "Yes" : "No"}`,
    `CYP2C9: ${hasGenotype ? shortCyp2c9(patientInput.cyp2c9) : "[not entered]"}`,
    `VKORC1: ${hasGenotype ? shortVkorc1(patientInput.vkorc1) : "[not entered]"}`,
  ];
  return <Strip parts={parts} />;
}

function Strip({ parts }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 rounded-md bg-gray-100 px-4 py-2 text-xs text-gray-700">
      <span className="font-semibold text-gray-800">Patient</span>
      {parts.map((p) => (
        <span key={p}>{p}</span>
      ))}
    </div>
  );
}

function shortCyp2c9(v) {
  return v ? v.split(" ")[0] : "[not entered]";
}
function shortVkorc1(v) {
  return v ? v.split(" ")[0] : "[not entered]";
}
