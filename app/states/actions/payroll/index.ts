
import allowanceDeductionTypeApi from "./allowance-deductions";
import bonusApi from "./bonus";
import employeeAllowanceDeductionApi from "./employeeAllowanceDeduction";
import overTime from "./overTime";
import payScaleApi from "./payScale";
import providentFundClosing from "./providentFundClosing";

export const payrollApiReducers = {
    [allowanceDeductionTypeApi.reducerPath]: allowanceDeductionTypeApi.reducer,
    [employeeAllowanceDeductionApi.reducerPath]: employeeAllowanceDeductionApi.reducer,
    [providentFundClosing.reducerPath]: providentFundClosing.reducer,
    [overTime.reducerPath]: overTime.reducer, 
    [bonusApi.reducerPath]: bonusApi.reducer, 
    [payScaleApi.reducerPath]: payScaleApi.reducer, 

};
export const payrollApiMiddleWares = [
    allowanceDeductionTypeApi.middleware, 
    employeeAllowanceDeductionApi.middleware,
    overTime.middleware,
    providentFundClosing.middleware,
    bonusApi.middleware,
    payScaleApi.middleware,
];
