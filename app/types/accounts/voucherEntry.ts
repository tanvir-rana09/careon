type VoucherType = "R1" | "P1" | "R2" | "P2" | "C3" | "J3";

interface VoucherEntry {
  account_code?: string | number | undefined;
  account_name: string;
  description: string;
  status: string;
  debit: number;
  isAcCode: boolean;
  credit: number;
  amount?: number;
  member_id?: string;
  department_id?: string;
  supplier_id?: string;
  employee_id?: string;
  document?: File | string | null;
}

interface VoucherFormData {
  voucher_type: VoucherType;
  voucher_no: string;
  voucher_date: string;
  account_code: string;
  account_name: string;
  payee_bank: string;
  amount_type: "debit" | "credit";
  type: "debit" | "credit";
  amount: number;
  description: string;
  same_code: boolean;
  bank_code?: string;
  bank_name?: string;
  department_id?: string;
  supplier_id?: string;
  employee_id?: string;
  member_id?: string;
  cheque_number: string;
  cheque_date?: string;
  hide_in_member_ledger?: boolean;
  is_adjustment?: boolean;
  unique_id?: number;
  document?: File | string | null;
  entries: VoucherEntry[];
}

export type { VoucherType, VoucherEntry, VoucherFormData };
