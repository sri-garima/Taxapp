import { useState, useRef } from 'react'
import StepWrapper from '../StepWrapper'
import FrequencyInput from '../FrequencyInput'
import ConfusedLink from '../ConfusedLink'
import CommonQuestions from '../CommonQuestions'

export default function S11_HomeLoan(props) {
  const { data, update, goNext } = props
  const [errors, setErrors] = useState({})
  const faqRef = useRef(null)

  function validate() {
    const newErrors = {}
    if (data.hasHomeLoan === null) newErrors.hasHomeLoan = true
    if (data.hasHomeLoan) {
      if (!data.homeLoanInterest) newErrors.homeLoanInterest = true
      if (!data.loanOwnership) newErrors.loanOwnership = true
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleNext() {
    if (validate()) goNext()
  }

  return (
    <StepWrapper {...props} stepName="Home Loan">
      <div className="space-y-6 reveal">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">🏡</div>
          <h2 className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Section 24(B)</h2>
        </div>
        
        <div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight mb-2">
            Are you paying EMIs on a home loan?
          </h1>
          <p className="text-sm text-gray-500">
            Interest paid on a housing loan for a self-occupied property is tax-deductible up to ₹2 Lakhs. <ConfusedLink faqRef={faqRef} label="What about principal?" />
          </p>
        </div>

        <div className="flex gap-3 mb-2">
          <button
            onClick={() => { update({ hasHomeLoan: true }); setErrors({}) }}
            className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-colors ${data.hasHomeLoan === true ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
          >
            Yes
          </button>
          <button
            onClick={() => { update({ hasHomeLoan: false, homeLoanInterest: '', loanOwnership: null }); setErrors({}) }}
            className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-colors ${data.hasHomeLoan === false ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
          >
            No
          </button>
        </div>
        {errors.hasHomeLoan && <p className="text-xs text-red-600 mt-[-10px]">Please select an option.</p>}

        {data.hasHomeLoan && (
          <div className="reveal p-4 bg-indigo-50 border border-indigo-100 rounded-xl space-y-5">
            <div>
              <FrequencyInput
                id="homeLoanInterest"
                label="Interest paid this year"
                value={data.homeLoanInterest}
                onChange={v => { update({ homeLoanInterest: v }); setErrors(e => ({ ...e, homeLoanInterest: false })) }}
                placeholder="e.g. 180000"
                hint="Check your home loan interest certificate from your bank."
              />
              {errors.homeLoanInterest && <p className="text-xs text-red-600 mt-1">Please enter the interest amount.</p>}
            </div>

            <div className="pt-4 border-t border-indigo-200/60">
              <label className="block text-sm font-medium text-indigo-900 mb-3">
                Are you a co-owner of this property? <span className="text-red-600">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => { update({ loanOwnership: 'own' }); setErrors(e => ({ ...e, loanOwnership: false })) }}
                  className={`p-3 rounded-lg border-2 text-left transition-colors ${data.loanOwnership === 'own' ? 'border-indigo-600 bg-white shadow-sm' : 'border-indigo-100 bg-indigo-50/50 hover:bg-white hover:border-indigo-300'}`}
                >
                  <div className="font-bold text-indigo-900 text-sm mb-0.5">Sole Owner</div>
                  <div className="text-[10px] text-indigo-700">Property is fully in your name. Max deduction ₹2L.</div>
                </button>
                <button
                  onClick={() => { update({ loanOwnership: 'joint' }); setErrors(e => ({ ...e, loanOwnership: false })) }}
                  className={`p-3 rounded-lg border-2 text-left transition-colors ${data.loanOwnership === 'joint' ? 'border-indigo-600 bg-white shadow-sm' : 'border-indigo-100 bg-indigo-50/50 hover:bg-white hover:border-indigo-300'}`}
                >
                  <div className="font-bold text-indigo-900 text-sm mb-0.5">Joint Owner</div>
                  <div className="text-[10px] text-indigo-700">Property is co-owned. Max deduction ₹2L applies to your share.</div>
                </button>
              </div>
              {errors.loanOwnership && <p className="text-xs text-red-600 mt-2">Please select your ownership type.</p>}
            </div>
          </div>
        )}

        <button onClick={handleNext} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:from-indigo-800 active:to-purple-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4">
          Continue →
        </button>

        <CommonQuestions ref={faqRef} questions={[
          { q: "Where do I enter the principal repayment?", a: "Principal repayment comes under Section 80C. You can enter that in the 'Section 80C Deductions' step we completed earlier." },
          { q: "Can I claim rent (HRA) and Home Loan together?", a: "Yes! If you are working in a different city and paying rent there, while paying a home loan for a property in your hometown, you can legally claim both HRA and Home Loan interest." },
          { q: "What if my loan is joint with my spouse?", a: "If you are co-owners and co-borrowers, both of you can claim up to ₹2 Lakhs each on the interest paid, based on your share of the loan." }
        ]} />
      </div>
    </StepWrapper>
  )
}
