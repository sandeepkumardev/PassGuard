import { useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { IToast } from "../types/actions";
import { useStore } from "../context";

const Toast = ({ data }: { data: IToast }) => {
  const toast = useToast();
  const { actionDispatch } = useStore();

  useEffect(() => {
    toast({
      title: data.success ? "Success" : "Error!",
      description: data.message,
      status: data.success ? "success" : "error",
      duration: 1500,
      isClosable: true,
    });

    actionDispatch({ type: "HANDLE_TOAST", payload: { isOpen: false } });
  });

  return <></>;
};

export default Toast;
