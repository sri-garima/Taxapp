import { useState, useRef } from 'react'
import StepWrapper from '../StepWrapper'
import NumberInput from '../NumberInput'
import ConfusedLink from '../ConfusedLink'
import CommonQuestions from '../CommonQuestions'

export default function S07_Exemptions(props) {
  const { data, update, goNext } = props
  const [errors, setErrors] = useState({})
  const faqRef = useRef(null)

  function validate() {
    const newErrors = {}
    if (data.paysRent === null) newErrors.paysRent = true
    if (data.paysRent) {
      if (!data.monthlyRent || Number(data.monthlyRent) <= 0) newErrors.monthlyRent = true
      if (data.hasHRA && !data.cityType) newErrors.cityType = true
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleNext() {
    if (validate()) goNext()
  }

  return (
    <StepWrapper {...props} stepName="Rent & HRA">
      <div className="space-y-6 reveal">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">🏠</div>
          <h2 className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Exemptions</h2>
        </div>
        
        <h1 className="text-xl font-bold text-gray-900 leading-tight mb-4">
          Do you pay rent for your accommodation?
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => { update({ paysRent: true }); setErrors(e => ({ ...e, paysRent: false })) }}
            className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-colors ${data.paysRent === true ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
          >
            Yes, I pay rent
          </button>
          <button
            onClick={() => { update({ paysRent: false, monthlyRent: '', cityType: null }); setErrors(e => ({ ...e, paysRent: false })) }}
            className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-colors ${data.paysRent === false ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
          >
            No, I don't
          </button>
        </div>
        {errors.paysRent && <p className="text-xs text-red-600 mt-1">Please select an option.</p>}

        {data.paysRent === true && (
          <div className="reveal space-y-6 pt-4 border-t border-gray-100">
            <NumberInput
              id="monthlyRent"
              label="How much rent do you pay per month?"
              value={data.monthlyRent}
              onChange={v => { update({ monthlyRent: v }); setErrors(e => ({ ...e, monthlyRent: false })) }}
              placeholder="e.g. 20000"
              required
            />
            {errors.monthlyRent && <p className="text-xs text-red-600">Please enter your monthly rent.</p>}

            {data.hasHRA && (
              <div className="reveal p-4 bg-blue-50 border border-blue-100 rounded-xl space-y-3">
                <label className="block text-sm font-medium text-blue-900">
                  Where do you live? <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => { update({ cityType: 'metro' }); setErrors(e => ({ ...e, cityType: false })) }}
                    className={`p-3 rounded-lg border-2 text-left transition-colors ${data.cityType === 'metro' ? 'border-blue-600 bg-white shadow-sm' : 'border-blue-200 bg-blue-50/50 hover:bg-white hover:border-blue-300'}`}
                  >
                    <div className="font-bold text-blue-900 text-sm mb-0.5">Metro City</div>
                    <div className="text-[10px] text-blue-700">Delhi, Mumbai, Kolkata, Chennai</div>
                  </button>
                  <button
                    onClick={() => { update({ cityType: 'nonMetro' }); setErrors(e => ({ ...e, cityType: false })) }}
                    className={`p-3 rounded-lg border-2 text-left transition-colors ${data.cityType === 'nonMetro' ? 'border-blue-600 bg-white shadow-sm' : 'border-blue-200 bg-blue-50/50 hover:bg-white hover:border-blue-300'}`}
                  >
                    <div className="font-bold text-blue-900 text-sm mb-0.5">Non-Metro City</div>
                    <div className="text-[10px] text-blue-700">Bengaluru, Pune, Hyderabad, or any other city</div>
                  </button>
                </div>
                {errors.cityType && <p className="text-xs text-red-600">Please select your city type to calculate HRA exemption.</p>}
                
                <p className="text-[11px] text-blue-700 leading-relaxed mt-2">
                  <strong>Why we ask:</strong> The government allows a higher tax exemption (50% of Basic Pay vs 40%) if you reside in one of the 4 defined metro cities. Note that Bengaluru and Hyderabad are legally classified as non-metros for HRA.
                </p>
              </div>
            )}
            
            {!data.hasHRA && (
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 flex items-start gap-2">
                <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>Since you don't receive HRA, you might be eligible to claim rent deduction under Section 80GG. We will automatically check this for you under the Old Regime.</p>
              </div>
            )}
          </div>
        )}

        {data.paysRent === false && (
          <div className="reveal p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
            Got it. We will skip rent-related deductions (like HRA exemption).
          </div>
        )}

        <button onClick={handleNext} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:from-indigo-800 active:to-purple-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4">
          Continue →
        </button>
      </div>
    </StepWrapper>
  )
}
