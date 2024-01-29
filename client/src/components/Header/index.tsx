import { AddIcon, CloseIcon, UnlockIcon } from "@chakra-ui/icons";
import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useNewDomainMutation } from "../../api";
import { useStore } from "../../context";
import { useActions } from "../../context/actions";

const Header = () => {
  const { handleToast } = useActions();
  const inputRef = useRef(null);
  const { addNewDomain, includeResolved, isResolved } = useStore();
  const [createNewDomain] = useNewDomainMutation();
  const [input, setInput] = useState("");
  const [isError, setIsError] = useState(false);
  const [show, setShow] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    setInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await createNewDomain({
        variables: {
          name: input.trim(),
        },
      });

      const response = data?.newDomain;
      if (!response) return setIsError(true);

      setInput("");
      setShow(false);
      addNewDomain(response);
      handleToast(true, true, "Added new item!");
    } catch (error) {
      console.log(error);
      handleToast(true, false, "Something went wrong!");
    }
  };

  const handleShow = () => {
    setShow(!show);
    //@ts-ignore
    inputRef.current.focus();
  };

  return (
    <Box my={3} h={"67px"}>
      <Flex alignItems={"flex-start"} justifyContent={"space-between"}>
        <Flex flexDirection={"column"}>
          <Flex alignItems={"center"} gap={2}>
            <UnlockIcon color="green.500" fontSize={"2xl"} />
            <Text fontSize="2xl">Password Finder</Text>
          </Flex>
          <Checkbox
            mt={2}
            mx={1}
            borderColor={"green"}
            colorScheme="green"
            isChecked={isResolved}
            onChange={includeResolved}
          >
            Include resolved
          </Checkbox>
        </Flex>

        <Flex gap={2}>
          <form onSubmit={handleSubmit}>
            <FormControl isInvalid={isError}>
              <Input
                autoComplete="off"
                ref={inputRef}
                style={{
                  width: show ? "revert-layer" : 0,
                  height: show ? "revert-layer" : 0,
                  padding: show ? "revert-layer" : 0,
                }}
                type="text"
                value={input}
                onChange={handleInputChange}
              />
              {isError && <FormErrorMessage>Already exist!</FormErrorMessage>}
            </FormControl>
          </form>
          <IconButton
            colorScheme={show ? "orange" : "whatsapp"}
            aria-label="Add new"
            onClick={handleShow}
            icon={show ? <CloseIcon /> : <AddIcon />}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
