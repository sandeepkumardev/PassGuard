import { Domain } from "../api";
import {
  FETCHED_DATA,
  ADD_NEW_DOMAIN,
  DELETE_DOMAIN,
  ADD_PASSWORD,
} from "../constants";

export type StoreState = {
  domains: Domain[];
};

export type StoreAction =
  | { type: typeof FETCHED_DATA; payload: Domain[] }
  | { type: typeof ADD_NEW_DOMAIN; payload: Domain }
  | { type: typeof DELETE_DOMAIN; payload: { id: string } }
  | { type: typeof ADD_PASSWORD; payload: { id: string; password: string } };
