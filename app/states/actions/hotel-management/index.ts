import guestCategory from "./guestCategory";
import guestReservation from "./guestReservetion";
import rooms from "./rooms";
import guestReservetionCohost from "./guestReservetionCohost";
import roomTypes from "./roomTypes";
import roomReservation from "./roomReservation";
import roomCheckIns from "./roomcheckins";
import roomCheckOuts from "./roomcheckouts";
import location from "./location";

export const hotelManagementApiReducers = {
  [guestReservation.reducerPath]: guestReservation.reducer,
  [guestCategory.reducerPath]: guestCategory.reducer,
  [rooms.reducerPath]: rooms.reducer,
  [guestReservetionCohost.reducerPath]: guestReservetionCohost.reducer,
  [roomTypes.reducerPath]: roomTypes.reducer,
  [roomReservation.reducerPath]: roomReservation.reducer,
  [roomCheckIns.reducerPath]: roomCheckIns.reducer,
  [roomCheckOuts.reducerPath]: roomCheckOuts.reducer,
  [location.reducerPath]: location.reducer,
};
export const hotelManagementApiMiddleWares = [
  guestReservation.middleware,
  guestCategory.middleware,
  rooms.middleware,
  guestReservetionCohost.middleware,
  roomTypes.middleware,
  roomReservation.middleware,
  roomCheckIns.middleware,
  roomCheckOuts.middleware,
  location.middleware,
];
export default hotelManagementApiReducers;
