import { useState } from 'react'
import S01_Landing from './components/steps/S01_Landing'
import S02_FinancialYear from './components/steps/S02_FinancialYear'
import S03_AgeGroup from './components/steps/S03_AgeGroup'
import S04_SalaryDetails from './components/steps/S04_SalaryDetails'
import S05_SalaryComponents from './components/steps/S05_SalaryComponents'
import S06_OtherIncome from './components/steps/S06_OtherIncome'
import S07_Exemptions from './components/steps/S07_Exemptions'
import S08_Investments80C from './components/steps/S08_Investments80C'
import S09_MedicalInsurance from './components/steps/S09_MedicalInsurance'
import S10_NPS from './components/steps/S10_NPS'
import S11_HomeLoan from './components/steps/S11_HomeLoan'
import S12_TDS from './components/steps/S12_TDS'
import S13_Calculating from './components/steps/S13_Calculating'
import S14_FinalReport from './components/steps/S14_FinalReport'
import StepWrapper from './components/StepWrapper'

export const INITIAL_STATE = {
  fy: '2025-26',
  ageGroup: null,              
  basicSalaryMonthly: '',
  takeHomeSalaryMonthly: '',
  hasBonus: null,              
  bonus: '',                   
  hasHRA: false,
  hraMonthly: '',
  hasProfTax: false,
  professionalTax: '',         
  hasEmployerNPS: false,
  employerNPS: '',             
  hasOtherIncome: null,        
  fdInterest: '',
  savingsInterest: '',
  paysRent: null,              
  monthlyRent: '',
  cityType: null,              
  hasHRAInSalary: null,        
  investments80C: {
    epf: '',
    lic: '',
    ppf: '',
    elss: '',
    tuition: '',
    homeLoanPrincipal: '',
    nsc: '',
  },
  has80CItems: [],             
  hasPersonalNPS: null,        
  personalNPS: '',             
  hasSelfInsurance: null,      
  selfInsurancePremium: '',    
  hasParentInsurance: null,    
  parentInsurancePremium: '',  
  parentsAbove60: null,        
  hasHomeLoan: null,           
  loanOwnership: null,         
  homeLoanInterest: '',        
  hasTDS: null,                
  tdsDeducted: '',             
  bankTDS: '',                 
}

export default function App() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState(INITIAL_STATE)
  const [results, setResults] = useState(null)

  function update(fields) { setData(prev => ({ ...prev, ...fields })) }
  function goNext() { setStep(s => s + 1) }
  function goBack() { setStep(s => Math.max(1, s - 1)) }
  function skipTo(targetStep) { setStep(targetStep) }
  function reset() { setData(INITIAL_STATE); setResults(null); setStep(1) }

  const PROGRESS_STEPS = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const TOTAL_PROGRESS = 10
  const progressStep = PROGRESS_STEPS.indexOf(step) + 1
  const showProgress = PROGRESS_STEPS.includes(step)

  const sharedProps = { data, update, goNext, goBack, skipTo, step, progressStep, showProgress, TOTAL_PROGRESS }

  let currentStepContent = null;
  switch (step) {
    case 1: currentStepContent = <S01_Landing goNext={goNext} />; break;
    case 2: currentStepContent = <S02_FinancialYear {...sharedProps} />; break;
    case 3: currentStepContent = <S03_AgeGroup {...sharedProps} />; break;
    case 4: currentStepContent = <S04_SalaryDetails {...sharedProps} />; break;
    case 5: currentStepContent = <S05_SalaryComponents {...sharedProps} />; break;
    case 6: currentStepContent = <S06_OtherIncome {...sharedProps} />; break;
    case 7: currentStepContent = <S07_Exemptions {...sharedProps} />; break;
    case 8: currentStepContent = <S08_Investments80C {...sharedProps} />; break;
    case 9: currentStepContent = <S09_MedicalInsurance {...sharedProps} />; break;
    case 10: currentStepContent = <S10_NPS {...sharedProps} />; break;
    case 11: currentStepContent = <S11_HomeLoan {...sharedProps} />; break;
    case 12: currentStepContent = <S12_TDS {...sharedProps} />; break;
    case 13: currentStepContent = <S13_Calculating goNext={goNext} />; break;
    case 14: currentStepContent = <S14_FinalReport data={data} reset={reset} results={results} setResults={setResults} />; break;
    default: 
      currentStepContent = (
        <StepWrapper {...sharedProps} stepName="Error" reset={reset}>
           <div className="text-center py-10 bg-red-50 rounded-xl border border-red-100">
              <h2 className="text-xl font-bold mb-2 text-red-600">Something went wrong</h2>
              <button onClick={reset} className="text-indigo-600 underline font-medium text-sm">Start Over</button>
           </div>
        </StepWrapper>
      );
  }

  return (
    <>
      {currentStepContent}
    </>
  )
}
