import warehouses from "./warehouses";
import internalRequisition from "./internalRequisition";
import products from "./products";
import purchaseRequisition from "./purchaseRequisition";
import purchaseOrder from "./purchaseOrder";
import centralStoreProductReceive from "./centralStoreProductReceive";
import subStoreOrderIssue from "./subStoreOrderIssue";
import productConsumptionApi from "./productConsumption";
import { loseAndDamageApi } from "./loseAndDamage";
import { returnToSupplierApi } from "./returnToSupplier";

export const inventoryApiReducers = {
  [warehouses.reducerPath]: warehouses.reducer,
  [internalRequisition.reducerPath]: internalRequisition.reducer,
  [products.reducerPath]: products.reducer,
  [purchaseRequisition.reducerPath]: purchaseRequisition.reducer,
  [purchaseOrder.reducerPath]: purchaseOrder.reducer,
  [centralStoreProductReceive.reducerPath]: centralStoreProductReceive.reducer,
  [subStoreOrderIssue.reducerPath]: subStoreOrderIssue.reducer, // Uncomment if subStoreOrderIssue is defined
  [productConsumptionApi.reducerPath]: productConsumptionApi.reducer, // Uncomment if subStoreOrderIssue is defined
  [loseAndDamageApi.reducerPath]: loseAndDamageApi.reducer, // Uncomment if subStoreOrderIssue is defined,
  [returnToSupplierApi.reducerPath]: returnToSupplierApi.reducer, // Uncomment if subStoreOrderIssue is defined,


};

export const inventoryApiMiddleWares = [
  warehouses.middleware,
  internalRequisition.middleware,
  products.middleware,
  purchaseRequisition.middleware,
  purchaseOrder.middleware,
  centralStoreProductReceive.middleware,
  subStoreOrderIssue.middleware, // Uncomment if subStoreOrderIssue is defined
  productConsumptionApi.middleware,
  loseAndDamageApi.middleware,
  returnToSupplierApi.middleware
];
