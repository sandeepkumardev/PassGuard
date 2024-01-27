import React from "react";
import "./App.css";
import { Box, Container, VStack } from "@chakra-ui/react";
import InputContainer from "./components/InputContainer";
import ListAllItems from "./components/ListAllItems";

function App() {
  return (
    <Container maxW="container.md" minW="310px" p={2} shadow={"md"}>
      <VStack>
        <Item />
        <Item />
      </VStack>
    </Container>
  );
}

const Item = () => {
  return (
    <Box w="100%" p={4} shadow={"md"}>
      <InputContainer />
      <ListAllItems />
    </Box>
  );
};

export default App;
