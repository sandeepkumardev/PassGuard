import { useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useActions } from "../context/actions";
import { IToast } from "../types";

const Toast = ({ data }: { data: IToast }) => {
  const toast = useToast();
  const { handleToast } = useActions();

  useEffect(() => {
    toast({
      title: data.success ? "Success" : "Error!",
      description: data.message,
      status: data.success ? "success" : "error",
      duration: 1500,
      isClosable: true,
    });

    handleToast(false);
  });

  return <></>;
};

export default Toast;
