import { useState, useRef } from 'react'
import StepWrapper from '../StepWrapper'
import FrequencyInput from '../FrequencyInput'
import ConfusedLink from '../ConfusedLink'
import CommonQuestions from '../CommonQuestions'

export default function S10_NPS(props) {
  const { data, update, goNext } = props
  const [errors, setErrors] = useState({})
  const faqRef = useRef(null)

  function validate() {
    if (data.hasPersonalNPS === null) {
      setErrors({ hasPersonalNPS: true })
      return false
    }
    if (data.hasPersonalNPS && !data.personalNPS) {
      setErrors({ personalNPS: true })
      return false
    }
    setErrors({})
    return true
  }

  function handleNext() {
    if (validate()) goNext()
  }

  return (
    <StepWrapper {...props} stepName="Personal NPS">
      <div className="space-y-6 reveal">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">🏦</div>
          <h2 className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Additional Deductions</h2>
        </div>
        
        <div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight mb-2">
            Do you invest in NPS on your own?
          </h1>
          <p className="text-sm text-gray-500">
            This is for voluntary personal contributions to your Tier 1 NPS account, outside of your employer's contribution. <ConfusedLink faqRef={faqRef} label="Wait, what's the difference?" />
          </p>
        </div>

        <div className="pt-2">
          <div className="flex gap-3 mb-4">
            <button
              onClick={() => { update({ hasPersonalNPS: true }); setErrors({}) }}
              className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-colors ${data.hasPersonalNPS === true ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
            >
              Yes
            </button>
            <button
              onClick={() => { update({ hasPersonalNPS: false, personalNPS: '' }); setErrors({}) }}
              className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-colors ${data.hasPersonalNPS === false ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
            >
              No
            </button>
          </div>
          {errors.hasPersonalNPS && <p className="text-xs text-red-600 mb-4 mt-[-10px]">Please select an option.</p>}

          {data.hasPersonalNPS && (
            <div className="reveal p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
              <FrequencyInput
                id="personalNPS"
                label="How much did you invest this year?"
                value={data.personalNPS}
                onChange={v => { update({ personalNPS: v }); setErrors({}) }}
                placeholder="e.g. 50000"
                note="You get an additional ₹50,000 deduction under Section 80CCD(1B) over and above the ₹1.5L 80C limit."
              />
              {errors.personalNPS && <p className="text-xs text-red-600 mt-1">Please enter your investment amount.</p>}
            </div>
          )}
        </div>

        <button onClick={handleNext} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:from-indigo-800 active:to-purple-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4">
          Continue →
        </button>

        <CommonQuestions ref={faqRef} questions={[
          { q: "Is this the same as Employer NPS?", a: "No! Employer NPS (Section 80CCD(2)) is deducted from your salary by your company. Personal NPS (Section 80CCD(1B)) is when you log into the NPS portal or your bank app and manually deposit money yourself." },
          { q: "Does NPS Tier 2 count?", a: "No, tax benefits under Section 80CCD(1B) are only available for deposits made into your NPS Tier 1 account." }
        ]} />
      </div>
    </StepWrapper>
  )
}
