import { 
  NEW_REGIME_SLABS, 
  OLD_REGIME_SLABS_BELOW60,
  OLD_REGIME_SLABS_SENIOR,
  OLD_REGIME_SLABS_SUPER_SENIOR,
  STANDARD_DEDUCTION_NEW, 
  STANDARD_DEDUCTION_OLD,
  PROF_TAX_CAP
} from './constants';
import { toNum } from './utils';

export const EMPTY_REGIME = {
  grossIncome: 0, taxableIncome: 0, standardDeduction: 0,
  professionalTaxDeduction: 0, hraExemption: 0, deduction80C: 0,
  deduction80D: 0, deductionPersonalNPS: 0, employerNPSDeduction: 0,
  deductionHomeLoanInterest: 0, deduction80TTA_TTB: 0,
  slabTax: 0, rebate: 0, marginalRelief: 0, cess: 0, totalTax: 0,
}

export function applySlabs(income, slabs) {
  if (income <= 0) return 0;
  let tax = 0, prev = 0;
  for (const { upTo, rate } of slabs) {
    if (upTo === null) { tax += (income - prev) * rate; break; }
    if (income <= upTo) { tax += (income - prev) * rate; break; }
    tax += (upTo - prev) * rate;
    prev = upTo;
  }
  return Math.round(tax);
}

export function calculateGrossIncome(data) {
  const takeHome = (toNum(data.takeHomeSalaryMonthly) * 12);
  const bonus = data.hasBonus ? toNum(data.bonus) : 0;
  const fdInterest = data.hasOtherIncome ? toNum(data.fdInterest) : 0;
  const savingsInterest = data.hasOtherIncome ? toNum(data.savingsInterest) : 0;
  const basicPay = toNum(data.basicSalaryMonthly) * 12;
  const employerNPS = data.hasEmployerNPS ? Math.min(toNum(data.employerNPS), basicPay * 0.14) : 0;
  
  return takeHome + bonus + fdInterest + savingsInterest + employerNPS;
}

export function computeTax(data) {
  const ageGroup = data.ageGroup || 'below60';
  const isSenior = ageGroup === 'senior';
  const isSuperSenior = ageGroup === 'superSenior';
  const isSeniorOrAbove = isSenior || isSuperSenior;

  // 1. Gross Income
  const takeHome = toNum(data.takeHomeSalaryMonthly) * 12;
  const bonus = data.hasBonus ? toNum(data.bonus) : 0;
  const basicPay = toNum(data.basicSalaryMonthly) * 12;
  const hraReceived = data.hasHRA ? toNum(data.hraMonthly) * 12 : 0;
  
  const fdInterest = data.hasOtherIncome ? toNum(data.fdInterest) : 0;
  const savingsInterest = data.hasOtherIncome ? toNum(data.savingsInterest) : 0;
  const employerNPS = data.hasEmployerNPS ? Math.min(toNum(data.employerNPS), basicPay * 0.14) : 0;
  
  const grossIncome = takeHome + bonus + fdInterest + savingsInterest + employerNPS;
  
  // Deductions - Shared
  const profTax = data.hasProfTax ? Math.min(toNum(data.professionalTax), PROF_TAX_CAP) : 0;
  const stdDeductionNew = STANDARD_DEDUCTION_NEW; 
  const stdDeductionOld = STANDARD_DEDUCTION_OLD; 
  
  // Deductions - Old Regime Only
  // HRA
  let hraExemption = 0;
  if (data.hasHRA && data.paysRent) {
    const rentPaid = toNum(data.monthlyRent) * 12;
    const rentMinus10PctBasic = Math.max(0, rentPaid - (0.10 * basicPay));
    const pctOfBasic = data.cityType === 'metro' ? 0.50 : 0.40;
    const limitBasic = pctOfBasic * basicPay;
    hraExemption = Math.min(hraReceived, rentMinus10PctBasic, limitBasic);
  } else if (!data.hasHRA && data.paysRent) {
    // Section 80GG
    const rentPaid = toNum(data.monthlyRent) * 12;
    const rentMinus10PctIncome = Math.max(0, rentPaid - (0.10 * grossIncome)); 
    hraExemption = Math.min(60000, rentMinus10PctIncome, 0.25 * grossIncome);
  }

  // 80C
  const active80C = data.has80CItems || [];
  let total80C = active80C.reduce((sum, key) => sum + toNum(data.investments80C[key]), 0);
  const deduction80C = Math.min(total80C, 150000);

  // 80CCD(1B) NPS
  const deductionPersonalNPS = data.hasPersonalNPS ? Math.min(toNum(data.personalNPS), 50000) : 0;

  // 80D Medical
  let deduction80D = 0;
  if (data.hasSelfInsurance) {
    const selfPrem = toNum(data.selfInsurancePremium);
    deduction80D += Math.min(selfPrem, isSeniorOrAbove ? 50000 : 25000);
  }
  if (data.hasParentInsurance) {
    const parentPrem = toNum(data.parentInsurancePremium);
    deduction80D += Math.min(parentPrem, data.parentsAbove60 ? 50000 : 25000);
  }

  // 24(B) Home Loan
  const deductionHomeLoanInterest = data.hasHomeLoan ? Math.min(toNum(data.homeLoanInterest), 200000) : 0;

  // 80TTA / 80TTB
  let deduction80TTA_TTB = 0;
  if (savingsInterest > 0) {
    deduction80TTA_TTB = Math.min(savingsInterest, isSeniorOrAbove ? 50000 : 10000);
  }
  if (isSeniorOrAbove && fdInterest > 0) {
     const totalInterest = savingsInterest + fdInterest;
     deduction80TTA_TTB = Math.min(totalInterest, 50000);
  }

  // OLD REGIME CALCULATION
  const oldDeductions = stdDeductionOld + profTax + employerNPS + hraExemption + deduction80C + deduction80D + deductionPersonalNPS + deductionHomeLoanInterest + deduction80TTA_TTB;
  const oldTaxable = Math.max(0, grossIncome - oldDeductions);
  const oldSlabs = isSuperSenior ? OLD_REGIME_SLABS_SUPER_SENIOR : (isSenior ? OLD_REGIME_SLABS_SENIOR : OLD_REGIME_SLABS_BELOW60);
  const oldSlabTax = applySlabs(oldTaxable, oldSlabs);
  const oldRebate = oldTaxable <= 500000 ? Math.min(oldSlabTax, 12500) : 0;
  const oldTaxAfterRebate = oldSlabTax - oldRebate;
  const oldCess = Math.round(oldTaxAfterRebate * 0.04);
  const oldTotalTax = oldTaxAfterRebate + oldCess;

  // NEW REGIME CALCULATION
  const newDeductions = stdDeductionNew + employerNPS;
  const newTaxable = Math.max(0, grossIncome - newDeductions);
  const newSlabTax = applySlabs(newTaxable, NEW_REGIME_SLABS);
  
  // Rebate 87A (New Regime)
  let newRebate = 0;
  let marginalRelief = 0;
  if (newTaxable <= 1200000) {
    newRebate = Math.min(newSlabTax, 120000); 
  } else {
    // Marginal Relief
    const excessIncome = newTaxable - 1200000;
    const maxTax = excessIncome; 
    if (newSlabTax > maxTax) {
      marginalRelief = newSlabTax - maxTax;
    }
  }
  
  const newTaxAfterRelief = newSlabTax - newRebate - marginalRelief;
  const newCess = Math.round(newTaxAfterRelief * 0.04);
  const newTotalTax = newTaxAfterRelief + newCess;

  const oldRegimeObj = {
    ...EMPTY_REGIME,
    grossIncome, taxableIncome: oldTaxable, standardDeduction: stdDeductionOld,
    professionalTaxDeduction: profTax, hraExemption, deduction80C, deduction80D,
    deductionPersonalNPS, employerNPSDeduction: employerNPS, deductionHomeLoanInterest,
    deduction80TTA_TTB, slabTax: oldSlabTax, rebate: oldRebate, marginalRelief: 0,
    cess: oldCess, totalTax: oldTotalTax
  };

  const newRegimeObj = {
    ...EMPTY_REGIME,
    grossIncome, taxableIncome: newTaxable, standardDeduction: stdDeductionNew,
    employerNPSDeduction: employerNPS, 
    slabTax: newSlabTax, rebate: newRebate, marginalRelief,
    cess: newCess, totalTax: newTotalTax
  };

  const betterRegime = newTotalTax <= oldTotalTax ? 'new' : 'old';
  const savings = Math.abs(newTotalTax - oldTotalTax);

  const tdsEntered = toNum(data.tdsDeducted) + toNum(data.bankTDS);

  return {
    newRegime: newRegimeObj,
    oldRegime: oldRegimeObj,
    recommended: betterRegime,
    savings,
    tds: { type: 'settled', amount: tdsEntered },
    employerTDS: toNum(data.tdsDeducted),
    bankTDS: toNum(data.bankTDS)
  };
}
