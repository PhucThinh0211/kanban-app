import configureStore from "./configureStore";

export const persistConfigStorage = { whitelist: ["persistApp", "app"] };

export const defaultPersistConfig = {};

export const initialStoreCongfig = configureStore(defaultPersistConfig);
export const store = initialStoreCongfig.store;

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
