import { useEffect } from 'react'
import Logo from '../Logo'

export default function S01_Landing({ goNext }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const ChartSVG = () => (
    <svg className="w-full h-32" viewBox="0 0 400 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d="M0,80 C30,70 60,85 100,50 C140,15 160,60 200,45 C240,30 260,10 300,20 C340,30 370,40 400,10 L400,100 L0,100 Z" fill="url(#chartGrad)"/>
      <path d="M0,80 C30,70 60,85 100,50 C140,15 160,60 200,45 C240,30 260,10 300,20 C340,30 370,40 400,10" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="300" cy="20" r="4" fill="#fff" stroke="#8b5cf6" strokeWidth="2" />
      <text x="290" y="8" fill="#4b5563" fontSize="10" fontWeight="bold">Dec</text>
      <text x="280" y="-2" fill="#1f2937" fontSize="12" fontWeight="bold">₹21,450</text>
    </svg>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-sans overflow-x-hidden selection:bg-purple-500 selection:text-white">
      
      {/* 1. HERO SECTION (Dark Navy to Deep Purple) */}
      <div className="w-full bg-[#060B19] text-white relative overflow-hidden pb-20">
        
        {/* Background Gradients & Glows */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[120px]"></div>
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[150px]"></div>
          {/* Abstract curve */}
          <svg className="absolute w-full h-full opacity-20 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1440 320">
            <path fill="none" stroke="#8b5cf6" strokeWidth="0.5" strokeOpacity="0.3" d="M0,160 C320,300 420,0 740,160 C1060,320 1280,100 1440,160" />
            <path fill="none" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.2" d="M0,200 C250,350 450,50 800,200 C1150,350 1300,50 1440,150" />
          </svg>
        </div>

        {/* Navbar */}
        <nav className="relative z-20 max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <Logo dark={true} />
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
            <a href="#" className="text-white border-b-2 border-purple-500 pb-1">Home</a>
            <a href="#" className="hover:text-white transition-colors">How it Works</a>
            <a href="#" className="hover:text-white transition-colors">Tax Guide</a>
            <a href="#" className="hover:text-white transition-colors">Blog</a>
            <a href="#" className="hover:text-white transition-colors">About Us</a>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 text-xs font-semibold flex items-center gap-2">
            <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            FY 2025-26
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-10 flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-xs font-semibold text-purple-300 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
              Know. Compare. Save.
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Find out <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 border-b-4 border-purple-500/30">which tax regime</span> saves you more money this year.
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Answer a few simple questions about your salary and expenses. We'll compare both tax regimes and show you which one saves you more money — with a clear rupee-by-rupee estimate.
            </p>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-sm text-gray-300 font-medium mb-10">
              <div className="flex items-center gap-1.5"><span className="text-yellow-400">⚡</span> 2 min / Quick</div>
              <div className="flex items-center gap-1.5"><span className="text-yellow-400">🔒</span> 100% Free / No sign-up</div>
              <div className="flex items-center gap-1.5"><span className="text-gray-400">🛡️</span> Private / No data stored</div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button onClick={goNext} className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-purple-500/25 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
                Start calculation 
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 py-4 px-6 text-gray-300 hover:text-white transition-colors font-medium">
                <div className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center">
                  <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z"/></svg>
                </div>
                See how it works
              </button>
            </div>
            
            <div className="mt-8 text-xs text-gray-500">
              Built for salaried individuals only · FY 2025-26
            </div>
          </div>

          {/* Right Floating Card UI */}
          <div className="flex-1 w-full max-w-lg relative">
            {/* Background elements */}
            <div className="absolute top-10 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
            
            {/* The Glass Card */}
            <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500 border border-gray-100 text-center">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Your Tax Summary</div>
              
              <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold mb-8">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                You Save ₹18,540
              </div>

              <div className="grid grid-cols-2 gap-4 text-left">
                {/* New Regime Box (Winner) */}
                <div className="bg-indigo-50/50 rounded-2xl p-4 border-2 border-indigo-500 relative">
                  <div className="absolute -top-3 right-3 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">Best</div>
                  <div className="text-indigo-900 font-bold text-sm mb-1">New Regime</div>
                  <div className="text-3xl font-black text-indigo-900 mb-1">₹84,200</div>
                  <div className="text-xs text-indigo-400 font-medium">Total Tax</div>
                </div>
                
                {/* Old Regime Box */}
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <div className="text-gray-500 font-bold text-sm mb-1">Old Regime</div>
                  <div className="text-2xl font-bold text-gray-700 mb-1 mt-1.5">₹1,02,740</div>
                  <div className="text-xs text-gray-400 font-medium">Total Tax</div>
                </div>
              </div>

              <div className="mt-8 flex justify-center items-center gap-2 text-xs text-gray-400 font-medium">
                <svg className="w-4 h-4 text-gray-300 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/></svg>
                Switch between regimes and see the difference
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-yellow-400 rounded-full blur-2xl opacity-20 pointer-events-none"></div>
          </div>
          
        </div>
      </div>

      {/* 2. STATS SECTION */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-20 mb-16">
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 flex flex-wrap justify-between items-center gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          <div className="flex-1 flex items-center justify-center gap-4 min-w-[200px]">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900">2.5L+</div>
              <div className="text-xs text-gray-500 font-medium">Happy Users</div>
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center gap-4 min-w-[200px] pt-4 sm:pt-0">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900">10L+</div>
              <div className="text-xs text-gray-500 font-medium">Calculations Done</div>
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center gap-4 min-w-[200px] pt-4 sm:pt-0">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900">4.8/5</div>
              <div className="text-xs text-gray-500 font-medium">User Rating</div>
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center gap-4 min-w-[200px] pt-4 sm:pt-0">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900">100%</div>
              <div className="text-xs text-gray-500 font-medium">Secure & Private</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. ANALYTICS & AD SECTION */}
      <div className="max-w-6xl mx-auto px-6 mb-24 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Analytics Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-2">
                Average Savings with New Regime <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full">This Year</span>
              </h3>
              <div className="text-4xl font-black text-gray-900 mb-2 mt-4">₹17,892</div>
              <div className="text-xs text-gray-500 mb-4">Average Amount Saved</div>
              <div className="inline-flex items-center gap-1 bg-green-50 text-green-600 text-xs font-bold px-3 py-1.5 rounded-lg border border-green-100">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V3a1 1 0 012 0v9.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" transform="rotate(180 10 10)"/></svg>
                34% more savings
              </div>
            </div>
            <div className="w-full max-w-[400px] hidden sm:block pt-4">
              <ChartSVG />
              <div className="flex justify-between text-[10px] text-gray-400 font-medium mt-2 px-2">
                <span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Ad/Promo Card */}
        <div className="bg-gradient-to-br from-[#E6E6FA] to-[#D8BFD8] rounded-3xl p-8 shadow-sm relative overflow-hidden flex flex-col justify-center">
          <div className="relative z-10">
            <div className="text-purple-900 font-black tracking-tighter text-xl mb-4">acko</div>
            <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-3">Save more than just taxes!</h3>
            <p className="text-sm text-gray-700 mb-6 max-w-[200px]">Get up to 30% off on health insurance.</p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg text-sm transition-colors shadow-lg shadow-indigo-600/30">
              Explore Now
            </button>
            <div className="text-[9px] text-gray-500 mt-6">*T&C Apply</div>
          </div>
          {/* Abstract geometric shape simulating person/phone */}
          <div className="absolute -right-10 bottom-0 w-48 h-56 pointer-events-none">
            <div className="absolute bottom-0 right-10 w-32 h-40 bg-purple-300 rounded-t-full"></div>
            <div className="absolute top-4 right-16 w-16 h-20 bg-orange-200 rounded-full"></div>
            <div className="absolute top-16 right-20 w-8 h-12 bg-gray-800 rounded shadow-lg transform -rotate-12"></div>
            {/* Shield */}
            <div className="absolute bottom-6 right-6 w-16 h-20 bg-indigo-500 rounded-b-full flex items-center justify-center shadow-xl">
              <div className="text-white text-2xl font-bold">+</div>
            </div>
          </div>
        </div>

      </div>

      {/* 4. FEATURES SECTION */}
      <div className="max-w-6xl mx-auto px-6 mb-24">
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px bg-gray-200 w-12"></div>
          <h2 className="text-xl font-bold text-gray-800 text-center">Everything you need, in one place</h2>
          <div className="h-px bg-gray-200 w-12"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500 mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Old vs New Regime</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Instantly compare both regimes side by side with your exact details.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600 mb-6 group-hover:scale-110 transition-transform">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Exact Amount You Save</h3>
            <p className="text-sm text-gray-500 leading-relaxed">See the precise rupee amount you'll save by choosing the right regime.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Refund or Tax Due</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Enter your TDS to see if you'll get a refund or need to pay more tax.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500 mb-6 group-hover:scale-110 transition-transform">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Plain English</h3>
            <p className="text-sm text-gray-500 leading-relaxed">No CA jargon or confusing tax sections. Simple questions, clear answers.</p>
          </div>
        </div>
      </div>

      {/* 5. TRUSTED BY LOGOS */}
      <div className="max-w-6xl mx-auto px-6 mb-24 text-center">
        <h3 className="text-sm font-bold text-gray-500 mb-8">Trusted by professionals at</h3>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 transition-all duration-500 cursor-default select-none">
          {/* Microsoft */}
          <div className="font-bold text-2xl flex items-center gap-1">
            <div className="grid grid-cols-2 gap-[2px] w-[18px] h-[18px] mr-1">
              <div className="bg-[#f25022]"></div>
              <div className="bg-[#7fba00]"></div>
              <div className="bg-[#00a4ef]"></div>
              <div className="bg-[#ffb900]"></div>
            </div>
            <span className="text-[#737373]">Microsoft</span>
          </div>
          
          {/* Google */}
          <div className="font-serif font-bold text-[28px] tracking-tighter">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
          </div>
          
          {/* Infosys */}
          <div className="font-sans font-black text-2xl text-[#007cc3]">Infosys</div>
          
          {/* TCS */}
          <div className="font-bold text-3xl text-[#053c9f] tracking-tighter">tcs</div>
          
          {/* Wipro */}
          <div className="font-bold text-2xl italic tracking-tighter text-[#0050A1]">wipro)</div>
          
          {/* Amazon */}
          <div className="font-bold text-2xl tracking-tighter text-[#232F3E] flex flex-col items-center leading-none">
            amazon
            <div className="w-16 h-1 rounded-full bg-[#ff9900] mt-1"></div>
          </div>
          
          {/* Deloitte */}
          <div className="font-bold text-2xl text-gray-900">Deloitte<span className="text-[#86BC25]">.</span></div>
        </div>
      </div>

      {/* 6. TESTIMONIALS */}
      <div className="max-w-6xl mx-auto px-6 mb-24">
        <div className="bg-[#111827] rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
          
          <div className="flex items-center justify-between gap-4">
            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-yellow-400 text-sm mb-3">★★★★★</div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">"Super easy to use and gives accurate results. Helped me save more by choosing the right regime!"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden">
                    <img src="https://i.pravatar.cc/100?img=5" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-white text-xs font-bold">Priya Sharma</div>
                    <div className="text-gray-400 text-[10px]">Software Engineer</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-sm transform md:-translate-y-2 shadow-xl shadow-indigo-900/20">
                <div className="text-yellow-400 text-sm mb-3">★★★★★</div>
                <p className="text-gray-200 text-sm leading-relaxed mb-6">"Finally, a tax calculator that is simple, fast and actually helps you understand your savings."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden">
                    <img src="https://i.pravatar.cc/100?img=11" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-white text-xs font-bold">Arjun Mehta</div>
                    <div className="text-indigo-300 text-[10px]">Product Manager</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hidden md:block">
                <div className="text-yellow-400 text-sm mb-3">★★★★★</div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">"I saved over ₹20,000 this year thanks to TaxClarity. Highly recommended!"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden">
                    <img src="https://i.pravatar.cc/100?img=9" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-white text-xs font-bold">Neha Verma</div>
                    <div className="text-gray-400 text-[10px]">Data Analyst</div>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* 7. CTA BOTTOM BANNER */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-500 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-purple-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
          
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center text-3xl shadow-inner border border-white/30 shrink-0">
              💼
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Smart decisions today, <br/> bigger savings tomorrow.</h2>
              <p className="text-indigo-100 text-sm">Calculate in 2 minutes and keep more of what you earn.</p>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-6 w-full md:w-auto">
            <button onClick={goNext} className="w-full md:w-auto bg-white text-purple-700 hover:bg-gray-50 font-bold py-4 px-8 rounded-xl shadow-lg transition-transform transform hover:-translate-y-1 flex items-center justify-center gap-2 whitespace-nowrap">
              Start Calculation <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
            <div className="text-6xl text-white/20 font-black hidden lg:block select-none">₹</div>
          </div>
        </div>
      </div>

      {/* 8. FOOTER */}
      <footer className="w-full border-t border-gray-200 py-8 px-6 text-center">
        <div className="flex items-center justify-center gap-2 text-green-600 text-sm font-bold mb-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          100% Private & Secure
        </div>
        <p className="text-xs text-gray-500">
          We do not store or transmit your data. Calculations happen directly in your browser.
        </p>
      </footer>

    </div>
  )
}
