import React from "react";
import { AppContainer } from "./AppContainer";
import { Spinner } from "@chakra-ui/react";

export const Loader = () => {
  return (
    <AppContainer textAlign="center">
      <Spinner size="xl" />
    </AppContainer>
  );
};
