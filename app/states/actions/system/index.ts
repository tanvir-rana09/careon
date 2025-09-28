import permissionsApi from "./permissions";
import sirTitles from "./sirTitles";
import companyApi from "./siteConfig";
import voucherConfigures from "./voucherConfigures";

export const systemApiReducers = {
    [sirTitles.reducerPath]: sirTitles.reducer,
    [voucherConfigures.reducerPath]: voucherConfigures.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [permissionsApi.reducerPath]: permissionsApi.reducer,
};
export const systemApiMiddleWares = [
    sirTitles.middleware,
    voucherConfigures.middleware,
    companyApi.middleware,
    permissionsApi.middleware
];
