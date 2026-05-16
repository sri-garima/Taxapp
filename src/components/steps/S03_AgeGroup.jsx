import { useEffect, useState } from 'react'
import Logo from '../Logo'

export default function S03_AgeGroup({ data, update, goNext, goBack }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [faqOpen, setFaqOpen] = useState(false);
  const [error, setError] = useState(false)

  const handleNext = () => {
    if (!data.ageGroup) {
      setError(true)
      return
    }
    setError(false)
    goNext()
  }

  const handleSelect = (val) => {
    update({ ageGroup: val })
    setError(false)
  }

  const options = [
    {
      id: 'below60',
      title: 'Below 60 years',
      desc: 'Basic exemption: ₹2,50,000 under old regime',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
      ),
      iconBg: 'bg-indigo-500/20 text-indigo-400',
      badge: null
    },
    {
      id: 'senior',
      title: '60 to 79 years',
      desc: 'Basic exemption: ₹3,00,000 under old regime',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
      ),
      iconBg: 'bg-emerald-500/20 text-emerald-400',
      badge: <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">Senior Citizen</span>
    },
    {
      id: 'superSenior',
      title: '80 years or above',
      desc: 'Basic exemption: ₹5,00,000 under old regime',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
      ),
      iconBg: 'bg-amber-500/20 text-amber-400',
      badge: <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30">Super Senior Citizen</span>
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-sans selection:bg-purple-500 selection:text-white flex flex-col">
      
      {/* 1. TOP NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-6">
            <Logo dark={false} />
            
            <div className="hidden sm:block h-8 w-px bg-gray-200"></div>
            
            <button onClick={goBack} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-full transition-colors border border-gray-200">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back
            </button>
            
            <div className="hidden md:flex items-center gap-4 ml-4">
               <span className="text-sm font-bold text-indigo-600">Step 2 of 12</span>
               <span className="text-sm font-medium text-gray-400">|</span>
               <span className="text-sm font-medium text-gray-500">Your Age Group</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="hidden lg:flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-indigo-200"></div>
              <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
              <div className="w-2 h-2 rounded-full bg-gray-200"></div>
              <div className="w-2 h-2 rounded-full bg-gray-200"></div>
              <div className="w-2 h-2 rounded-full bg-gray-200"></div>
              <div className="w-2 h-2 rounded-full bg-gray-200"></div>
              <div className="w-2 h-2 rounded-full bg-gray-200"></div>
              <div className="w-2 h-2 rounded-full bg-gray-200"></div>
              <div className="w-2 h-2 rounded-full bg-gray-200"></div>
              <div className="w-2 h-2 rounded-full bg-gray-200"></div>
             </div>

            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full border border-emerald-100 shadow-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              <div className="flex flex-col text-left hidden sm:flex">
                <span className="text-[10px] font-bold uppercase tracking-wider leading-none">100% Private & Secure</span>
                <span className="text-[9px] font-medium opacity-80 mt-0.5 leading-none">Data stays in your browser</span>
              </div>
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
                <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-indigo-500/30 backdrop-blur-md flex items-center gap-1.5">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/></svg>
                  ABOUT YOU
                </span>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 leading-tight">
                    Which age group do you fall in?
                  </h1>
                  <p className="text-indigo-200/80 text-sm mb-8">This helps us apply the right tax rules and exemptions.</p>

                  <div className="space-y-4">
                    {options.map(opt => {
                      const isSelected = data.ageGroup === opt.id;
                      return (
                        <label 
                          key={opt.id}
                          className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all hover:-translate-y-0.5 shadow-lg relative overflow-hidden group ${
                            isSelected 
                              ? 'bg-[#1b1941] border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.15)]' 
                              : 'bg-[#1b1941]/50 border-white/5 hover:border-white/10 hover:bg-[#22204d]'
                          }`}
                        >
                          <input 
                            type="radio" 
                            name="ageGroup" 
                            value={opt.id}
                            checked={isSelected}
                            onChange={() => handleSelect(opt.id)}
                            className="sr-only"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-0 transition-opacity ${isSelected ? 'opacity-100' : 'group-hover:opacity-50'}`}></div>
                          
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 border border-white/5 shadow-inner z-10 ${opt.iconBg}`}>
                            {opt.icon}
                          </div>
                          
                          <div className="flex-1 z-10">
                            <div className="flex items-center gap-2">
                              <div className={`font-bold text-lg ${isSelected ? 'text-white' : 'text-gray-200'}`}>{opt.title}</div>
                              {opt.badge}
                            </div>
                            <div className="text-xs text-indigo-300/70 font-medium mt-0.5">{opt.desc}</div>
                          </div>
                          
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 transition-colors ${
                            isSelected ? 'border-indigo-500 bg-white shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'border-white/20 bg-transparent'
                          }`}>
                            {isSelected && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></div>}
                          </div>
                        </label>
                      )
                    })}
                  </div>
                </div>

                {/* 3D Illustration Mockup */}
                <div className="hidden md:flex w-40 shrink-0 relative justify-center mt-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-full blur-xl absolute"></div>
                  <div className="relative z-10 transform hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                    <div className="text-7xl drop-shadow-2xl">👥</div>
                    <div className="absolute -bottom-2 -right-4 text-5xl drop-shadow-xl">🛡️</div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm font-medium flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Please select an age group to continue.
                </div>
              )}

              {/* CTA Button */}
              <button onClick={handleNext} className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 text-lg group">
                Continue <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>

              {/* Custom FAQ Accordion */}
              <div className="mt-6 border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm">
                <button 
                  onClick={() => setFaqOpen(!faqOpen)} 
                  className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-indigo-200">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Common questions about this
                  </div>
                  <svg className={`w-4 h-4 text-indigo-400 transition-transform ${faqOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {faqOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-indigo-200/80 space-y-4">
                    <div>
                      <strong className="block text-indigo-100 mb-1">Why does my age matter?</strong>
                      The old tax regime provides a higher basic exemption limit for senior citizens (₹3L) and super senior citizens (₹5L), compared to those below 60 (₹2.5L).
                    </div>
                    <div>
                      <strong className="block text-indigo-100 mb-1">Does the new regime have different slabs for seniors?</strong>
                      No, under the new tax regime, the slabs and basic exemption limit (₹3L) are the same for all age groups.
                    </div>
                    <div>
                      <strong className="block text-indigo-100 mb-1">How is my age determined for this financial year?</strong>
                      Your age is considered as of March 31, 2026. If you complete 60 years on or before this date, you are considered a senior citizen for FY 2025-26.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Promotional Banner */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-6 border border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm overflow-hidden relative">
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-t from-purple-200/50 to-transparent rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 flex-1">
              <div className="inline-block bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest mb-3">Smart Move</div>
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
                  <div className="relative z-10 w-full h-full bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-100 text-5xl transform -rotate-3">
                    📊
                  </div>
                  <div className="absolute -top-4 -right-2 text-3xl z-20 animate-bounce">🧮</div>
                  <div className="absolute -bottom-2 -left-2 text-3xl z-20">🪙</div>
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

          {/* Info Card: Why this matters? */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-6 text-sm">Why this matters?</h3>
            <div className="space-y-6">
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-0.5">Accurate tax calculation</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Get results as per latest tax rules.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-0.5">Higher exemptions for seniors</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Save more with age-based benefits.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
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
            <span className="text-indigo-600 text-xl">⚡</span>
            <div>
              <div className="font-bold text-gray-900 leading-none">2 min</div>
              <div className="text-xs text-gray-500 mt-1">Quick & Easy</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-500 text-xl">🎁</span>
            <div>
              <div className="font-bold text-gray-900 leading-none">100% Free</div>
              <div className="text-xs text-gray-500 mt-1">No sign-up needed</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-amber-500 text-xl">🔒</span>
            <div>
              <div className="font-bold text-gray-900 leading-none">Private</div>
              <div className="text-xs text-gray-500 mt-1">No data stored</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-indigo-500 text-xl">👥</span>
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
