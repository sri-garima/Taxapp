import { useState } from 'react'
import NumberInput from './NumberInput'

export default function FrequencyInput(props) {
  const { id, label, value, onChange, placeholder, hint, note, required, prefix } = props;
  const [freq, setFreq] = useState('annual');

  const displayValue = freq === 'monthly' && value ? Math.round(Number(value) / 12) : value;

  function handleInput(v) {
    if (v === '') {
      onChange('');
    } else {
      onChange(freq === 'monthly' ? Number(v) * 12 : Number(v));
    }
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
        <div className="flex rounded-full border border-gray-200 overflow-hidden bg-gray-50 p-0.5 gap-0.5 shrink-0">
          <button
            type="button"
            onClick={() => {
                if (freq !== 'monthly') {
                    setFreq('monthly')
                }
            }}
            className={`py-1 px-3 text-xs font-semibold transition-all rounded-full ${freq === 'monthly' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => {
                if (freq !== 'annual') {
                    setFreq('annual')
                }
            }}
            className={`py-1 px-3 text-xs font-semibold transition-all rounded-full ${freq === 'annual' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Per year
          </button>
        </div>
      </div>
      <div className="relative">
        <NumberInput
          id={id}
          value={displayValue}
          onChange={handleInput}
          placeholder={placeholder}
          prefix={prefix}
        />
      </div>
      {freq === 'monthly' && value !== '' && value > 0 && (
        <p className="text-xs text-indigo-600 font-medium reveal">
          = ₹{Number(value).toLocaleString('en-IN')} per year (auto-calculated)
        </p>
      )}
      {note && (
        <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-2 py-1 mt-1">
          {note}
        </div>
      )}
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-gray-400 mt-1">
          {hint}
        </p>
      )}
    </div>
  )
}
