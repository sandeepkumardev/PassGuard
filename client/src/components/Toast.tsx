import { useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { IToast } from "../types";
import { useStore } from "../store";

const Toast = ({ data }: { data: IToast }) => {
  const toast = useToast();
  const { dispatch } = useStore();

  useEffect(() => {
    toast({
      title: data.success ? "Success" : "Error!",
      description: data.message,
      status: data.success ? "success" : "error",
      duration: 1500,
      isClosable: true,
    });

    dispatch({ type: "HANDLE_TOAST", payload: { isOpen: false } });
  });

  return <></>;
};

export default Toast;
