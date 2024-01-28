import { AddIcon, CloseIcon, UnlockIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  ScaleFade,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNewDomainMutation } from "../../api";

const Header = () => {
  const [createNewDomain] = useNewDomainMutation();
  const [input, setInput] = useState("");
  const [isError, setIsError] = useState(true);
  const [show, setShow] = useState(false);

  const handleInputChange = (e: any) => {
    setIsError(false);
    setInput(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { data } = await createNewDomain({
      variables: {
        name: input.trim(),
      },
    });

    const response = data?.newDomain;

    if (!response) return setIsError(true);

    setInput("");
    setShow(false);
    console.log(response);
  };

  return (
    <Box my={3} h={"67px"}>
      <Flex alignItems={"flex-start"} justifyContent={"space-between"}>
        <Flex alignItems={"center"} gap={2}>
          <UnlockIcon color="green.500" fontSize={"2xl"} />
          <Text fontSize="2xl">Password Finder</Text>
        </Flex>

        <Flex gap={2}>
          <ScaleFade initialScale={0.9} in={show}>
            <form onSubmit={handleSubmit}>
              <FormControl isInvalid={isError}>
                <Input type="text" value={input} onChange={handleInputChange} />
                {isError && <FormErrorMessage>Already exist!</FormErrorMessage>}
              </FormControl>{" "}
            </form>
          </ScaleFade>
          <IconButton
            colorScheme={show ? "orange" : "whatsapp"}
            aria-label="Add new"
            onClick={() => setShow(!show)}
            icon={show ? <CloseIcon /> : <AddIcon />}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
