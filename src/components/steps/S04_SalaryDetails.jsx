import { useState, useRef } from 'react'
import StepWrapper from '../StepWrapper'
import { toNum } from '../../utils'

// Dark styled inputs exclusively for this step
const DarkInput = ({ id, label, value, onChange, placeholder, hint, error, required }) => (
  <div className="space-y-1.5 relative z-10">
    <label htmlFor={id} className="block text-sm font-medium text-indigo-100">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
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

const AdPromoBanner = () => (
  <div className="bg-gradient-to-br from-[#EAE6F8] to-[#F4F1FD] rounded-2xl p-6 relative overflow-hidden shadow-sm border border-purple-100 mt-6">
    <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-purple-200 rounded-full blur-2xl opacity-50 pointer-events-none"></div>
    <div className="inline-flex items-center gap-1.5 bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md mb-4 uppercase tracking-wider shadow-sm">
      Smart Move
    </div>
    <h3 className="text-xl font-black text-gray-900 leading-tight mb-2 relative z-10 tracking-tight">
      Pay less tax, build more wealth.
    </h3>
    <p className="text-sm text-gray-600 mb-6 max-w-[200px] relative z-10 leading-relaxed">
      Compare both tax regimes and find the one that saves you the most.
    </p>
    <button className="bg-white text-indigo-600 font-bold text-sm px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2 relative z-10 group">
      See how it works 
      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
      </svg>
    </button>
    <div className="absolute right-0 bottom-0 pointer-events-none">
      <div className="text-7xl opacity-90 drop-shadow-2xl translate-x-2 translate-y-2">🐷</div>
    </div>
  </div>
);

const InsightSection = () => (
  <div className="mt-8 bg-gray-50/50 rounded-3xl p-6 sm:p-8 border border-gray-100">
    <h3 className="text-sm font-bold text-gray-900 mb-6">Why providing accurate salary details matters?</h3>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center shrink-0 text-green-600 text-xl shadow-sm border border-green-100">
          🎯
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-1">Accurate tax estimate</h4>
          <p className="text-xs text-gray-500 leading-relaxed">Get precise results based on your actual salary.</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0 text-indigo-600 text-xl shadow-sm border border-indigo-100">
          🛡️
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-1">Better deductions</h4>
          <p className="text-xs text-gray-500 leading-relaxed">Find all deductions you're eligible for and save more.</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0 text-orange-500 text-xl shadow-sm border border-orange-100">
          📊
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-1">Smarter financial planning</h4>
          <p className="text-xs text-gray-500 leading-relaxed">Plan your investments and taxes better.</p>
        </div>
      </div>
    </div>
  </div>
);

// Customized Dark FAQ for this step
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

export default function S04_SalaryDetails(props) {
  const { data, update, goNext } = props
  const [errors, setErrors] = useState({})

  const takeHome = toNum(data.takeHomeSalaryMonthly)
  const basic = toNum(data.basicSalaryMonthly)
  
  function validate() {
    const newErrors = {}
    if (!data.takeHomeSalaryMonthly || takeHome <= 0) newErrors.takeHome = true
    if (!data.basicSalaryMonthly || basic <= 0) newErrors.basic = true
    if (data.hasBonus === null) newErrors.hasBonus = true
    if (data.hasBonus && (!data.bonus || toNum(data.bonus) <= 0)) newErrors.bonus = true
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleNext() {
    if (validate()) goNext()
  }

  return (
    <StepWrapper 
      {...props} 
      stepName="Salary Details" 
      mainClassName="bg-[#0B1120] rounded-3xl shadow-2xl shadow-indigo-900/20 p-6 sm:p-8 text-white relative overflow-hidden border border-indigo-900/50"
      rightPanelAd={<AdPromoBanner />}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest">Your Salary</h2>
          </div>
          
          <h1 className="text-3xl font-extrabold text-white leading-tight mb-2 tracking-tight">
            What does your salary look like?
          </h1>
          <p className="text-indigo-200/80 text-sm">
            Let's start with your monthly income details.
          </p>
          
          <div className="absolute right-0 top-0 hidden sm:block pointer-events-none">
            <div className="text-7xl opacity-90 drop-shadow-2xl -translate-y-2">🪪</div>
          </div>
        </div>
        
        {/* Input Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <DarkInput
            id="takeHome"
            label="Take-home salary (per month)"
            value={data.takeHomeSalaryMonthly}
            onChange={v => { update({ takeHomeSalaryMonthly: v }); setErrors(e => ({ ...e, takeHome: false })) }}
            hint="The amount credited to your bank account each month — not your CTC or gross salary."
            required
            error={errors.takeHome}
            placeholder="0"
          />
          <div>
            <DarkInput
              id="basicPay"
              label="Basic Pay (per month)"
              value={data.basicSalaryMonthly}
              onChange={v => { update({ basicSalaryMonthly: v }); setErrors(e => ({ ...e, basic: false })) }}
              required
              error={errors.basic}
              placeholder="0"
            />
            <button className="text-xs text-indigo-400 hover:text-indigo-300 mt-2 flex items-center gap-1.5 transition-colors underline underline-offset-4 decoration-indigo-400/30">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Where to find Basic Pay?
            </button>
          </div>
        </div>

        {/* Extra Income Cards */}
        <div className="pt-6">
          <label className="block text-sm font-medium text-indigo-100 mb-4">
            Do you get any extra money apart from your fixed monthly salary? <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Yes Card */}
            <button
              onClick={() => { update({ hasBonus: true }); setErrors(e => ({ ...e, hasBonus: false })) }}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left relative overflow-hidden group hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/10 ${data.hasBonus === true ? 'border-indigo-400 bg-indigo-500/20' : 'border-indigo-500/30 bg-[#131C35]/50 hover:bg-[#131C35] hover:border-indigo-400/70'}`}
            >
              {data.hasBonus === true && <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 pointer-events-none"></div>}
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-colors relative z-10 ${data.hasBonus === true ? 'bg-indigo-500 border-indigo-500 shadow-sm shadow-indigo-500/50' : 'bg-transparent border-gray-500 group-hover:border-indigo-400'}`}>
                {data.hasBonus === true && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
              </div>
              <div className="relative z-10">
                <div className={`font-bold text-base mb-0.5 ${data.hasBonus === true ? 'text-white' : 'text-indigo-100'}`}>Yes</div>
                <div className="text-xs text-indigo-300/70">I earn additional income</div>
              </div>
            </button>

            {/* No Card */}
            <button
              onClick={() => { update({ hasBonus: false, bonus: '' }); setErrors(e => ({ ...e, hasBonus: false })) }}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left relative overflow-hidden group hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/10 ${data.hasBonus === false ? 'border-indigo-400 bg-indigo-500/20' : 'border-indigo-500/30 bg-[#131C35]/50 hover:bg-[#131C35] hover:border-indigo-400/70'}`}
            >
              {data.hasBonus === false && <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 pointer-events-none"></div>}
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-colors relative z-10 ${data.hasBonus === false ? 'bg-indigo-500 border-indigo-500 shadow-sm shadow-indigo-500/50' : 'bg-transparent border-gray-500 group-hover:border-indigo-400'}`}>
                {data.hasBonus === false && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
              </div>
              <div className="relative z-10">
                <div className={`font-bold text-base mb-0.5 ${data.hasBonus === false ? 'text-white' : 'text-indigo-100'}`}>No</div>
                <div className="text-xs text-indigo-300/70">I only have fixed salary</div>
              </div>
            </button>
          </div>
        </div>
        
        {/* Bonus Input */}
        {data.hasBonus === true && (
          <div className="reveal p-5 bg-[#131C35]/80 border border-indigo-500/20 rounded-xl space-y-4 shadow-inner backdrop-blur-sm">
            <DarkInput
              id="bonus"
              label="How much extra do you receive? (Total per year)"
              value={data.bonus}
              onChange={v => { update({ bonus: v }); setErrors(e => ({ ...e, bonus: false })) }}
              placeholder="e.g. 50000"
              required
              error={errors.bonus}
            />
            <div className="bg-[#0B1120] rounded-lg p-3 border border-indigo-500/10 text-xs text-indigo-300/80 leading-relaxed shadow-sm">
              <strong>Not sure of the exact amount?</strong><br />
              Enter an estimate. This usually includes annual bonuses, joining bonuses, or variable performance incentives.<br /><br />
              <strong>Don't include:</strong> your fixed monthly salary or reimbursements.
            </div>
          </div>
        )}

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
          { q: "Where do I find my Basic Pay?", a: "Open your latest salary slip. Look under the 'Earnings' section for a line item named 'Basic' or 'Basic Pay'." },
          { q: "Why do you need Take-home and not CTC?", a: "CTC includes many things you don't actually get in hand (like employer EPF matching, gratuity, insurance). Take-home salary is much easier to verify—just look at what hits your bank account every month." },
          { q: "My salary fluctuates every month. What should I do?", a: "If the fluctuation is due to variable pay or incentives, enter your base fixed amount in 'Take-home', and sum up all the variable payouts to enter in the 'Bonus' section." }
        ]} />

      </div>
    </StepWrapper>
  )
}
