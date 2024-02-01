import React from "react";
import { createContext, useContext, useReducer } from "react";
import type { Children, RootTypes } from "../types";
import { actionsReducer, initialState as actionsState } from "../reducers/actions";
import { storeReducer, initialState as storeState } from "../reducers/store";

//@ts-ignore
const AppStore = createContext<RootTypes>(null);
export const useStore = () => useContext(AppStore);

const StoreProvider: React.FC<Children> = ({ children }) => {
  const [actions, actionDispatch] = useReducer(actionsReducer, actionsState);
  const [store, storeDispatch] = useReducer(storeReducer, storeState);

  return (
    <AppStore.Provider value={{ actions, store, actionDispatch, storeDispatch }}>
      {children}
    </AppStore.Provider>
  );
};

export default StoreProvider;
