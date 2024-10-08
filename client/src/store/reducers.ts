import { combineReducers } from "@reduxjs/toolkit";

import { appReducer } from "./app";

const mainReducer = combineReducers({
  app: appReducer,
});

const rootReducers = (state: any, action: any) => {
  return mainReducer(state, action);
};

export default rootReducers;
