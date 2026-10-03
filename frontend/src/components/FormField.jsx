export function NumberField({ label, unit, value, onChange, helper, min, max, step }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="mt-1 flex items-center gap-2">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
          className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
        />
        {unit && <span className="text-xs text-gray-400">{unit}</span>}
      </div>
      {helper && <p className="mt-1 text-xs text-gray-400">{helper}</p>}
    </label>
  );
}

export function SelectField({ label, value, onChange, options, placeholder, helper }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {helper && <p className="mt-1 text-xs text-gray-400">{helper}</p>}
    </label>
  );
}

export function CheckboxField({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
      />
      {label}
    </label>
  );
}

export function SectionHeader({ children, note }) {
  return (
    <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
      {children}
      {note && (
        <span className="ml-2 text-[11px] font-normal normal-case tracking-normal text-blue-600">
          {note}
        </span>
      )}
    </h2>
  );
}
