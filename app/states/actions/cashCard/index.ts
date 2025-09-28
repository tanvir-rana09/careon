import cashCardEntries from "./entries";
import cashCardRefills from "./refills";
import cashCardReturns from "./returns";

export const cashCardApiReducers = {
    [cashCardEntries.reducerPath]: cashCardEntries.reducer,
    [cashCardRefills.reducerPath]: cashCardRefills.reducer,
    [cashCardReturns.reducerPath]: cashCardReturns.reducer,
};
export const cashCardApiMiddleWares = [
    cashCardEntries.middleware,
    cashCardRefills.middleware,
    cashCardReturns.middleware,
];
