import { ApolloError } from "@apollo/client";
import { ContainerProps } from "@chakra-ui/react";
import { ReactNode } from "react";

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
