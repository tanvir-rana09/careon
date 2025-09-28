import brands from "./brands";
import categories from "./categories";
import groupProducts from "./groupProducts";
import products from "./products";
import { productGroupApi } from "./productGroups";
import { productSubGroupApi } from "./productSubGroups";
import recipeProducts from "./recipeProducts";
import sales from "./sales";
import statuses from "./statuses";
import supplierContacts from "./supplierContacts";
import suppliers from "./suppliers";
import supplierTypes from "./supplierTypes";
import types from "./types";
import units from "./units";
import productOlds from "./productOld";
import kotBotApi from "./kot-bot";
import productsMapping from "./productsmapping";

export const posApiReducers = {
  [brands.reducerPath]: brands.reducer,
  [categories.reducerPath]: categories.reducer,
  [types.reducerPath]: types.reducer,
  [statuses.reducerPath]: statuses.reducer,
  [units.reducerPath]: units.reducer,
  [products.reducerPath]: products.reducer,
  [recipeProducts.reducerPath]: recipeProducts.reducer,
  [groupProducts.reducerPath]: groupProducts.reducer,
  [suppliers.reducerPath]: suppliers.reducer,
  [supplierContacts.reducerPath]: supplierContacts.reducer,
  [supplierTypes.reducerPath]: supplierTypes.reducer,
  [sales.reducerPath]: sales.reducer,
  [productGroupApi.reducerPath]: productGroupApi.reducer,
  [productSubGroupApi.reducerPath]: productSubGroupApi.reducer,
  [productOlds.reducerPath]: productOlds.reducer,
[kotBotApi.reducerPath]: kotBotApi.reducer,
[productsMapping.reducerPath]: productsMapping.reducer

};
export const posApiMiddleWares = [
  brands.middleware,
  categories.middleware,
  types.middleware,
  statuses.middleware,
  units.middleware,
  products.middleware,
  recipeProducts.middleware,
  groupProducts.middleware,
  suppliers.middleware,
  supplierContacts.middleware,
  supplierTypes.middleware,
  sales.middleware,
  productGroupApi.middleware,
  productSubGroupApi.middleware,
  productOlds.middleware,
  kotBotApi.middleware,
  productsMapping.middleware
];
