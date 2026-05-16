export default function Logo({ dark = false, className = "", expanded = true }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/30">
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>
      {expanded && (
        <div className="text-left hidden sm:block">
          <div className={`text-sm font-bold tracking-tight leading-none ${dark ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600'}`}>
            TaxClarity
          </div>
          <div className={`text-[10px] leading-none mt-0.5 ${dark ? 'text-indigo-200/60' : 'text-gray-500 font-medium'}`}>
            India Tax Calculator
          </div>
        </div>
      )}
    </div>
  );
}
