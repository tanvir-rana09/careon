import chartOfAccounts from "./chartOfAccounts";
import expenses from "./expenses";
import banksApi from "./bank";
import vouchersApi from "./voucher";

export const accountApiReducers = {
    [chartOfAccounts.reducerPath]: chartOfAccounts.reducer,
    [expenses.reducerPath]: expenses.reducer,
    [banksApi.reducerPath]: banksApi.reducer,
    [vouchersApi.reducerPath]: vouchersApi.reducer,
};
export const accountApiMiddleWares = [
    chartOfAccounts.middleware,
    expenses.middleware,
    banksApi.middleware, 
    vouchersApi.middleware
]
