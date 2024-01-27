import { CheckIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

const InputContainer = () => {
  const [isError, setError] = useState(true);

  return (
    <Stack>
      <InputGroup>
        <Input placeholder="Enter amount" />
        <InputRightElement>
          {!isError && <CheckIcon color="green.500" />}
        </InputRightElement>
      </InputGroup>
      <Flex justifyContent={"space-between"}>
        {isError ? (
          <Text fontSize="sm" color="red">
            Already exist!
          </Text>
        ) : (
          <div></div>
        )}
        <HStack>
          <Button colorScheme="red" h="1.75rem" size="sm" shadow={"md"}>
            Failed try
          </Button>
          <Button colorScheme="whatsapp" h="1.75rem" size="sm" shadow={"md"}>
            Resolved
          </Button>
        </HStack>
      </Flex>
    </Stack>
  );
};

export default InputContainer;
