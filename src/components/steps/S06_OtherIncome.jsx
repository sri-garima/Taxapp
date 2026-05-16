import { useState, useRef } from 'react'
import StepWrapper from '../StepWrapper'
import FrequencyInput from '../FrequencyInput'
import ConfusedLink from '../ConfusedLink'
import CommonQuestions from '../CommonQuestions'
import { toNum } from '../../utils'

export default function S06_OtherIncome(props) {
  const { data, update, goNext } = props
  const [error, setError] = useState(false)
  const faqRef = useRef(null)

  function handleNext() {
    if (data.hasOtherIncome === null) {
      setError(true)
      return
    }
    if (data.hasOtherIncome === false) {
      update({ fdInterest: '', savingsInterest: '' })
    }
    setError(false)
    goNext()
  }

  function handleToggle(val) {
    update({ hasOtherIncome: val })
    setError(false)
  }

  return (
    <StepWrapper {...props} stepName="Other Income">
      <div className="space-y-6 reveal">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">💵</div>
          <h2 className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Other Income</h2>
        </div>
        
        <div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight mb-2">
            Did your bank pay you any interest this year?
          </h1>
          <p className="text-sm text-gray-500">
            Interest from Fixed Deposits (FD) and Savings accounts is added to your income and taxed. Many people forget this. <ConfusedLink faqRef={faqRef} label="What counts as interest income?" />
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="text-2xl mb-2">🏦</div>
            <div className="text-sm font-bold text-gray-900 mb-1">Fixed Deposit (FD)</div>
            <div className="text-xs text-gray-500">Interest earned on money locked in an FD for 1–5 years.</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="text-2xl mb-2">💳</div>
            <div className="text-sm font-bold text-gray-900 mb-1">Savings Account</div>
            <div className="text-xs text-gray-500">The small interest your bank pays on the balance in your regular account.</div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Did you earn any interest from FDs or savings accounts in FY 2025-26? <span className="text-red-600">*</span>
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => handleToggle(true)}
              className={`flex-1 py-2.5 rounded-xl border-2 font-semibold transition-colors ${data.hasOtherIncome === true ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
            >
              Yes
            </button>
            <button
              onClick={() => handleToggle(false)}
              className={`flex-1 py-2.5 rounded-xl border-2 font-semibold transition-colors ${data.hasOtherIncome === false ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
            >
              No
            </button>
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3" role="alert">
            Please answer if you received any interest income.
          </div>
        )}

        {data.hasOtherIncome === true && (
          <div className="reveal space-y-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <FrequencyInput
              id="fdInterest"
              label="FD Interest"
              value={data.fdInterest}
              onChange={v => update({ fdInterest: v })}
              hint="Add all FDs together. Enter 0 if you have no FDs."
            />
            <FrequencyInput
              id="savingsInterest"
              label="Savings Account Interest"
              value={data.savingsInterest}
              onChange={v => update({ savingsInterest: v })}
              hint="Usually a small amount. Check your annual bank statement. Enter 0 if negligible."
            />
            <p className="text-xs text-blue-700 mt-2">
              Tip: open your bank app → Statements → search for "Interest Credit" entries.
            </p>
          </div>
        )}

        <button onClick={handleNext} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:from-indigo-800 active:to-purple-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4">
          Continue →
        </button>

        <CommonQuestions ref={faqRef} questions={[
          { q: "Is FD interest really taxable?", a: "Yes. Interest earned on Fixed Deposits is fully taxable at your slab rate. The bank may deduct 10% TDS, but you still owe the remaining tax." },
          { q: "Is Savings account interest taxable?", a: "Yes, but under the old regime, Section 80TTA provides a deduction of up to ₹10,000 for it (₹50,000 for seniors under 80TTB). We'll calculate this automatically for you." },
          { q: "What if the bank already deducted TDS?", a: "We will ask about TDS later in the calculator. For now, enter the GROSS interest you earned before any TDS was deducted." },
          { q: "Should I include FD interest for my spouse/parents?", a: "No. Only include interest earned on FDs that are in your name (where your PAN is linked)." },
          { q: "What about PPF interest?", a: "Interest from PPF (Public Provident Fund) is completely tax-free. Do not include it here." },
          { q: "I don't know the exact amount.", a: "It's best to check your bank statement. If you can't right now, enter an estimate. You can always come back and change it later." }
        ]} />
      </div>
    </StepWrapper>
  )
}
