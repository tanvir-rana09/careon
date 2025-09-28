import attendConsiderationApi from "./AttendConsideration";
import { attendGracePeriodApi } from "./attendGracePeriod";
import attendRosterApi from "./AttendRoster";
import holidaysApi from "./Holiday";
import LateConsiderationApi from "./LateConsideration";
import { leaveEntryApi } from "./leaveEntry";
import { leaveApi } from "./leaveForm";
import leaveSetupApi from "./LeaveSetup";
import { openingLeaveEntryApi } from "./openingLeaveEntry";
import { replacementLeaveEntryApi } from "./ReplacementLeaveEntry";
import shiftsApi from "./Shift";

export const attendanceApiReducers = {
    [attendConsiderationApi.reducerPath]: attendConsiderationApi.reducer,
    [LateConsiderationApi.reducerPath]: LateConsiderationApi.reducer,
    [holidaysApi.reducerPath]: holidaysApi.reducer,
    [shiftsApi.reducerPath]: shiftsApi.reducer,
    [attendRosterApi.reducerPath]: attendRosterApi.reducer,
    [leaveSetupApi.reducerPath]: leaveSetupApi.reducer,
    [leaveEntryApi.reducerPath]: leaveEntryApi.reducer,
    [replacementLeaveEntryApi.reducerPath]: replacementLeaveEntryApi.reducer,
    [attendGracePeriodApi.reducerPath]: attendGracePeriodApi.reducer,
    [openingLeaveEntryApi.reducerPath]: openingLeaveEntryApi.reducer,
    [leaveApi.reducerPath]: leaveApi.reducer,

};
export const attendanceApiMiddleWares = [
    attendConsiderationApi.middleware,
    LateConsiderationApi.middleware,
    holidaysApi.middleware,
    shiftsApi.middleware,
    attendRosterApi.middleware,
    leaveSetupApi.middleware,
    leaveEntryApi.middleware,
    replacementLeaveEntryApi.middleware,
    attendGracePeriodApi.middleware,
    openingLeaveEntryApi.middleware,
    leaveApi.middleware
];
