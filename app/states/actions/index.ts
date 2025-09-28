import { accountApiMiddleWares, accountApiReducers } from "./accounts";
import auth from "./auth";
import { cashCardApiMiddleWares, cashCardApiReducers } from "./cashCard";
import { crmApiMiddleWares, crmApiReducers } from "./crm";
import {
    hotelManagementApiMiddleWares,
    hotelManagementApiReducers,
} from "./hotel-management";
import { hrmApiMiddleWares, hrmApiReducers } from "./hrm";
import { posApiMiddleWares, posApiReducers } from "./pos";
import publicApi from "./publicApi";
import { systemApiMiddleWares, systemApiReducers } from "./system";
import { inventoryApiMiddleWares, inventoryApiReducers } from "./inventory";
import reportsApi from "./report";
import dashboardApi from "./dashboard";
import { payrollApiMiddleWares, payrollApiReducers } from "./payroll";
import { attendanceApiMiddleWares, attendanceApiReducers } from "./attendance";

export const apiReducers = {
    [auth.reducerPath]: auth.reducer,
    [publicApi.reducerPath]: publicApi.reducer,
    [reportsApi.reducerPath]: reportsApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    ...hrmApiReducers,
    ...crmApiReducers,
    ...posApiReducers,
    ...accountApiReducers,
    ...systemApiReducers,
    ...hotelManagementApiReducers,
    ...cashCardApiReducers,
    ...inventoryApiReducers,
    ...payrollApiReducers,
    ...attendanceApiReducers,
};

export const apiMiddleWares = [
    auth.middleware,
    publicApi.middleware,
    reportsApi.middleware,
    dashboardApi.middleware,
    ...hrmApiMiddleWares,
    ...crmApiMiddleWares,
    ...posApiMiddleWares,
    ...accountApiMiddleWares,
    ...systemApiMiddleWares,
    ...hotelManagementApiMiddleWares,
    ...cashCardApiMiddleWares,
    ...inventoryApiMiddleWares,
    ...payrollApiMiddleWares,
    ...attendanceApiMiddleWares,
];
