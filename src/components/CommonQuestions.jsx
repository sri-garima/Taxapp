import { useState, forwardRef, useImperativeHandle, useRef } from 'react'

const CommonQuestions = forwardRef(({ questions }, ref) => {
  const [open, setOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const containerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    openAndScroll: () => {
      setOpen(true);
      setTimeout(() => {
        containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 80);
    }
  }));

  if (!questions || questions.length === 0) return null;

  return (
    <div ref={containerRef} className="border border-gray-200 rounded-xl overflow-hidden mt-6">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <div className="text-sm font-medium text-gray-600 flex items-center gap-2">
          <svg className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
          </svg>
          Common questions about this
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="divide-y divide-gray-100 bg-white">
          {questions.map((q, i) => (
            <div key={i} className="bg-white">
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-start justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700 pr-4 leading-snug">{q.q}</span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 mt-0.5 ${openIndex === i ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-4 pb-3 reveal text-sm text-gray-600 leading-relaxed mt-2">
                  {q.a}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
})

CommonQuestions.displayName = 'CommonQuestions';
export default CommonQuestions;
