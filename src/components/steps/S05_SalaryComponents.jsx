import { useState } from 'react'
import StepWrapper from '../StepWrapper'
import { toNum } from '../../utils'

const COMPONENTS = [
  { key: 'hasHRA', label: 'HRA — House Rent Allowance', tag: 'Section 10(13A)', emoji: '🏠', description: 'A part of your salary meant for rent. Can be partially tax-free if you pay rent.' },
  { key: 'hasProfTax', label: 'Professional Tax', tag: 'Section 16(iii)', emoji: '🏛️', description: 'State govt tax deducted monthly from your salary. Usually ₹200/month (max ₹2,400/year).' },
  { key: 'hasEmployerNPS', label: 'Employer NPS contribution', tag: 'Section 80CCD(2)', emoji: '🏦', description: 'Your company puts money into your NPS retirement account as part of your pay package.' },
]

// Dark styled Number Input
const DarkInput = ({ id, label, value, onChange, placeholder, hint, error, required }) => (
  <div className="space-y-1.5 relative z-10 w-full">
    {label && (
      <label htmlFor={id} className="block text-sm font-medium text-indigo-100">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
    )}
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-indigo-300 group-focus-within:text-indigo-400 transition-colors font-medium">
        ₹
      </div>
      <input
        type="text"
        id={id}
        inputMode="numeric"
        value={value ? Number(value).toLocaleString('en-IN') : ''}
        onChange={(e) => {
          const raw = e.target.value.replace(/[^0-9]/g, '');
          onChange(raw === '' ? '' : Number(raw));
        }}
        placeholder={placeholder}
        className={`block w-full bg-[#131C35]/80 border ${error ? 'border-rose-500' : 'border-indigo-500/30'} rounded-xl py-3.5 pl-9 pr-4 text-white placeholder:text-indigo-200/50 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all shadow-inner backdrop-blur-sm hover:bg-[#131C35]`}
      />
    </div>
    {hint && <p className="text-xs text-indigo-300/70 mt-1.5 leading-relaxed">{hint}</p>}
  </div>
);

// Dark styled Frequency Input
const DarkFrequencyInput = ({ id, label, value, onChange, placeholder, hint, note, required, error }) => {
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
    <div className="space-y-2 relative z-10">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <label htmlFor={id} className="block text-sm font-medium text-indigo-100">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        <div className="flex rounded-full border border-indigo-500/30 overflow-hidden bg-[#131C35]/80 p-0.5 gap-0.5 shrink-0">
          <button
            type="button"
            onClick={() => setFreq('monthly')}
            className={`py-1 px-3 text-xs font-semibold transition-all rounded-full ${freq === 'monthly' ? 'bg-indigo-500 text-white shadow-sm' : 'text-indigo-300/70 hover:text-indigo-200 hover:bg-white/5'}`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setFreq('annual')}
            className={`py-1 px-3 text-xs font-semibold transition-all rounded-full ${freq === 'annual' ? 'bg-indigo-500 text-white shadow-sm' : 'text-indigo-300/70 hover:text-indigo-200 hover:bg-white/5'}`}
          >
            Per year
          </button>
        </div>
      </div>
      <DarkInput
        id={id}
        value={displayValue}
        onChange={handleInput}
        placeholder={placeholder}
        error={error}
      />
      {freq === 'monthly' && value !== '' && value > 0 && (
        <p className="text-xs text-indigo-400 font-medium reveal">
          = ₹{Number(value).toLocaleString('en-IN')} per year (auto-calculated)
        </p>
      )}
      {note && (
        <div className="text-xs text-amber-200/90 bg-amber-900/20 border border-amber-700/30 rounded-lg px-3 py-2 mt-2 leading-relaxed">
          {note}
        </div>
      )}
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-indigo-300/70 mt-1.5 leading-relaxed">
          {hint}
        </p>
      )}
    </div>
  )
}

// Customized Dark FAQ
const DarkFAQ = ({ questions }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="border border-indigo-500/20 rounded-xl overflow-hidden bg-[#0F172A]/50 backdrop-blur-md transition-all">
      <button 
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/30 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <span className="text-sm font-medium text-indigo-100">Common questions about this</span>
        </div>
        <svg className={`w-4 h-4 text-indigo-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      
      {open && (
        <div className="divide-y divide-indigo-500/10 border-t border-indigo-500/20">
          {questions.map((item, i) => (
            <div key={i} className="px-5 py-4 bg-black/10">
              <h4 className="text-sm font-medium text-indigo-100 mb-2">{item.q}</h4>
              <p className="text-sm text-indigo-300/70 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Bottom Insight Section with Banner
const InsightSection = () => (
  <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
    <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-gray-100 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0 text-2xl shadow-sm border border-indigo-100">👛</div>
      <div>
        <h4 className="text-sm font-bold text-gray-900 mb-1">Maximize your savings</h4>
        <p className="text-xs text-gray-500 leading-relaxed">Check all applicable components to reduce your taxable income.</p>
      </div>
    </div>
    
    <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-gray-100 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center shrink-0 text-2xl shadow-sm border border-green-100 text-green-600">🎯</div>
      <div>
        <h4 className="text-sm font-bold text-gray-900 mb-1">Don't know if these apply?</h4>
        <p className="text-xs text-gray-500 leading-relaxed">We'll help you identify the right components in the next steps.</p>
      </div>
    </div>

    <div className="lg:col-span-4 bg-gradient-to-br from-[#EAE6F8] to-[#F4F1FD] rounded-3xl p-6 border border-purple-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow flex items-center">
      <div className="absolute right-0 bottom-0 pointer-events-none translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:scale-105 transition-transform duration-500">
        <div className="text-7xl drop-shadow-2xl">🐷</div>
      </div>
      <div className="relative z-10">
        <h4 className="text-base font-bold text-gray-900 mb-1 leading-tight tracking-tight">Pay less tax, build more wealth.</h4>
        <p className="text-xs text-gray-600 mb-4 max-w-[170px] leading-relaxed">Compare both tax regimes and find the one that saves you the most.</p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-colors w-max flex items-center gap-1.5">
          Save up to ₹1,50,000+
        </button>
      </div>
    </div>
  </div>
);

export default function S05_SalaryComponents(props) {
  const { data, update, goNext } = props
  const [errors, setErrors] = useState({})

  function toggleComponent(key) {
    update({ [key]: !data[key] })
    setErrors(e => ({ ...e, [key]: false }))
  }

  function validate() {
    const newErrors = {}
    if (data.hasHRA && toNum(data.hraMonthly) <= 0) newErrors.hasHRA = true
    if (data.hasProfTax && toNum(data.professionalTax) <= 0) newErrors.hasProfTax = true
    if (data.hasEmployerNPS && toNum(data.employerNPS) <= 0) newErrors.hasEmployerNPS = true
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleNext() {
    if (validate()) goNext()
  }

  return (
    <StepWrapper 
      {...props} 
      stepName="Salary Components"
      mainClassName="bg-[#0B1120] rounded-3xl shadow-2xl shadow-indigo-900/20 p-6 sm:p-8 text-white relative overflow-hidden border border-indigo-900/50"
      bottomSection={<InsightSection />}
    >
      {/* Dark background glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

      <div className="space-y-8 relative z-10 reveal">
        
        {/* Header Section */}
        <div className="relative">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center text-sm border border-indigo-500/30 shadow-inner">
              <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h2 className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest">Salary Components</h2>
          </div>
          
          <h1 className="text-3xl font-extrabold text-white leading-tight mb-2 tracking-tight">
            Does your salary slip show any of these?
          </h1>
          <p className="text-indigo-200/80 text-sm flex items-center gap-1 flex-wrap">
            Tick all that appear on your slip. Leave the rest blank.
            <button className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 decoration-indigo-400/30 transition-colors inline-flex items-center gap-1 ml-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              What are these?
            </button>
          </p>
          
          <div className="absolute right-0 top-0 hidden sm:block pointer-events-none">
            <div className="text-7xl opacity-90 drop-shadow-2xl -translate-y-2">🧾</div>
          </div>
        </div>

        {/* Components List */}
        <div className="space-y-4">
          {COMPONENTS.map(comp => {
            const isChecked = data[comp.key]
            const hasError = errors[comp.key]
            
            return (
              <div key={comp.key} className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 relative group ${isChecked ? 'border-indigo-400 bg-indigo-500/10 shadow-lg shadow-indigo-900/20' : 'border-indigo-500/20 bg-[#131C35]/50 hover:bg-[#131C35] hover:border-indigo-500/40 hover:-translate-y-0.5'}`}>
                {isChecked && <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none"></div>}
                
                {/* Header Section (Label) */}
                <label className="flex items-start p-5 cursor-pointer relative z-10 select-none">
                  <div className="shrink-0 mr-4 mt-1 relative">
                    <div className={`w-5 h-5 rounded-[5px] border-2 flex items-center justify-center transition-colors ${isChecked ? 'bg-indigo-500 border-indigo-500 shadow-sm shadow-indigo-500/50' : 'bg-[#0B1120] border-gray-500 group-hover:border-indigo-400'}`}>
                      {isChecked && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={isChecked} 
                      onChange={() => toggleComponent(comp.key)} 
                    />
                  </div>

                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex flex-wrap items-center gap-3 mb-1.5">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl shadow-inner border border-white/5 shrink-0">{comp.emoji}</div>
                      <span className={`text-base font-bold ${isChecked ? 'text-white' : 'text-indigo-100'}`}>{comp.label}</span>
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold tracking-wide uppercase shrink-0 ${isChecked ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-white/5 text-gray-400 border border-white/10'}`}>{comp.tag}</span>
                    </div>
                    <p className={`text-sm sm:ml-[52px] leading-relaxed ${isChecked ? 'text-indigo-200' : 'text-indigo-300/60'}`}>{comp.description}</p>
                  </div>

                  <div className="shrink-0 flex items-center justify-center h-10 w-10">
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${isChecked ? 'bg-indigo-500/20 border-indigo-400/50 text-indigo-300' : 'bg-white/5 border-white/10 text-gray-500 group-hover:text-indigo-400 group-hover:border-indigo-500/30'}`}>
                      <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isChecked ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </label>

                {/* Expanded Content (Inputs) */}
                <div className={`transition-all duration-300 ease-in-out origin-top overflow-hidden ${isChecked ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-5 pb-5 relative z-10">
                    <div className="sm:ml-[52px] pt-4 border-t border-indigo-500/20">
                      {comp.key === 'hasHRA' && (
                        <DarkInput
                          id="hraMonthly"
                          label="How much HRA do you receive per month?"
                          value={data.hraMonthly}
                          onChange={v => { update({ hraMonthly: v }); setErrors(e => ({ ...e, hasHRA: false })) }}
                          placeholder="e.g. 15000"
                          hint="Find it on your salary slip under Earnings."
                          required
                          error={hasError}
                        />
                      )}
                      {comp.key === 'hasProfTax' && (
                        <DarkFrequencyInput
                          id="professionalTax"
                          label="How much Professional Tax is deducted?"
                          value={data.professionalTax}
                          onChange={v => { update({ professionalTax: v }); setErrors(e => ({ ...e, hasProfTax: false })) }}
                          placeholder="200"
                          note="Usually ₹200/month = ₹2,400/year. Maximum is ₹2,500 per year."
                          required
                          error={hasError}
                        />
                      )}
                      {comp.key === 'hasEmployerNPS' && (
                        <DarkFrequencyInput
                          id="employerNPS"
                          label="How much does your employer contribute to NPS?"
                          value={data.employerNPS}
                          onChange={v => { update({ employerNPS: v }); setErrors(e => ({ ...e, hasEmployerNPS: false })) }}
                          placeholder="0"
                          hint="Check your CTC breakdown or salary slip. This is your employer's contribution, not yours."
                          required
                          error={hasError}
                        />
                      )}
                      {hasError && <p className="text-xs text-rose-400 mt-2 flex items-center gap-1"><svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>Please enter a valid amount.</p>}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Info Note */}
        <div className="flex items-center justify-center gap-2 text-xs text-indigo-300/60 bg-[#131C35]/30 py-3 rounded-xl border border-indigo-500/10">
          <svg className="w-4 h-4 text-indigo-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          If none of these appear on your slip, leave them all unticked and continue.
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <button 
            onClick={handleNext} 
            className="w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-indigo-600 hover:from-purple-400 hover:via-indigo-400 hover:to-indigo-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-purple-500/30 transform transition-all active:scale-[0.98] flex items-center justify-center gap-2 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-xl"></div>
            <span className="relative z-10 text-base">Continue</span>
            <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        {/* FAQ Dropdown */}
        <DarkFAQ questions={[
          { q: "What is HRA?", a: "House Rent Allowance. It is given by employers to meet the cost of renting a home. If you actually pay rent, a portion of this allowance becomes tax-free under the old tax regime." },
          { q: "What is Professional Tax?", a: "It is a tax levied by state governments in India. Employers deduct it from your salary (usually ₹200 per month) and pay it to the state. It is fully deductible under the old regime." },
          { q: "What is Employer NPS?", a: "Under Section 80CCD(2), your employer can contribute up to 14% of your Basic salary to your NPS account. This amount is tax-free in BOTH the old and new tax regimes." },
          { q: "I get HRA but I don't pay rent. Should I tick it?", a: "Yes, you should still tick it and enter the amount. If you don't pay rent, it simply becomes fully taxable, but we need to account for it correctly in your income." },
          { q: "What about my Employer EPF contribution?", a: "Employer EPF contribution is mostly tax-exempt and doesn't factor into these calculations unless it exceeds ₹7.5 lakh per year. You don't need to enter it here." }
        ]} />

      </div>
    </StepWrapper>
  )
}
