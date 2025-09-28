export type ExpenseFormType = {
    unique_id: string;
    date: string | Date | any;
    account_id: string;
    purpose: string;
    amount: string | number;
    description: string;
};
