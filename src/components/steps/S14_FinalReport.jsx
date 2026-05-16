import { useState, useEffect } from 'react'
import { computeTax } from '../../taxEngine'
import Logo from '../Logo'

function fmtN(n) { return Number(n).toLocaleString('en-IN') }
function fmt(n) { return `₹${fmtN(n)}` }

export default function S14_FinalReport({ data, reset, results, setResults }) {
  const [showDiff, setShowDiff] = useState(false)
  
  useEffect(() => {
    window.scrollTo(0, 0)
    if (!results) {
      setResults(computeTax(data))
    }
  }, [data, results, setResults])

  if (!results) return null;

  const { newRegime, oldRegime, recommended, savings, tds } = results;
  
  const recommendedData = recommended === 'new' ? newRegime : oldRegime;
  const recommendedName = recommended === 'new' ? 'New Regime' : 'Old Regime';
  const otherName = recommended === 'new' ? 'Old Regime' : 'New Regime';
  const otherData = recommended === 'new' ? oldRegime : newRegime;

  const diffColor = (val, invert = false) => {
    if (val === 0) return 'text-gray-500';
    const isPositive = val > 0;
    const isGood = invert ? !isPositive : isPositive;
    return isGood ? 'text-emerald-400 font-medium' : 'text-rose-400 font-medium';
  };

  const getDiff = (newVal, oldVal, invert = false) => {
    const diff = newVal - oldVal;
    if (diff === 0) return <span className="text-gray-600">—</span>;
    const sign = diff > 0 ? '+' : '';
    return <span className={diffColor(diff, invert)}>{sign}{fmt(diff)}</span>;
  };

  const WinnerChart = () => (
    <svg className="w-full h-16 opacity-80 mt-[-20px]" viewBox="0 0 200 50" preserveAspectRatio="none">
      <path d="M0,40 C40,40 60,30 100,20 C140,10 160,0 200,5 L200,50 L0,50 Z" fill="url(#greenGradDark)" />
      <path d="M0,40 C40,40 60,30 100,20 C140,10 160,0 200,5" fill="none" stroke="#10b981" strokeWidth="2" />
      <circle cx="200" cy="5" r="4" fill="#10b981" />
      <circle cx="200" cy="5" r="8" fill="#10b981" opacity="0.3" />
      <defs>
        <linearGradient id="greenGradDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );

  const LoserChart = () => (
    <svg className="w-full h-16 opacity-60 mt-[-20px]" viewBox="0 0 200 50" preserveAspectRatio="none">
      <path d="M0,45 C50,45 80,30 120,40 C160,50 180,20 200,10 L200,50 L0,50 Z" fill="url(#purpleGradDark)" />
      <path d="M0,45 C50,45 80,30 120,40 C160,50 180,20 200,10" fill="none" stroke="#8b5cf6" strokeWidth="2" />
      <circle cx="200" cy="10" r="4" fill="#8b5cf6" />
      <circle cx="200" cy="10" r="8" fill="#8b5cf6" opacity="0.3" />
      <defs>
        <linearGradient id="purpleGradDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );

  return (
    <div className="min-h-screen bg-[#0B1120] text-white font-sans pb-24 relative overflow-x-hidden selection:bg-indigo-500/30">
      
      {/* Abstract Glowing Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/3 translate-x-1/3"></div>
      <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 -translate-x-1/4"></div>

      {/* Top Navbar */}
      <div className="sticky top-0 z-50 bg-[#0B1120]/80 backdrop-blur-xl border-b border-white/5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="hover:opacity-80 transition-opacity">
              <Logo dark={true} />
            </button>
            <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
            <button onClick={reset} className="flex items-center gap-1.5 text-xs font-semibold text-indigo-200 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full px-3 py-1.5 transition-colors">
              <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Back
            </button>
          </div>

          <div className="hidden md:flex flex-col items-center">
            <span className="text-sm font-bold text-white">Final Step</span>
            <span className="text-[10px] text-indigo-200/60 font-medium tracking-widest uppercase">Results & Summary</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex gap-1.5 mr-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
              ))}
              <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center -ml-1">
                <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
            </div>
            <div className="flex items-center gap-1.5 border border-white/5 bg-white/5 px-2 py-1 rounded-md">
              <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              <div className="text-left hidden sm:block">
                <div className="text-[10px] font-bold text-indigo-100 leading-none">100% Private & Secure</div>
                <div className="text-[9px] text-indigo-300/60 leading-none mt-0.5">Data stays in your browser</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 pt-10 pb-8 relative z-10 animate-[fadeIn_0.5s_ease-out]">
        
        {/* HERO SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 text-xs font-bold text-emerald-400 mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              Calculation Complete • FY 2025–26
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-white leading-[1.1]">
              You should file under the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 relative inline-block drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                {recommendedName}.
              </span>
            </h1>
            
            {savings > 0 ? (
              <p className="text-lg text-indigo-200/80 font-medium">
                Both regimes compared. You save <span className="text-emerald-400 font-bold">₹{fmtN(savings)}</span> by choosing {recommendedName}.
              </p>
            ) : (
              <p className="text-lg text-indigo-200/80 font-medium">
                Both regimes result in the exact same tax liability for your profile.
              </p>
            )}
          </div>

          <div className="hidden md:flex relative h-40 w-64 items-center justify-center">
            <div className="absolute text-7xl drop-shadow-2xl filter transform -rotate-12 -translate-x-12 translate-y-4">🧮</div>
            <div className="absolute text-8xl drop-shadow-2xl filter z-10">📋</div>
            <div className="absolute text-6xl drop-shadow-2xl filter transform rotate-12 translate-x-16 translate-y-6">🪙</div>
          </div>
        </div>

        {/* REGIME COMPARISON CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Recommended Regime */}
          <div className="bg-[#0B1120]/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-[0_0_40px_-15px_rgba(16,185,129,0.2)] flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 text-emerald-400 shadow-inner">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    {recommendedName}
                  </h2>
                  <p className="text-xs text-emerald-400/80 mt-0.5">Your lowest possible tax</p>
                </div>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold px-2.5 py-1 rounded-md uppercase tracking-widest flex items-center gap-1 shadow-sm">
                RECOMMENDED <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              </span>
            </div>

            <div className="mb-2 relative z-10">
              <div className="text-xs font-semibold text-emerald-400/60 uppercase tracking-widest mb-1.5">Total Tax Payable</div>
              <div className="text-5xl font-black text-white tracking-tight drop-shadow-md">{fmt(recommendedData.totalTax)}</div>
            </div>

            <WinnerChart />

            <div className="mt-4 bg-[#131C35]/50 rounded-xl px-5 py-3.5 flex justify-between items-center border border-white/5 relative z-10 backdrop-blur-sm">
              <span className="text-sm font-medium text-indigo-200">Taxable Income</span>
              <span className="font-bold text-white text-lg">{fmt(recommendedData.taxableIncome)}</span>
            </div>
          </div>

          {/* Other Regime */}
          <div className="bg-[#0B1120]/40 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-sm flex flex-col justify-between relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex items-center gap-3 opacity-70">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400 shadow-inner">
                  <span className="text-xl font-bold">%</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{otherName}</h2>
                  <p className="text-xs text-indigo-300/60 mt-0.5">Results in higher tax for your profile</p>
                </div>
              </div>
            </div>

            <div className="mb-2 relative z-10 opacity-90">
              <div className="text-xs font-semibold text-indigo-300/50 uppercase tracking-widest mb-1.5">Total Tax Payable</div>
              <div className="text-5xl font-black text-white tracking-tight">{fmt(otherData.totalTax)}</div>
            </div>

            <LoserChart />

            <div className="mt-4 bg-[#131C35]/30 rounded-xl px-5 py-3.5 flex justify-between items-center border border-white/5 relative z-10 backdrop-blur-sm">
              <span className="text-sm font-medium text-indigo-300/70">Taxable Income</span>
              <span className="font-bold text-white/80 text-lg">{fmt(otherData.taxableIncome)}</span>
            </div>
          </div>
        </div>

        {/* MAIN COMPARISON & SAVINGS GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          
          {/* Detailed Comparison Table (Left 2 cols) */}
          <div className="xl:col-span-2 bg-[#0B1120]/60 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-xl flex flex-col">
            <div className="px-6 sm:px-8 py-5 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                <h3 className="text-base font-bold text-white">Detailed Comparison</h3>
              </div>
              <div className="flex items-center gap-3 text-xs font-medium text-indigo-200/80 cursor-pointer hover:text-white transition-colors" onClick={() => setShowDiff(!showDiff)}>
                Show difference
                <div className={`w-10 h-5 rounded-full relative transition-colors border ${showDiff ? 'bg-purple-500 border-purple-500' : 'bg-white/10 border-white/20'}`}>
                  <div className={`absolute top-[1px] left-[1px] w-4 h-4 rounded-full bg-white transition-transform ${showDiff ? 'translate-x-5' : ''}`}></div>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-sm whitespace-nowrap h-full">
                <thead>
                  <tr className="bg-black/20 text-indigo-300/50 text-[10px] uppercase tracking-widest border-b border-white/5">
                    <th className="px-6 sm:px-8 py-4 font-semibold w-[40%]">Component</th>
                    <th className="px-6 py-4 font-semibold text-right text-indigo-300 w-[20%]">Old Regime</th>
                    <th className="px-6 py-4 font-semibold text-right text-emerald-400 w-[20%]">New Regime</th>
                    {showDiff && <th className="px-6 sm:px-8 py-4 font-semibold text-right text-gray-400 w-[20%]">Difference</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {/* Gross Income */}
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 sm:px-8 py-3.5 font-medium text-indigo-100 flex items-center gap-2">
                      <svg className="w-4 h-4 text-indigo-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Gross Income
                    </td>
                    <td className="px-6 py-3.5 text-right text-white font-medium">{fmt(oldRegime.grossIncome)}</td>
                    <td className="px-6 py-3.5 text-right text-white font-medium">{fmt(newRegime.grossIncome)}</td>
                    {showDiff && <td className="px-6 sm:px-8 py-3.5 text-right">{getDiff(newRegime.grossIncome, oldRegime.grossIncome)}</td>}
                  </tr>

                  {/* Deductions Header */}
                  <tr className="bg-indigo-500/10">
                    <td colSpan={showDiff ? 4 : 3} className="px-6 sm:px-8 py-2.5 text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                        Deductions (−)
                      </div>
                    </td>
                  </tr>

                  {/* Deductions Items */}
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 sm:px-8 py-3 text-indigo-200/80 pl-12 sm:pl-14 relative">
                      <span className="absolute left-6 sm:left-8 text-indigo-500/50">•</span>Standard Deduction
                    </td>
                    <td className="px-6 py-3 text-right text-white/90">{fmt(oldRegime.standardDeduction)}</td>
                    <td className="px-6 py-3 text-right text-white/90">{fmt(newRegime.standardDeduction)}</td>
                    {showDiff && <td className="px-6 sm:px-8 py-3 text-right">{getDiff(newRegime.standardDeduction, oldRegime.standardDeduction)}</td>}
                  </tr>

                  {oldRegime.deduction80C > 0 && (
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 sm:px-8 py-3 text-indigo-200/80 pl-12 sm:pl-14 relative"><span className="absolute left-6 sm:left-8 text-indigo-500/50">•</span>Section 80C</td>
                      <td className="px-6 py-3 text-right text-white/90">{fmt(oldRegime.deduction80C)}</td>
                      <td className="px-6 py-3 text-right text-white/30">₹0</td>
                      {showDiff && <td className="px-6 sm:px-8 py-3 text-right">{getDiff(0, oldRegime.deduction80C, true)}</td>}
                    </tr>
                  )}
                  {oldRegime.hraExemption > 0 && (
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 sm:px-8 py-3 text-indigo-200/80 pl-12 sm:pl-14 relative"><span className="absolute left-6 sm:left-8 text-indigo-500/50">•</span>HRA Exemption</td>
                      <td className="px-6 py-3 text-right text-white/90">{fmt(oldRegime.hraExemption)}</td>
                      <td className="px-6 py-3 text-right text-white/30">₹0</td>
                      {showDiff && <td className="px-6 sm:px-8 py-3 text-right">{getDiff(0, oldRegime.hraExemption, true)}</td>}
                    </tr>
                  )}
                  {oldRegime.deduction80D > 0 && (
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 sm:px-8 py-3 text-indigo-200/80 pl-12 sm:pl-14 relative"><span className="absolute left-6 sm:left-8 text-indigo-500/50">•</span>Medical Insurance (80D)</td>
                      <td className="px-6 py-3 text-right text-white/90">{fmt(oldRegime.deduction80D)}</td>
                      <td className="px-6 py-3 text-right text-white/30">₹0</td>
                      {showDiff && <td className="px-6 sm:px-8 py-3 text-right">{getDiff(0, oldRegime.deduction80D, true)}</td>}
                    </tr>
                  )}

                  {/* Net Taxable */}
                  <tr className="bg-[#131C35]/50 border-t border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 sm:px-8 py-4 font-bold text-indigo-100 flex items-center gap-2">
                      <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                      Net Taxable Income
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-white">{fmt(oldRegime.taxableIncome)}</td>
                    <td className="px-6 py-4 text-right font-bold text-white">{fmt(newRegime.taxableIncome)}</td>
                    {showDiff && <td className="px-6 sm:px-8 py-4 text-right font-bold">{getDiff(newRegime.taxableIncome, oldRegime.taxableIncome, true)}</td>}
                  </tr>

                  {/* Base Tax */}
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 sm:px-8 py-3.5 font-medium text-indigo-200/80 flex items-center gap-2">
                      <svg className="w-4 h-4 text-indigo-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Base Tax on Slabs
                    </td>
                    <td className="px-6 py-3.5 text-right text-white/90">{fmt(oldRegime.slabTax)}</td>
                    <td className="px-6 py-3.5 text-right text-white/90">{fmt(newRegime.slabTax)}</td>
                    {showDiff && <td className="px-6 sm:px-8 py-3.5 text-right">{getDiff(newRegime.slabTax, oldRegime.slabTax, true)}</td>}
                  </tr>

                  {(oldRegime.rebate > 0 || newRegime.rebate > 0) && (
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 sm:px-8 py-3 text-emerald-400 pl-12 sm:pl-14 relative"><span className="absolute left-6 sm:left-8 text-emerald-500/50">•</span>Less: 87A Rebate</td>
                      <td className="px-6 py-3 text-right text-emerald-400">{oldRegime.rebate > 0 ? `− ${fmt(oldRegime.rebate)}` : '₹0'}</td>
                      <td className="px-6 py-3 text-right text-emerald-400">{newRegime.rebate > 0 ? `− ${fmt(newRegime.rebate)}` : '₹0'}</td>
                      {showDiff && <td className="px-6 sm:px-8 py-3 text-right">{getDiff(-newRegime.rebate, -oldRegime.rebate)}</td>}
                    </tr>
                  )}

                  {(oldRegime.cess > 0 || newRegime.cess > 0) && (
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 sm:px-8 py-3 text-indigo-200/80 pl-12 sm:pl-14 relative"><span className="absolute left-6 sm:left-8 text-indigo-500/50">•</span>Health & Edu Cess (4%)</td>
                      <td className="px-6 py-3 text-right text-white/90">{fmt(oldRegime.cess)}</td>
                      <td className="px-6 py-3 text-right text-white/90">{fmt(newRegime.cess)}</td>
                      {showDiff && <td className="px-6 sm:px-8 py-3 text-right">{getDiff(newRegime.cess, oldRegime.cess, true)}</td>}
                    </tr>
                  )}

                  {/* Final Tax Liability */}
                  <tr className="bg-black/30 border-t border-white/10 mt-auto">
                    <td className="px-6 sm:px-8 py-5 font-bold text-white flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                      Total Tax Payable
                    </td>
                    <td className={`px-6 py-5 text-right font-black text-lg ${recommended === 'old' ? 'text-emerald-400' : 'text-white'}`}>{fmt(oldRegime.totalTax)}</td>
                    <td className={`px-6 py-5 text-right font-black text-lg ${recommended === 'new' ? 'text-emerald-400' : 'text-white'}`}>{fmt(newRegime.totalTax)}</td>
                    {showDiff && <td className="px-6 sm:px-8 py-5 text-right font-bold text-lg text-emerald-400 bg-emerald-500/10 border-l border-emerald-500/20">{savings > 0 ? `You Save ${fmt(savings)}` : 'No Diff'}</td>}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Savings & Insights */}
          <div className="xl:col-span-1 flex flex-col gap-6">
            
            {/* Savings Card */}
            <div className="bg-gradient-to-br from-[#022c22] to-[#064e3b] rounded-3xl p-6 sm:p-8 border border-emerald-500/20 shadow-lg relative overflow-hidden group flex-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/30 transition-colors"></div>
              
              <div className="relative z-10 flex justify-between items-start mb-6">
                <div>
                  <div className="text-sm text-emerald-100 font-medium mb-1">You Save</div>
                  <div className="text-5xl font-black text-emerald-400 tracking-tight drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]">₹{fmtN(savings)}</div>
                  <div className="text-xs text-emerald-200 mt-2">with {recommendedName}</div>
                </div>
                <div className="w-16 h-16 flex items-center justify-center text-5xl drop-shadow-xl animate-bounce-slow">
                  🐷
                </div>
              </div>

              <div className="bg-[#0B1120]/60 backdrop-blur-md rounded-2xl p-5 border border-white/5 relative z-10 shadow-inner">
                <h4 className="font-bold text-sm text-white mb-4">Why {recommendedName} is Better?</h4>
                <ul className="space-y-3 text-sm">
                  {recommended === 'new' ? (
                    <>
                      <li className="flex items-start gap-2.5">
                        <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="text-emerald-50/90">Lower or zero tax outgo</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="text-emerald-50/90">Simpler with fewer deductions</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="text-emerald-50/90">More take-home income</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start gap-2.5">
                        <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="text-emerald-50/90">Fully utilizes your limits</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="text-emerald-50/90">Rewards tax investments</span>
                      </li>
                    </>
                  )}
                </ul>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-start gap-2 text-[10px] text-indigo-300/80 bg-[#0B1120] p-3 rounded-xl border border-white/5">
                  <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Note: Both regimes have the same tax liability in your case.
                </div>
              </div>
            </div>

            {/* Promo Card */}
            <div className="bg-gradient-to-br from-[#2e1065] to-[#4c1d95] rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-lg relative overflow-hidden group flex-shrink-0">
              <div className="inline-flex items-center gap-1.5 bg-purple-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md mb-4 uppercase tracking-wider shadow-sm">
                Smart Move
              </div>
              <h3 className="text-2xl font-black text-white leading-tight mb-3 relative z-10 tracking-tight">
                Keep more of <br />what you earn.
              </h3>
              <p className="text-sm text-purple-200 mb-6 max-w-[200px] relative z-10 leading-relaxed">
                {recommendedName} helps you save more with a smarter tax structure.
              </p>
              <button className="bg-white text-purple-900 font-bold text-sm px-5 py-3 rounded-xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all flex items-center gap-2 relative z-10">
                Explore Benefits <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
              
              <div className="absolute right-0 bottom-0 pointer-events-none flex items-end opacity-90">
                <div className="text-7xl drop-shadow-2xl translate-x-2 translate-y-2">🐷</div>
                <div className="text-5xl drop-shadow-2xl absolute -right-4 top-4">📈</div>
                <div className="text-3xl drop-shadow-2xl absolute left-4 -top-8">🪙</div>
              </div>
            </div>

          </div>
        </div>

        {/* TRUST STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-xl shrink-0">🛡️</div>
            <div>
              <div className="text-sm font-bold text-white">100% Accurate</div>
              <div className="text-[10px] text-indigo-200/70">As per latest tax laws</div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl shrink-0">⏱️</div>
            <div>
              <div className="text-sm font-bold text-white">Saves Time</div>
              <div className="text-[10px] text-indigo-200/70">Quick & easy calculation</div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-xl shrink-0">👛</div>
            <div>
              <div className="text-sm font-bold text-white">Maximize Savings</div>
              <div className="text-[10px] text-indigo-200/70">Save more every year</div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl shrink-0">🔒</div>
            <div>
              <div className="text-sm font-bold text-white">100% Private</div>
              <div className="text-[10px] text-indigo-200/70">Data stays in browser</div>
            </div>
          </div>
        </div>

        {/* FINAL ACTIONS */}
        <div className="flex flex-col items-center justify-center pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-2xl">
            <button onClick={() => window.print()} className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-purple-500/20 flex items-center justify-center gap-3 transform hover:-translate-y-1 w-full sm:w-auto text-lg focus:ring-4 focus:ring-purple-500/30">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              Print / Download Summary
            </button>
            <button onClick={reset} className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-4 px-8 rounded-2xl transition-all flex items-center justify-center gap-3 w-full sm:w-auto hover:-translate-y-1">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              Start Over
            </button>
            <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 w-full sm:w-auto hover:-translate-y-1">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              Share Result
            </button>
          </div>
          <p className="text-sm text-indigo-300/60 mt-6 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            You can print or save this summary for your records.
          </p>
        </div>
      </div>
    </div>
  )
}
