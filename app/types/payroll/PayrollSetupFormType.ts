type PayrollSetupFormType = {
  // Employee info
  id: string;
  name: string;
  gross: number;
  basic: number;
  grade: string;
  branch: string;
  section: string;
  subSection: string;
  designation: string;
  roster: "roster" | "holiday";

  // Increment
  incrementDate: string;
  incrementAmount: number;

  // Allowances
  otherTechAllowance: number;
  otherTechIsBasicPercent: boolean;
  arrearAllowance: number;
  arrearIsBasicPercent: boolean;
  washingAllowance: number;
  washingIsBasicPercent: boolean;
  houseRentAllowance: number;
  houseRentIsFixed: boolean;
  festivalBonusAllowance: number;
  festivalBonusIsFixed: boolean;
  medicalAllowance: number;
  medicalIsFixed: boolean;
  conveyAllowance: number;
  conveyIsFixed: boolean;

  // Deductions
  // Add deduction fields as needed

  // PayScale
  incrementType: "fixed" | "basicPercent";
  startingBasic: number;
  incrementAmountPercent: number;
  incrementYear: number;
  finalBasic: number;

  // Tax Calculation
  netTaxableIncome: number;
  taxAmount: number;
  monthTaxAmount: number;
};

export default PayrollSetupFormType;