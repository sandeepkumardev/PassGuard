import React from "react";
import { createContext, useContext, useReducer } from "react";
import type { IStoreProps, RootAction, RootState, Store } from "../types";
import { actionsReducer, actionsState } from "../reducers/actions";
import { storeReducer, storeState } from "../reducers/store";
import { combineReducers } from "./combineReducer";

//@ts-ignore
const AppStore = createContext<Store>(null);
export const useStore = (): Store => useContext(AppStore);

const rootState = { store: storeState, actions: actionsState };
const rootReducer = combineReducers({ store: storeReducer, actions: actionsReducer });

const StoreProvider: React.FC<IStoreProps> = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, rootState) as [
    RootState,
    React.Dispatch<RootAction>
  ];

  return <AppStore.Provider value={{ state, dispatch }}>{children}</AppStore.Provider>;
};

export default StoreProvider;
