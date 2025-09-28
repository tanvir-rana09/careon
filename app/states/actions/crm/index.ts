import memberCategories from "./memberCategories";
import memberChildren from "./memberChildren";
import memberDocuments from "./memberDocuments";
import memberPayments from "./memberPayments";
import memberProfessions from "./memberProfessions";
import memberReferences from "./memberReferences";
import members from "./members";
import memberships from "./memberships";
import membershipTypes from "./membershipTypes";
import memberSpouses from "./memberSpouses";
import memberSubordinates from "./memberSubordinates";
import { memberTypeApiMiddleWares, memberTypeApiReducers } from "./memberTypes";
import { memberTitleApiMiddleWares, memberTitleApiReducers } from "./memberTitles";

export const crmApiReducers = {
    [memberCategories.reducerPath]: memberCategories.reducer,
    [membershipTypes.reducerPath]: membershipTypes.reducer,
    [members.reducerPath]: members.reducer,
    [memberChildren.reducerPath]: memberChildren.reducer,
    [memberSpouses.reducerPath]: memberSpouses.reducer,
    [memberSubordinates.reducerPath]: memberSubordinates.reducer,
    [memberReferences.reducerPath]: memberReferences.reducer,
    [memberships.reducerPath]: memberships.reducer,
    [memberProfessions.reducerPath]: memberProfessions.reducer,
    [memberDocuments.reducerPath]: memberDocuments.reducer,
    [memberPayments.reducerPath]: memberPayments.reducer,
    ...memberTypeApiReducers,
    ...memberTitleApiReducers,
};
export const crmApiMiddleWares = [
    memberCategories.middleware,
    membershipTypes.middleware,
    members.middleware,
    memberChildren.middleware,
    memberSpouses.middleware,
    memberSubordinates.middleware,
    memberReferences.middleware,
    memberships.middleware,
    memberProfessions.middleware,
    memberDocuments.middleware,
    memberPayments.middleware,
    memberTypeApiMiddleWares,
    memberTitleApiMiddleWares,
];
