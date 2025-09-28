import dayjs from "dayjs";
import Cookies from "js-cookie";
import { VoucherFormData, VoucherEntry } from "~/types/accounts/voucherEntry";

export const createVoucherPayload = (
    formData: VoucherFormData,
    entries: VoucherEntry[],
    totalDebit: number,
    totalCredit: number,
    options?: { excludeVoucherNo?: boolean }
) => {
    // Base voucher payload
    const payload: any = {
        // Conditionally include voucher_no
        ...(!options?.excludeVoucherNo && { voucher_no: formData.voucher_no }),
        voucher_type: formData.voucher_type,
        type: formData.amount_type,
        voucher_date: dayjs(formData.voucher_date).format("YYYY-MM-DD"),
        total_debit: totalDebit,
        total_credit: totalCredit,
        status:'posted',
        entries: entries.map((entry) => ({
            account_code: entry.account_code,
            account_name: entry.account_name,
            debit: entry.debit,
            isAcCode: entry.isAcCode,
            credit: entry.credit,
            description: entry.description,
            amount_type: entry.debit > 0 ? "debit" : "credit",
            amount: entry.debit > 0 ? entry.debit : entry.credit,
            status: 'posted',
            member_id: entry.member_id,
            department_id: entry.department_id || Cookies.get("department_id"),
            supplier_id: entry.supplier_id,
            employee_id: entry.employee_id,
            document: entry.document,
        })),
        hide_in_member_ledger: formData.hide_in_member_ledger ? 1:0,
        is_adjustment: formData.is_adjustment ? 1:0,
        same_code: formData.same_code ? 1:0,
    };

    if (
        formData.voucher_type &&
        ["P2", "R2", "C3"].includes(
            formData.voucher_type
        )
    ) {
        payload.bank_details = {
            bank_code: formData.bank_code,
            bank_name: formData.bank_name,
            ...(formData.payee_bank && {
                payee_bank: formData.payee_bank,
            }),
            ...(formData.cheque_number && {
                cheque_number: formData.cheque_number,
            }),
            ...(formData.cheque_date && {
                cheque_date: dayjs(formData.cheque_date).format(
                    "YYYY-MM-DD"
                ),
            }),
        };
    }

    return payload;
};
