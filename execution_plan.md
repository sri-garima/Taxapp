# TaxClarity — Phased Execution Plan

This plan breaks down the development of the Indian Income Tax Calculator (FY 2025-26) into distinct, manageable phases. Each phase ensures the app remains fully runnable so you can verify progress and design continuously.

## Phase 1: Project Setup & Core Configuration
**Goal:** Initialize the project, configure Tailwind CSS, and set up the foundation.
- **Tasks:**
  - Initialize React with Vite and install Tailwind CSS.
  - Set up `tailwind.config.js`, `postcss.config.js`, and `vite.config.js`.
  - Add core CSS styles and base Tailwind directives to `index.css`.
  - Create constants (`constants.js`) and utility functions (`utils.js`).
- **Runnable State:** A blank React app displaying a simple "TaxClarity Setup Complete" screen with Tailwind styles applied.

## Phase 2: Shared UI Components & Global State
**Goal:** Build reusable design system components and establish the global application state.
- **Tasks:**
  - Define `INITIAL_STATE` and setup `App.jsx` with a basic step navigation skeleton (`step` 1-14).
  - Build layout components: `StepWrapper` and `ProgressBar`.
  - Build form components: `NumberInput`, `FrequencyInput`, `CommonQuestions`, and `ConfusedLink`.
- **Runnable State:** You can navigate through empty "dummy" steps with the `StepWrapper` and `ProgressBar` rendering correctly, and test the input components in isolation.

## Phase 3: Tax Engine Baseline & Live Preview Panel
**Goal:** Implement the logic skeleton and the persistent side-panel preview.
- **Tasks:**
  - Build the base logic for `taxEngine.js` (slab calculation, gross income, dummy return objects).
  - Implement the `TaxPreviewPanel.jsx` component that will stick to the right column on desktop.
  - Hook the preview panel up to the `App.jsx` state.
- **Runnable State:** The dummy steps now feature the right-hand `TaxPreviewPanel`. Changing values in a dummy `NumberInput` updates the gross income dynamically in the preview panel.

## Phase 4: Landing Page & Initial Steps (S01 - S03)
**Goal:** Create the entry point and the first set of user questions.
- **Tasks:**
  - Build `S01_Landing.jsx` with hero section, feature cards, and "Start" CTA.
  - Build `S02_FinancialYear.jsx` (static confirmation).
  - Build `S03_AgeGroup.jsx` (custom radio buttons).
  - Wire them up in `App.jsx` instead of the dummy steps.
- **Runnable State:** You can view the fully styled landing page, click start, and complete the FY and Age Group steps.

## Phase 5: Income & Salary Steps (S04 - S06)
**Goal:** Implement the complex salary input forms.
- **Tasks:**
  - Build `S04_SalaryDetails.jsx` (Take-home, Basic, Bonus toggle).
  - Build `S05_SalaryComponents.jsx` (HRA, Professional Tax, Employer NPS checkboxes with sub-inputs).
  - Build `S06_OtherIncome.jsx` (FD and Savings interest).
- **Runnable State:** You can enter all income sources. The `TaxPreviewPanel` accurately reflects your total gross income based on these inputs.

## Phase 6: Housing & Deduction Steps (S07 - S11)
**Goal:** Gather all tax-saving investments and expenses.
- **Tasks:**
  - Build housing steps: `S07_PaysRent.jsx` and `S08_RentDetails.jsx`.
  - Build investments step: `S09_TaxSavingInvestments.jsx` (80C, NPS).
  - Build insurance step: `S10_HealthInsurance.jsx` (Self/Parent cards).
  - Build home loan step: `S11_HomeLoan.jsx`.
- **Runnable State:** You can complete the full data collection journey up to step 11. All entered data correctly persists in the global state as you move back and forth.

## Phase 7: Finalizing Tax Engine & Pre-computation Steps (S12 - S13)
**Goal:** Complete the math engine and the loading screen transition.
- **Tasks:**
  - Complete `taxEngine.js` with exact formulas for HRA, 80C caps, old/new regime differences, and TDS calculations.
  - Build `S12_TDS.jsx` (TDS deducted info).
  - Build `S13_Calculating.jsx` with the animated spinner and simulated delay.
- **Runnable State:** The `TaxPreviewPanel` now calculates the *exact* tax according to the PRD rules. Clicking "Calculate" on Step 12 shows the loading animation before transitioning to a placeholder results page.

## Phase 8: Results Dashboard (S14) & Final Polish
**Goal:** Build the comprehensive final results page.
- **Tasks:**
  - Build `S14_Results.jsx`.
  - Implement sub-components: `SectionA_Verdict`, `SectionB_TaxSummary`, `SectionC_DetailedBreakdown` (with collapsible accordion), `SectionD_Education`, and `SectionE_NextSteps`.
  - Conduct an end-to-end test using the verification cases from the PRD.
- **Runnable State:** The complete app! You can go from the landing page to a highly detailed, accurate tax breakdown, and use the "Start Over" or "Go back and edit" functions smoothly.
