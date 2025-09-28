export type MemberPaymentFormType = {
    unique_id: string;
    date: string | Date | any;
    account_id: string;
    member_id: string;
    purpose: string;
    amount: string | number;
    description: string;
};
