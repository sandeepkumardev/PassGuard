import { Badge, Box } from "@chakra-ui/react";
import React from "react";
import InputContainer from "./InputContainer";
import ListAllItems from "./ListAllItems";
import { Domain } from "../api";

const ItemContainer = ({ data }: { data: Domain }) => {
  return (
    <Box w="100%" p={4} shadow={"md"} position={"relative"}>
      {data.deletedAt && (
        <Badge position={"absolute"} right={0} top={0} colorScheme="purple" p={1} zIndex={10}>
          Resolved
        </Badge>
      )}
      <InputContainer data={data} />
      <ListAllItems data={data} />
    </Box>
  );
};

export default ItemContainer;
