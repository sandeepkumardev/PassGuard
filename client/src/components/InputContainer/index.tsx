import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Domain,
  useAddPasswordMutation,
  useDeleteDomainMutation,
  useIsPasswordExistMutation,
  useRemoveDomainMutation,
} from "../../api";
import { useStore } from "../../context";

const InputContainer = ({ data }: { data: Domain }) => {
  const { deleteDomain, addPassword } = useStore();
  const [isPasswordExistGQL] = useIsPasswordExistMutation();
  const [removeDomainGQL] = useRemoveDomainMutation();
  const [deleteDomainGQL] = useDeleteDomainMutation();
  const [addPasswordGQL] = useAddPasswordMutation();
  const [isError, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const handleDelete = async () => {
    const response = await deleteDomainGQL({
      variables: {
        deleteDomainId: `${data.id}`,
      },
    });

    if (response.data?.destroyDomain.affectedCount == 1) {
      deleteDomain(`${data.id}`);
    } else {
      console.log("something went wrong!");
    }
  };

  const handleRemove = async () => {
    if (input.trim() === "" || isError) {
      setInput("");
      return;
    }

    const response = await removeDomainGQL({
      variables: {
        removeDomainId: `${data.id}`,
        password: input.trim(),
      },
    });

    if (response.data?.removeDomain.affectedCount == 1) {
      deleteDomain(`${data.id}`);
    } else {
      console.log("something went wrong!");
    }
  };

  const handlePassword = async () => {
    if (input.trim() === "" || isError) {
      setInput("");
      return;
    }

    const response = await addPasswordGQL({
      variables: {
        addPasswordId: `${data.id}`,
        password: input.trim(),
      },
    });

    if (response.data?.addPassword.affectedCount == 1) {
      addPassword(`${data.id}`, input);
      setInput("");
    } else {
      console.log("something went wrong!");
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

  return (
    <Stack>
      <InputGroup>
        <InputLeftAddon>{data.name}</InputLeftAddon>
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
          {input.trim() !== "" && !loading && !isError && (
            <CheckIcon color="green.500" />
          )}
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
            Failed try
          </Button>
          <Button
            isDisabled={input.trim() == "" || (isError && true)}
            colorScheme="whatsapp"
            h="1.75rem"
            size="sm"
            shadow={"md"}
            onClick={handleRemove}
          >
            Resolved
          </Button>
          <IconButton
            h="1.75rem"
            size="sm"
            colorScheme="red"
            aria-label="delete"
            onClick={handleDelete}
            icon={<DeleteIcon />}
          />
        </HStack>
      </Flex>
    </Stack>
  );
};

export default InputContainer;
