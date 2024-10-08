import React, { useState } from "react";

import { Provider as StoreProvider } from "react-redux";

import { initialStoreCongfig } from "@/store";
import configureStore from "@/store/configureStore";
import { StoreContext } from "./storeContext";

interface ReduxStoreProviderProps {
  children: React.ReactNode;
}

export const ReduxStoreProvider = ({ children }: ReduxStoreProviderProps) => {
  const [storeConfig, setStoreConfig] = useState(initialStoreCongfig);

  const changeStoreConfig = React.useCallback((config: any) => {
    setStoreConfig(configureStore(config));
  }, []);

  return (
    <StoreContext.Provider value={{ changeStoreConfig }}>
      <StoreProvider store={storeConfig.store}>{children}</StoreProvider>
    </StoreContext.Provider>
  );
};
