import { ReactNode } from "react";
import { ApolloError } from "@apollo/client";
import { ContainerProps } from "@chakra-ui/react";
import { Domain } from "../api";
import {
  HANDLE_DELETE_MODAL,
  HANDLE_RESOLVED_MODAL,
  HANDLE_TOAST,
  INCLUDE_RESOLVED,
  IS_RESOLVED,
  FETCHED_DATA,
  ADD_NEW_DOMAIN,
  DELETE_DOMAIN,
  ADD_PASSWORD,
} from "../constants";

export interface ISingleTag {
  name: string;
  bg?: string;
}

export interface IAppContainer extends ContainerProps {
  children: ReactNode;
}

export interface IApolloError {
  error: ApolloError;
}

export interface IStoreProps {
  children: ReactNode;
}

export type IToast = {
  isOpen: boolean;
  success?: boolean;
  message?: string;
};

export interface IModal {
  isOpen: boolean;
  data: null | Domain;
}

export type StoreState = {
  domains: Domain[];
};

export type ActionsState = {
  deleteModal: { isOpen: boolean; data: null | Domain };
  resolvedModal: { isOpen: boolean; data: null | Domain };
  toast: IToast;
  isResolved: boolean;
};

export type ActionsAction =
  | { type: typeof IS_RESOLVED; payload?: boolean }
  | { type: typeof HANDLE_TOAST; payload: IToast }
  | {
      type: typeof HANDLE_DELETE_MODAL;
      payload: { isOpen: boolean; data: null | Domain };
    }
  | {
      type: typeof HANDLE_RESOLVED_MODAL;
      payload: { isOpen: boolean; data: null | Domain };
    }
  | { type: typeof INCLUDE_RESOLVED; payload?: boolean };

export type StoreAction =
  | { type: typeof FETCHED_DATA; payload: Domain[] }
  | { type: typeof ADD_NEW_DOMAIN; payload: Domain }
  | { type: typeof DELETE_DOMAIN; payload: { id: string } }
  | { type: typeof ADD_PASSWORD; payload: { id: string; password: string } };

export type RootState = {
  store: StoreState;
  actions: ActionsState;
};

export type RootAction = ActionsAction | StoreAction;

export type Store = {
  state: RootState;
  dispatch: React.Dispatch<RootAction>;
};
