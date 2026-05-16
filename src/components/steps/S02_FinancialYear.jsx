import { useEffect } from 'react'
import Logo from '../Logo'

export default function S02_FinancialYear({ data, update, goNext, goBack }) {
  useEffect(() => {
    window.scrollTo(0, 0)
    if (!data.fy) {
      update({ fy: '2025-26' })
    }
  }, [data.fy, update])

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-sans selection:bg-purple-500 selection:text-white flex flex-col">
      
      {/* 1. TOP NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-6">
            <Logo dark={false} />
            
            <div className="hidden sm:block h-8 w-px bg-gray-200"></div>
            
            <button onClick={goBack} className="hidden sm:flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-full transition-colors border border-gray-200">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back
            </button>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full border border-emerald-100 shadow-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            <div className="flex flex-col text-left hidden sm:flex">
              <span className="text-[10px] font-bold uppercase tracking-wider leading-none">100% Private & Secure</span>
              <span className="text-[9px] font-medium opacity-80 mt-0.5 leading-none">Data stays in your browser</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN LAYOUT */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* LEFT SIDE: PRIMARY UI */}
        <div className="flex-1 flex flex-col gap-6 w-full lg:w-[60%]">
          
          {/* Main Dark Card */}
          <div className="bg-[#0b0a26] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl shadow-purple-900/10">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-white/10 text-gray-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/5 backdrop-blur-md">
                  Step 1 of 12
                </span>
                <span className="text-[11px] font-bold text-purple-400 tracking-widest uppercase">Financial Year</span>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8 leading-tight">
                    Which financial year are you calculating tax for?
                  </h1>

                  {/* Financial Year Selector Card */}
                  <label className="flex items-center p-5 rounded-2xl bg-[#1b1941] border-2 border-purple-500 cursor-pointer transition-all hover:bg-[#22204d] shadow-[0_0_20px_rgba(168,85,247,0.15)] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 mr-4 border border-purple-500/30">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-lg text-white">FY 2025-26</div>
                      <div className="text-xs text-purple-300 font-medium">April 2025 to March 2026</div>
                    </div>
                    <div className="w-6 h-6 rounded-full border-4 border-purple-500 bg-white flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                      <div className="w-2.5 h-2.5 bg-purple-600 rounded-full"></div>
                    </div>
                  </label>
                </div>

                {/* 3D Illustration Mockup */}
                <div className="hidden md:flex w-48 shrink-0 relative justify-center">
                  <div className="w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-purple-500/20 rounded-2xl border border-white/10 backdrop-blur-sm flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform duration-500 shadow-xl relative">
                    <div className="absolute -top-3 -right-3 text-4xl animate-bounce">✨</div>
                    <div className="text-6xl drop-shadow-2xl">📅</div>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-[#111827]/80 backdrop-blur-md rounded-2xl p-4 flex items-start gap-3 border border-gray-700/50 mb-8">
                <div className="text-indigo-400 mt-0.5 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  This calculator is updated with the latest rules for FY 2025-26 (Assessment Year 2026-27). It includes the increased standard deduction and updated new regime slabs.
                </p>
              </div>

              {/* CTA Button */}
              <button onClick={goNext} className="w-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-purple-500/25 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 text-lg group">
                Continue <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>

          {/* Promotional Banner (Below Main Card) */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-6 border border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm overflow-hidden relative">
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-t from-purple-200/50 to-transparent rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 flex-1">
              <div className="inline-block bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest mb-3">Smart Move</div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Pay less tax, build more wealth.</h3>
              <p className="text-sm text-indigo-800/80 mb-5 font-medium max-w-[280px]">
                Compare both tax regimes and find the one that saves you the most.
              </p>
              <button className="bg-white text-indigo-600 font-bold py-2.5 px-5 rounded-xl text-sm shadow-sm hover:shadow-md transition-shadow border border-indigo-100 flex items-center gap-2 w-max">
                See how it works <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>

            <div className="relative z-10 shrink-0 w-32 h-32 flex items-center justify-center bg-indigo-100 rounded-full border-4 border-white shadow-xl transform rotate-3">
               <div className="absolute -top-4 -right-8 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-lg transform rotate-12">
                 Save up to<br/><span className="text-sm">₹1,50,000+</span>
               </div>
               <span className="text-6xl drop-shadow-lg">🐷</span>
               <span className="absolute -left-2 -top-2 text-2xl animate-bounce">📈</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: LIVE PREVIEW & INFO */}
        <div className="w-full lg:w-[40%] flex flex-col gap-6">
          
          {/* Live Preview Panel (Placeholder State) */}
          <div className="bg-white rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900">Your Live Tax Estimate</h2>
              <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-100 shadow-sm">FY 2025-26</span>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex bg-gray-100/80 p-1 rounded-xl mb-8 border border-gray-200/50">
                <button className="flex-1 bg-white shadow-sm rounded-lg py-2 text-sm font-bold text-gray-900 flex items-center justify-center gap-1.5 border border-gray-100">
                  New Regime <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded uppercase tracking-wider">Best</span>
                </button>
                <button className="flex-1 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors">
                  Old Regime
                </button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center text-center py-10 px-4">
                <div className="w-32 h-32 mb-6 relative">
                  <div className="absolute inset-0 bg-indigo-50 rounded-full scale-150 blur-xl"></div>
                  <div className="relative z-10 w-full h-full bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-100 text-5xl transform rotate-3">
                    📊
                  </div>
                  <div className="absolute -bottom-2 -right-2 text-3xl z-20 animate-bounce">🪙</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Enter your salary to see a live tax estimate</h3>
                <p className="text-sm text-gray-500 max-w-[250px] mx-auto leading-relaxed">
                  We'll show your tax, deductions and potential savings.
                </p>
              </div>
            </div>

            <div className="bg-emerald-50 py-3.5 px-6 border-t border-emerald-100 flex items-center justify-center gap-2 text-emerald-700 text-xs font-bold">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              100% Private & Secure · Data never leaves your browser
            </div>
          </div>

          {/* Info Card: Why choose right FY? */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-6 text-sm">Why choose the right financial year?</h3>
            <div className="space-y-6">
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-0.5">Accurate tax calculation</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Get results as per the correct rules and slabs.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-0.5">Updated for latest tax laws</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Includes changes for FY 2025-26.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-0.5">Better planning, bigger savings</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Plan ahead and legally save more.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* 3. TRUST BAR (BOTTOM) */}
      <footer className="w-full bg-white border-t border-gray-100 py-6 mt-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center items-center gap-8 md:gap-16 text-sm">
          <div className="flex items-center gap-3">
            <span className="text-purple-600 text-xl">⚡</span>
            <div>
              <div className="font-bold text-gray-900 leading-none">2 min</div>
              <div className="text-xs text-gray-500 mt-1">Quick & Easy</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-blue-500 text-xl">🎁</span>
            <div>
              <div className="font-bold text-gray-900 leading-none">100% Free</div>
              <div className="text-xs text-gray-500 mt-1">No sign-up needed</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-indigo-500 text-xl">🔒</span>
            <div>
              <div className="font-bold text-gray-900 leading-none">Private</div>
              <div className="text-xs text-gray-500 mt-1">No data stored</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-500 text-xl">👥</span>
            <div>
              <div className="font-bold text-gray-900 leading-none">Trusted by</div>
              <div className="text-xs text-gray-500 mt-1">2.5L+ Users</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
