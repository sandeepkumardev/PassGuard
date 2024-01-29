import React from "react";
import { AppContainer } from "./AppContainer";
import { Text } from "@chakra-ui/react";
import { IApolloError } from "../types";

export const ErrorPage = ({ error }: IApolloError) => {
  return (
    <AppContainer textAlign="center">
      <Text>Error : {error.message}</Text>
    </AppContainer>
  );
};
