import { CheckIcon, CopyIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Domain, useAddPasswordMutation, useIsPasswordExistMutation } from "../../api";
import { useStore } from "../../store";

const InputContainer = ({ data }: { data: Domain }) => {
  const { dispatch } = useStore();
  const [isPasswordExistGQL] = useIsPasswordExistMutation();
  const [addPasswordGQL] = useAddPasswordMutation();
  const [isError, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const handlePassword = async () => {
    if (input.trim() === "" || isError) {
      setInput("");
      return;
    }

    try {
      const response = await addPasswordGQL({
        variables: {
          addPasswordId: `${data.id}`,
          password: input.trim(),
        },
      });

      if (response.data?.addPassword.affectedCount == 1) {
        dispatch({ type: "ADD_PASSWORD", payload: { id: `${data.id}`, password: input } });
        setInput("");
      } else {
        dispatch({
          type: "HANDLE_TOAST",
          payload: { isOpen: true, success: false, message: "Something went wrong!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "HANDLE_TOAST",
        payload: { isOpen: true, success: false, message: "Something went wrong!" },
      });
    }
  };

  const checkExist = async () => {
    const response = await isPasswordExistGQL({
      variables: {
        isPasswordExistId: `${data.id}`,
        password: input.trim(),
      },
    });

    if (response.data?.isPasswordExist.affectedCount == 1) {
      setError(true);
    } else {
      setError(false);
    }
    setLoading(false);
  };

  const handleCopy = () => {
    if (input.trim() == "") return;

    navigator.clipboard.writeText(input);
    dispatch({
      type: "HANDLE_TOAST",
      payload: { isOpen: true, success: true, message: "Copied to clipboard!" },
    });
  };

  const handleDeleteModal = () => {
    dispatch({
      type: "HANDLE_DELETE_MODAL",
      payload: { isOpen: true, data: data },
    });
  };

  const handleResolvedModal = () => {
    dispatch({
      type: "HANDLE_RESOLVED_MODAL",
      payload: { isOpen: true, data: { ...data, password: input } },
    });
  };

  React.useEffect(() => {
    if (input.trim() === "") {
      setError(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    const getData = setTimeout(async () => {
      await checkExist();
    }, 1000);

    return () => clearTimeout(getData);
  }, [input]);

  const regex = /^https?:\/\//;

  return (
    <Stack userSelect={"none"}>
      <InputGroup>
        {regex.test(`${data.name}`) ? (
          <Link href={`${data.name}`} isExternal>
            <InputLeftAddon>{data.name}</InputLeftAddon>
          </Link>
        ) : (
          <InputLeftAddon>{data.name}</InputLeftAddon>
        )}
        <InputLeftAddon
          px={2}
          bg={"#f6f6f6"}
          cursor={"pointer"}
          borderTopLeftRadius={0}
          borderBottomLeftRadius={0}
          onClick={handleCopy}
        >
          <CopyIcon fontSize={20} color={"green.600"} />
        </InputLeftAddon>
        <Input
          _disabled={{
            opacity: 1,
            cursor: "not-allowed",
          }}
          disabled={data.password ? true : false}
          placeholder="Enter possible password!"
          value={data.password ? data.password : input}
          onChange={(e) => setInput(e.target.value)}
        />
        <InputRightElement>
          {loading && <Spinner />}
          {input.trim() !== "" && !loading && !isError && <CheckIcon color="green.500" />}
        </InputRightElement>
      </InputGroup>
      <Flex justifyContent={"space-between"}>
        {isError ? (
          <Text fontSize="sm" fontWeight={600} color="red">
            Already exist!
          </Text>
        ) : (
          <div></div>
        )}
        <HStack>
          <Button
            isDisabled={input.trim() == "" && true}
            colorScheme="orange"
            h="1.75rem"
            size="sm"
            shadow={"md"}
            onClick={handlePassword}
          >
            Failed attempt
          </Button>
          <Button
            isDisabled={input.trim() == "" || (isError && true)}
            colorScheme="whatsapp"
            h="1.75rem"
            size="sm"
            shadow={"md"}
            onClick={handleResolvedModal}
          >
            Resolved
          </Button>
          <IconButton
            h="1.75rem"
            size="sm"
            colorScheme="red"
            aria-label="delete"
            onClick={handleDeleteModal}
            icon={<DeleteIcon />}
          />
        </HStack>
      </Flex>
    </Stack>
  );
};

export default InputContainer;
