import { useState, useRef } from 'react'
import StepWrapper from '../StepWrapper'
import NumberInput from '../NumberInput'
import ConfusedLink from '../ConfusedLink'
import CommonQuestions from '../CommonQuestions'
import { toNum } from '../../utils'

export default function S12_TDS(props) {
  const { data, update, goNext } = props
  const [errors, setErrors] = useState({})
  const faqRef = useRef(null)

  function validate() {
    const newErrors = {}
    if (data.hasTDS === null) newErrors.hasTDS = true
    if (data.hasTDS) {
      if (!data.tdsDeducted && !data.bankTDS) newErrors.tdsAmount = true
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleNext() {
    if (validate()) goNext()
  }

  const totalTDS = toNum(data.tdsDeducted) + toNum(data.bankTDS)

  return (
    <StepWrapper {...props} stepName="TDS & Taxes Paid">
      <div className="space-y-6 reveal">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">🧾</div>
          <h2 className="text-xs font-medium text-indigo-600 uppercase tracking-wide">TDS (Tax Deducted)</h2>
        </div>
        
        <div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight mb-2">
            Has any tax already been deducted this year?
          </h1>
          <p className="text-sm text-gray-500">
            Tell us about TDS deducted by your employer or your bank. This helps us calculate your final refund or payable tax. <ConfusedLink faqRef={faqRef} label="Where do I find this?" />
          </p>
        </div>

        <div className="flex gap-3 mb-2">
          <button
            onClick={() => { update({ hasTDS: true }); setErrors({}) }}
            className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-colors ${data.hasTDS === true ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
          >
            Yes, TDS was cut
          </button>
          <button
            onClick={() => { update({ hasTDS: false, tdsDeducted: '', bankTDS: '' }); setErrors({}) }}
            className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-colors ${data.hasTDS === false ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
          >
            No / Don't know
          </button>
        </div>
        {errors.hasTDS && <p className="text-xs text-red-600 mt-[-10px]">Please select an option.</p>}

        {data.hasTDS && (
          <div className="reveal p-4 bg-indigo-50 border border-indigo-100 rounded-xl space-y-4">
            <NumberInput
              id="tdsDeducted"
              label="TDS deducted by employer (so far)"
              value={data.tdsDeducted}
              onChange={v => { update({ tdsDeducted: v }); setErrors(e => ({ ...e, tdsAmount: false })) }}
              placeholder="e.g. 45000"
              hint="Check your salary slip for 'TDS' or 'Income Tax' deduction."
            />
            {data.hasOtherIncome && (
              <NumberInput
                id="bankTDS"
                label="TDS deducted by bank (on FD interest)"
                value={data.bankTDS}
                onChange={v => { update({ bankTDS: v }); setErrors(e => ({ ...e, tdsAmount: false })) }}
                placeholder="e.g. 2000"
                hint="Banks usually deduct 10% on FD interest above ₹40k."
              />
            )}
            {errors.tdsAmount && <p className="text-xs text-red-600">Please enter at least one TDS amount.</p>}

            {totalTDS > 0 && (
              <div className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium mt-2">
                Total TDS entered: ₹{totalTDS.toLocaleString('en-IN')}
              </div>
            )}
          </div>
        )}

        {data.hasTDS === false && (
          <div className="reveal p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 flex items-start gap-2">
            <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>No problem. We will just calculate your total tax liability for the year.</p>
          </div>
        )}

        <button onClick={handleNext} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:from-indigo-800 active:to-purple-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4">
          See Final Results ✨
        </button>

        <CommonQuestions ref={faqRef} questions={[
          { q: "Where do I find my total Employer TDS?", a: "The easiest way is to look at your most recent salary slip. It will usually have a 'YTD' (Year-To-Date) column next to the TDS deduction. You can also check your Form 16 Part A if it has been issued." },
          { q: "What is Form 26AS?", a: "Form 26AS is your consolidated tax statement from the government. You can download it from the Income Tax portal. It shows all TDS deducted by your employer, banks, and anyone else." },
          { q: "Does TDS mean my taxes are fully paid?", a: "Not necessarily. Sometimes employers deduct less TDS if they don't have all your other income details (like FD interest). If your final tax is higher than TDS, you have to pay the difference (Self-Assessment Tax)." }
        ]} />
      </div>
    </StepWrapper>
  )
}
