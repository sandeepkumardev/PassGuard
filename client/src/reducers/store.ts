import type { StoreAction, StoreState } from "../types";
import { ADD_NEW_DOMAIN, DELETE_DOMAIN, ADD_PASSWORD, FETCHED_DATA } from "../constants";

export const storeState = {
  domains: [],
};

export function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case FETCHED_DATA:
      return {
        domains: action.payload,
      };

    case ADD_NEW_DOMAIN:
      return {
        domains: [action.payload, ...state.domains],
      };

    case DELETE_DOMAIN:
      const data = state.domains.filter((d) => d.id !== action.payload.id);
      return {
        domains: data,
      };

    case ADD_PASSWORD:
      const id = action.payload.id;
      const password = action.payload.password;
      const updatedData = state.domains.map((obj) => {
        if (obj.id === id) {
          if (!obj.usedPW) return { ...obj, usedPW: [password] };
          return { ...obj, usedPW: [...obj.usedPW, password] };
        }
        return obj;
      });
      return {
        domains: updatedData,
      };

    default:
      return state;
  }
}
