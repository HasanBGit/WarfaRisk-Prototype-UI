export default function WizardFooterNav({ onBack, backLabel = "← Back", onNext, nextLabel }) {
  return (
    <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
      <button
        type="button"
        onClick={onBack}
        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
      >
        {backLabel}
      </button>
      <button
        type="button"
        onClick={onNext}
        className="rounded-md bg-gray-900 px-5 py-2 text-sm font-semibold text-white hover:bg-gray-800"
      >
        {nextLabel}
      </button>
    </div>
  );
}
