import { useState, useRef } from 'react'
import StepWrapper from '../StepWrapper'
import FrequencyInput from '../FrequencyInput'
import ConfusedLink from '../ConfusedLink'
import CommonQuestions from '../CommonQuestions'
import { toNum } from '../../utils'

const ITEMS_80C = [
  { key: 'epf', label: 'Employee Provident Fund (EPF)', emoji: '🏢', desc: 'Your 12% deduction' },
  { key: 'lic', label: 'Life Insurance Premium', emoji: '☂️', desc: 'Term or endowment plans' },
  { key: 'ppf', label: 'Public Provident Fund (PPF)', emoji: '🏦', desc: 'Your deposits this year' },
  { key: 'elss', label: 'ELSS Mutual Funds', emoji: '📈', desc: 'Tax-saving mutual funds' },
  { key: 'tuition', label: 'Children\'s Tuition Fee', emoji: '🎓', desc: 'School/college fees' },
  { key: 'homeLoanPrincipal', label: 'Home Loan Principal', emoji: '🏡', desc: 'Principal repayment only' },
  { key: 'nsc', label: 'NSC / Tax Saving FD', emoji: '📜', desc: '5-year lock-in deposits' },
]

export default function S08_Investments80C(props) {
  const { data, update, goNext } = props
  const [errors, setErrors] = useState({})
  const faqRef = useRef(null)

  function toggleItem(key) {
    const active = data.has80CItems || []
    let newItems
    if (active.includes(key)) {
      newItems = active.filter(i => i !== key)
      update({ has80CItems: newItems, investments80C: { ...data.investments80C, [key]: '' } })
    } else {
      newItems = [...active, key]
      update({ has80CItems: newItems })
    }
    setErrors(e => ({ ...e, [key]: false }))
  }

  function handleValChange(key, val) {
    update({ investments80C: { ...data.investments80C, [key]: val } })
    setErrors(e => ({ ...e, [key]: false }))
  }

  function validate() {
    const newErrors = {}
    const active = data.has80CItems || []
    active.forEach(key => {
      if (!data.investments80C[key] || toNum(data.investments80C[key]) <= 0) {
        newErrors[key] = true
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleNext() {
    if (validate()) goNext()
  }

  const active = data.has80CItems || []
  const total80C = active.reduce((sum, key) => sum + toNum(data.investments80C[key]), 0)

  return (
    <StepWrapper {...props} stepName="Section 80C">
      <div className="space-y-6 reveal">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">💼</div>
          <h2 className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Section 80C Deductions</h2>
        </div>
        
        <div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight mb-2">
            Have you made any of these tax-saving investments?
          </h1>
          <p className="text-sm text-gray-500">
            Select all that apply. Under the old regime, you can claim up to ₹1.5 Lakhs here.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ITEMS_80C.map(item => {
            const isSelected = active.includes(item.key)
            return (
              <div key={item.key} className={`rounded-xl border-2 transition-all overflow-hidden ${isSelected ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                <label className="flex items-center p-3 cursor-pointer">
                  <div className="shrink-0 mr-3">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300 bg-white'}`}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{item.emoji}</span>
                      <span className={`text-sm font-bold truncate ${isSelected ? 'text-indigo-900' : 'text-gray-900'}`}>{item.label}</span>
                    </div>
                    <p className={`text-[10px] mt-0.5 truncate ${isSelected ? 'text-indigo-600' : 'text-gray-500'}`}>{item.desc}</p>
                  </div>
                  <input type="checkbox" className="sr-only" checked={isSelected} onChange={() => toggleItem(item.key)} />
                </label>
                
                {isSelected && (
                  <div className="px-3 pb-3 pt-1">
                    <FrequencyInput
                      id={item.key}
                      value={data.investments80C[item.key]}
                      onChange={v => handleValChange(item.key, v)}
                      placeholder="Amount"
                    />
                    {errors[item.key] && <p className="text-xs text-red-600 mt-1">Please enter a valid amount.</p>}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {total80C > 0 && (
          <div className="reveal px-4 py-3 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
            <span className="text-sm font-medium text-green-900">Total 80C declared:</span>
            <span className="text-sm font-bold text-green-700">₹{total80C.toLocaleString('en-IN')} / 1.5L</span>
          </div>
        )}
        
        {total80C > 150000 && (
          <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded-lg border border-amber-200">
            Note: You have declared more than ₹1.5 Lakhs. The calculator will automatically cap your deduction at the legal limit of ₹1,50,000.
          </p>
        )}

        <button onClick={handleNext} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:from-indigo-800 active:to-purple-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4">
          Continue →
        </button>

        <CommonQuestions ref={faqRef} questions={[
          { q: "What is EPF vs PPF?", a: "EPF is automatically deducted from your salary by your employer (usually 12% of basic). PPF is an account you open yourself at a bank or post office and deposit money into voluntarily." },
          { q: "Where do I find my EPF amount?", a: "Check your salary slip. Look for 'Provident Fund' or 'PF' under deductions. Multiply that monthly amount by 12." },
          { q: "Is Employer's PF contribution included in 80C?", a: "No. Only YOUR contribution (Employee PF) goes into the 80C limit. Employer PF is a separate component and is generally tax-free." }
        ]} />
      </div>
    </StepWrapper>
  )
}
