import { useState, useRef } from 'react'
import StepWrapper from '../StepWrapper'
import FrequencyInput from '../FrequencyInput'
import ConfusedLink from '../ConfusedLink'
import CommonQuestions from '../CommonQuestions'

export default function S09_MedicalInsurance(props) {
  const { data, update, goNext } = props
  const [errors, setErrors] = useState({})
  const faqRef = useRef(null)

  function validate() {
    const newErrors = {}
    if (data.hasSelfInsurance === null) newErrors.hasSelfInsurance = true
    if (data.hasParentInsurance === null) newErrors.hasParentInsurance = true
    
    if (data.hasSelfInsurance && !data.selfInsurancePremium) newErrors.selfInsurancePremium = true
    if (data.hasParentInsurance) {
      if (!data.parentInsurancePremium) newErrors.parentInsurancePremium = true
      if (data.parentsAbove60 === null) newErrors.parentsAbove60 = true
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleNext() {
    if (validate()) goNext()
  }

  return (
    <StepWrapper {...props} stepName="Health Insurance">
      <div className="space-y-6 reveal">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">⚕️</div>
          <h2 className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Health & Medical (80D)</h2>
        </div>
        
        <div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight mb-2">
            Do you pay for any health insurance?
          </h1>
          <p className="text-sm text-gray-500">
            Premiums paid for yourself, spouse, children, or parents can be claimed under Section 80D. <ConfusedLink faqRef={faqRef} label="What about employer insurance?" />
          </p>
        </div>

        <div className="pt-2">
          <label className="block text-sm font-bold text-gray-900 mb-3">
            1. Insurance for Self / Family (Spouse, Children) <span className="text-red-600">*</span>
          </label>
          <div className="flex gap-3 mb-4">
            <button
              onClick={() => { update({ hasSelfInsurance: true }); setErrors(e => ({ ...e, hasSelfInsurance: false })) }}
              className={`flex-1 py-2.5 rounded-xl border-2 font-semibold transition-colors ${data.hasSelfInsurance === true ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
            >
              Yes
            </button>
            <button
              onClick={() => { update({ hasSelfInsurance: false, selfInsurancePremium: '' }); setErrors(e => ({ ...e, hasSelfInsurance: false })) }}
              className={`flex-1 py-2.5 rounded-xl border-2 font-semibold transition-colors ${data.hasSelfInsurance === false ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
            >
              No
            </button>
          </div>
          {errors.hasSelfInsurance && <p className="text-xs text-red-600 mb-4 mt-[-10px]">Please select an option.</p>}

          {data.hasSelfInsurance && (
            <div className="reveal p-4 bg-indigo-50 border border-indigo-100 rounded-xl mb-6">
              <FrequencyInput
                id="selfInsurancePremium"
                label="Annual premium amount paid"
                value={data.selfInsurancePremium}
                onChange={v => { update({ selfInsurancePremium: v }); setErrors(e => ({ ...e, selfInsurancePremium: false })) }}
                placeholder="e.g. 15000"
                note="Maximum allowed is ₹25,000 (or ₹50,000 if you are a senior citizen)."
              />
              {errors.selfInsurancePremium && <p className="text-xs text-red-600 mt-1">Please enter your premium.</p>}
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-gray-100">
          <label className="block text-sm font-bold text-gray-900 mb-3">
            2. Insurance for Parents <span className="text-red-600">*</span>
          </label>
          <div className="flex gap-3 mb-4">
            <button
              onClick={() => { update({ hasParentInsurance: true }); setErrors(e => ({ ...e, hasParentInsurance: false })) }}
              className={`flex-1 py-2.5 rounded-xl border-2 font-semibold transition-colors ${data.hasParentInsurance === true ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
            >
              Yes
            </button>
            <button
              onClick={() => { update({ hasParentInsurance: false, parentInsurancePremium: '', parentsAbove60: null }); setErrors(e => ({ ...e, hasParentInsurance: false })) }}
              className={`flex-1 py-2.5 rounded-xl border-2 font-semibold transition-colors ${data.hasParentInsurance === false ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
            >
              No
            </button>
          </div>
          {errors.hasParentInsurance && <p className="text-xs text-red-600 mb-4 mt-[-10px]">Please select an option.</p>}

          {data.hasParentInsurance && (
            <div className="reveal p-4 bg-indigo-50 border border-indigo-100 rounded-xl space-y-4">
              <FrequencyInput
                id="parentInsurancePremium"
                label="Annual premium amount paid for parents"
                value={data.parentInsurancePremium}
                onChange={v => { update({ parentInsurancePremium: v }); setErrors(e => ({ ...e, parentInsurancePremium: false })) }}
                placeholder="e.g. 25000"
              />
              {errors.parentInsurancePremium && <p className="text-xs text-red-600 mt-[-10px]">Please enter premium amount.</p>}

              <div className="pt-2 border-t border-indigo-200/60">
                <label className="block text-sm font-medium text-indigo-900 mb-2">
                  Are any of your parents 60 years or older?
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => { update({ parentsAbove60: true }); setErrors(e => ({ ...e, parentsAbove60: false })) }}
                    className={`flex-1 py-2 rounded-lg border-2 font-semibold transition-colors text-sm ${data.parentsAbove60 === true ? 'border-indigo-600 bg-white text-indigo-700' : 'border-indigo-100 bg-indigo-50/50 text-indigo-600 hover:bg-white'}`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => { update({ parentsAbove60: false }); setErrors(e => ({ ...e, parentsAbove60: false })) }}
                    className={`flex-1 py-2 rounded-lg border-2 font-semibold transition-colors text-sm ${data.parentsAbove60 === false ? 'border-indigo-600 bg-white text-indigo-700' : 'border-indigo-100 bg-indigo-50/50 text-indigo-600 hover:bg-white'}`}
                  >
                    No
                  </button>
                </div>
                {errors.parentsAbove60 && <p className="text-xs text-red-600 mt-2">Required for limit calculation.</p>}
                
                <p className="text-[11px] text-indigo-600 mt-2">
                  Maximum allowed: ₹25,000 (parents below 60) or ₹50,000 (parents above 60).
                </p>
              </div>
            </div>
          )}
        </div>

        <button onClick={handleNext} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:from-indigo-800 active:to-purple-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4">
          Continue →
        </button>

        <CommonQuestions ref={faqRef} questions={[
          { q: "Can I claim corporate/employer insurance premium?", a: "If your employer deducts a portion of the premium from your salary, yes, you can claim the amount deducted from you. The portion paid by the company cannot be claimed." },
          { q: "Can I include medical check-up costs?", a: "Yes, up to ₹5,000 spent on preventive health check-ups can be claimed within the overall 80D limit. You can add it to your premium amount." },
          { q: "What if I pay my parents' premium but they are not dependent on me?", a: "You can still claim it! Section 80D allows you to claim premiums paid for parents, regardless of whether they are financially dependent on you or not." }
        ]} />
      </div>
    </StepWrapper>
  )
}
