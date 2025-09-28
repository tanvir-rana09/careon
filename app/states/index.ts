import { configureStore } from "@reduxjs/toolkit";
import { apiMiddleWares, apiReducers } from "./actions";
import auth from "./reducers/auth";

const state = configureStore({
  reducer: {
    ...apiReducers,
    auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "vouchersApi/executeMutation/fulfilled",
          "posProductsApi/executeQuery/fulfilled", // add if needed
        ],
        ignoredActionPaths: [
          "payload",
          "meta.baseQueryMeta.request", // 👈 add this line
        ],
        ignoredPaths: [
          "vouchersApi.mutations",
          "posProductsApi.queries", // 👈 if needed
        ],
      },
    }).concat(...apiMiddleWares),
});


export type RootState = ReturnType<typeof state.getState>;
export type AppDispatch = typeof state.dispatch;

export default state;
