import { useState } from 'react'
import { computeTax, EMPTY_REGIME } from '../taxEngine'
import { NEW_REGIME_SLABS, OLD_REGIME_SLABS_BELOW60, OLD_REGIME_SLABS_SENIOR, OLD_REGIME_SLABS_SUPER_SENIOR } from '../constants'

function fmtN(n) { return Number(n).toLocaleString('en-IN') }
function fmt(n) { return `₹${fmtN(n)}` }

function getOldSlabs(ageGroup) {
  if (ageGroup === 'senior') return OLD_REGIME_SLABS_SENIOR;
  if (ageGroup === 'superSenior') return OLD_REGIME_SLABS_SUPER_SENIOR;
  return OLD_REGIME_SLABS_BELOW60;
}

function slabLabel(prevLimit, upTo) {
  if (prevLimit === 0) return upTo === null ? 'All' : `Up to ₹${fmtN(upTo)}`;
  return upTo === null ? `Above ₹${fmtN(prevLimit)}` : `₹${fmtN(prevLimit + 1)} – ₹${fmtN(upTo)}`;
}

function computeSlabRows(taxableIncome, slabs) {
  const rows = [];
  let prev = 0;
  for (const slab of slabs) {
    const { upTo, rate } = slab;
    const upper = upTo === null ? Infinity : upTo;
    const inBand = Math.max(0, Math.min(taxableIncome, upper) - prev);
    const tax = Math.round(inBand * rate);
    const active = inBand > 0 && rate > 0;
    rows.push({
      label: slabLabel(prev, upTo),
      rate: rate > 0 ? `${(rate * 100).toFixed(0)}%` : 'Nil',
      incomeInBand: inBand,
      tax,
      active
    });
    prev = upper;
    if (taxableIncome <= upper) break;
  }
  return rows;
}

function SectionLabel({ letter, text }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold flex items-center justify-center shrink-0">
        {letter}
      </div>
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{text}</div>
    </div>
  )
}

function LineRow({ label, amount, green, muted }) {
  return (
    <div className="flex justify-between items-center py-0.5">
      <div className={`text-xs ${muted ? 'text-gray-400' : 'text-gray-600'}`}>{label}</div>
      <div className={`text-xs font-semibold ${green ? 'text-green-600' : muted ? 'text-gray-400' : 'text-gray-700'}`}>{amount}</div>
    </div>
  )
}

function ResultBox({ label, amount, indigo }) {
  return (
    <div className={`flex justify-between items-center rounded-lg px-3 py-2 mt-1.5 ${indigo ? 'bg-indigo-50 border border-indigo-100' : 'bg-gray-100 border border-gray-200'}`}>
      <div className={`text-xs font-semibold ${indigo ? 'text-indigo-700' : 'text-gray-500'}`}>= {label}</div>
      <div className={`text-sm font-bold ${indigo ? 'text-indigo-800' : 'text-gray-800'}`}>{amount}</div>
    </div>
  )
}

export default function TaxPreviewPanel({ data }) {
  const [userPickedRegime, setUserPickedRegime] = useState(null)

  const takeHomeSalary = (Number(data.takeHomeSalaryMonthly) || 0) * 12
  const bonus = (data.hasBonus && Number(data.bonus) > 0) ? (Number(data.bonus) || 0) : 0
  const fdInterest = (data.hasOtherIncome && Number(data.fdInterest) > 0) ? (Number(data.fdInterest) || 0) : 0
  const savingsInterest = (data.hasOtherIncome && Number(data.savingsInterest) > 0) ? (Number(data.savingsInterest) || 0) : 0
  const hasIncome = takeHomeSalary > 0

  let newRegimeData = { ...EMPTY_REGIME }
  let oldRegimeData = { ...EMPTY_REGIME }
  let computeSuccess = false

  if (hasIncome) {
    try { 
      const results = computeTax(data); 
      newRegimeData = results.newRegime; 
      oldRegimeData = results.oldRegime; 
      computeSuccess = true 
    }
    catch { /* fallback to zeros */ }
  }

  const newTotal = newRegimeData.totalTax || 0
  const oldTotal = oldRegimeData.totalTax || 0
  const savings = Math.abs(newTotal - oldTotal)
  const betterRegime = newTotal <= oldTotal ? 'new' : 'old'
  const regime = userPickedRegime !== null ? userPickedRegime : (computeSuccess ? betterRegime : 'new')

  const activeData = regime === 'new' ? newRegimeData : oldRegimeData
  const slabs = regime === 'new' ? NEW_REGIME_SLABS : getOldSlabs(data.ageGroup)
  const slabRows = computeSuccess ? computeSlabRows(activeData.taxableIncome, slabs) : []

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-md shadow-gray-100 overflow-hidden transition-all duration-300">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
        <h2 className="text-sm font-bold text-gray-900">Your Live Tax Estimate</h2>
        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-2.5 py-0.5">FY 2025-26</span>
      </div>

      <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between gap-2">
        <div className="flex rounded-full border border-gray-200 bg-gray-50 p-0.5 gap-0.5">
          <button
            onClick={() => setUserPickedRegime('new')}
            className={`py-1.5 px-3 text-xs font-semibold transition-all rounded-full ${regime === 'new' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            New Regime
            {betterRegime === 'new' && <span className="ml-1 text-green-600 text-[10px] font-bold">Best</span>}
          </button>
          <button
            onClick={() => setUserPickedRegime('old')}
            className={`py-1.5 px-3 text-xs font-semibold transition-all rounded-full ${regime === 'old' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Old Regime
            {betterRegime === 'old' && <span className="ml-1 text-green-600 text-[10px] font-bold">Best</span>}
          </button>
        </div>
      </div>

      {!hasIncome ? (
        <div className="px-6 py-12 text-center flex flex-col items-center">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="text-6xl drop-shadow-xl text-purple-500">🧮</div>
            <div className="text-6xl drop-shadow-xl text-indigo-400">📈</div>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Enter your salary to see a live tax estimate</h3>
          <p className="text-sm text-gray-500 leading-relaxed max-w-[240px]">
            We'll show your tax, deductions and potential savings.
          </p>
        </div>
      ) : (
        <div className="space-y-1 pb-3">
          {computeSuccess && (
            <div className="mx-4 mt-3 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 p-5 text-white shadow-lg shadow-indigo-600/20 relative overflow-hidden group">
              {/* Decorative abstract elements */}
              <div className="absolute -right-4 -top-8 w-32 h-32 bg-purple-500/30 rounded-full blur-2xl group-hover:bg-purple-500/40 transition-colors pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="text-xs text-indigo-200 font-medium mb-1 tracking-wide uppercase">Estimated Tax Payable</div>
                <div className="text-3xl font-black tracking-tight drop-shadow-md mb-1">{fmt(activeData.totalTax)}</div>
                <div className="text-[11px] text-indigo-300">On annual income of {fmt(activeData.grossIncome || 0)}</div>
              </div>
              
              {/* Illustration element */}
              <div className="absolute right-0 bottom-0 pointer-events-none flex items-end opacity-90 drop-shadow-2xl translate-x-2 translate-y-2 group-hover:translate-x-1 transition-transform">
                <div className="text-5xl mr-[-10px] z-10">📈</div>
                <div className="text-3xl pb-2">🪙</div>
              </div>
            </div>
          )}

          <div className="px-4 pt-3 pb-1">
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">BREAKDOWN</h3>
          </div>

          <div className="px-4">
            <SectionLabel letter="A" text="Your Income" />
            <div className="space-y-0.5 mb-2">
              <LineRow label="Annual salary (take-home)" amount={fmt(takeHomeSalary)} />
              {bonus > 0 && <LineRow label="Bonus / incentive" amount={fmt(bonus)} />}
              {fdInterest > 0 && <LineRow label="FD interest" amount={fmt(fdInterest)} />}
              {savingsInterest > 0 && <LineRow label="Savings account interest" amount={fmt(savingsInterest)} />}
            </div>
            <ResultBox label="Gross Income" amount={fmt(activeData.grossIncome || 0)} />
          </div>

          <div className="px-4 mt-4">
            <SectionLabel letter="B" text="Deductions (−)" />
            <div className="space-y-0.5 mb-2">
              <LineRow label="Standard deduction" amount={regime === 'new' ? '− ₹75,000' : '− ₹50,000'} green />
              {activeData.professionalTaxDeduction > 0 && <LineRow label="Professional tax" amount={`− ${fmt(activeData.professionalTaxDeduction)}`} green />}
              {activeData.employerNPSDeduction > 0 && <LineRow label="Employer NPS" amount={`− ${fmt(activeData.employerNPSDeduction)}`} green />}
              {regime === 'old' && activeData.hraExemption > 0 && <LineRow label="HRA Exemption" amount={`− ${fmt(activeData.hraExemption)}`} green />}
              {regime === 'old' && activeData.deduction80C > 0 && <LineRow label="Section 80C" amount={`− ${fmt(activeData.deduction80C)}`} green />}
              {regime === 'old' && activeData.deduction80D > 0 && <LineRow label="Health Insurance (80D)" amount={`− ${fmt(activeData.deduction80D)}`} green />}
              {regime === 'old' && activeData.deductionPersonalNPS > 0 && <LineRow label="Personal NPS (80CCD1B)" amount={`− ${fmt(activeData.deductionPersonalNPS)}`} green />}
              {regime === 'old' && activeData.deductionHomeLoanInterest > 0 && <LineRow label="Home Loan (24b)" amount={`− ${fmt(activeData.deductionHomeLoanInterest)}`} green />}
              {regime === 'old' && activeData.deduction80TTA_TTB > 0 && <LineRow label="Savings Interest" amount={`− ${fmt(activeData.deduction80TTA_TTB)}`} green />}
              
              {regime === 'new' && activeData.employerNPSDeduction === 0 && (
                <div className="flex items-start gap-1.5 mt-1.5 p-2 bg-gray-50 rounded-lg">
                  <svg className="w-3 h-3 text-gray-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-[11px] text-gray-400 leading-relaxed">New regime: only standard deduction applies.</p>
                </div>
              )}
            </div>
            <ResultBox label="Taxable Income" amount={fmt(activeData.taxableIncome || 0)} indigo />
          </div>

          <div className="px-4 mt-4">
            <SectionLabel letter="C" text="Tax on Slabs" />
            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-100 mb-2 mt-1">
              <div className="grid grid-cols-4 gap-1 px-2.5 py-2 border-b border-gray-200 bg-gray-100/50">
                <div className="col-span-1 text-[10px] font-semibold text-gray-500 uppercase">Income Slab</div>
                <div className="col-span-1 text-[10px] font-semibold text-gray-500 uppercase text-center">Rate</div>
                <div className="col-span-1 text-[10px] font-semibold text-gray-500 uppercase text-right">Your Income</div>
                <div className="col-span-1 text-[10px] font-semibold text-gray-500 uppercase text-right">Tax</div>
              </div>
              <div className="divide-y divide-gray-100">
                {slabRows.map((row, i) => (
                  <div key={i} className={`grid grid-cols-4 gap-1 px-2.5 py-1.5 text-[11px] ${row.active ? 'bg-indigo-50/60 text-indigo-700 font-medium' : 'text-gray-400'}`}>
                    <div className="col-span-1 truncate">{row.label}</div>
                    <div className="col-span-1 text-center">{row.rate}</div>
                    <div className="col-span-1 text-right">{row.incomeInBand > 0 ? fmtN(row.incomeInBand) : '0'}</div>
                    <div className="col-span-1 text-right">{row.tax > 0 ? fmtN(row.tax) : '0'}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-0.5">
              {activeData.rebate > 0 && <LineRow label="87A Rebate" amount={`− ${fmt(activeData.rebate)}`} green />}
              {activeData.marginalRelief > 0 && <LineRow label="Marginal Relief" amount={`− ${fmt(activeData.marginalRelief)}`} green />}
              <LineRow label="Health & Education Cess (4%)" amount={activeData.cess > 0 ? `+ ${fmt(activeData.cess)}` : '₹0'} muted={activeData.cess === 0} />
            </div>
            <div className="mt-2 flex justify-between items-center bg-indigo-600 rounded-xl px-3 py-2.5">
              <div className="text-xs font-bold text-indigo-200">Total Tax Payable</div>
              <div className="text-lg font-black text-white">{fmt(activeData.totalTax)}</div>
            </div>
          </div>

          {computeSuccess && savings > 0 && (
            <div className="mx-4 mt-3 mb-1 flex items-center gap-2.5 bg-green-50 border border-green-100 rounded-xl px-3 py-2.5">
              <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <p className="text-xs font-bold text-green-800 capitalize">{betterRegime} Regime saves you {fmt(savings)}</p>
                <p className="text-[10px] text-green-600 mt-0.5">vs {betterRegime === 'new' ? 'Old' : 'New'} Regime</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-center gap-2 px-4 py-3 border-t border-gray-100 bg-gray-50/50 mt-1">
        <svg className="w-3.5 h-3.5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="text-[11px] text-gray-400">100% Private & Secure · Data never leaves your browser</span>
      </div>
    </div>
  )
}
