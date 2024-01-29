import { Container } from "@chakra-ui/react";
import React from "react";
import { IAppContainer } from "../types";

export const AppContainer = ({ children, ...props }: IAppContainer) => {
  return (
    <Container maxW="container.md" minW="310px" p={2} shadow={"md"} {...props}>
      {children}
    </Container>
  );
};
