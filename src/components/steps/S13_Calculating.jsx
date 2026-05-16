import { useEffect } from 'react'

export default function S13_Calculating({ goNext }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      goNext()
    }, 2500)
    return () => clearTimeout(timer)
  }, [goNext])

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-8">
        <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center animate-pulse-slow">
          <span className="text-4xl animate-bounce-slow">🧮</span>
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-[#FAFAFA] animate-ping"></div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-3">Crunching the numbers...</h2>
      
      <div className="flex flex-col gap-2 items-center">
        <div className="flex items-center gap-2 text-sm text-gray-500 reveal" style={{animationDelay: '0.2s'}}>
          <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          Applying standard deductions
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 reveal" style={{animationDelay: '0.8s'}}>
          <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          Comparing tax regimes
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 reveal" style={{animationDelay: '1.4s'}}>
          <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          Calculating marginal relief
        </div>
      </div>
    </div>
  )
}
