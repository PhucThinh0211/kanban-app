import { UnknownAction, configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";

import rootEpics from "./epics";
import rootReducers from "./reducers";
import { RootState } from "./types";

const storeConfig = (config: any) => {
  const epicMiddleware = createEpicMiddleware<
    UnknownAction,
    UnknownAction,
    RootState
  >();

  const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => {
      const middlewares = getDefaultMiddleware({
        serializableCheck: false,
      }).concat(epicMiddleware);

      return middlewares;
    },
  });

  epicMiddleware.run(rootEpics);

  return { store };
};

export default storeConfig;
