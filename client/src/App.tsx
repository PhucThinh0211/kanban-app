import { useState } from "react";
import "./App.css";
import { Board } from "./components/Board";
import { ReduxStoreProvider } from "./store/storeProvider";

function App() {
  return (
    <ReduxStoreProvider>
      <Board />
    </ReduxStoreProvider>
  );
}

export default App;
