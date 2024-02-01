import { ApolloError } from "@apollo/client";
import { ContainerProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { ActionsAction, ActionsState } from "./actions";
import { StoreAction, StoreState } from "./store";

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

export interface IToast {
  open: boolean;
  success: boolean;
  message: string;
}

export type Children = {
  children: ReactNode;
};

export type RootTypes = {
  actions: ActionsState;
  store: StoreState;
  actionDispatch: React.Dispatch<ActionsAction>;
  storeDispatch: React.Dispatch<StoreAction>;
};
