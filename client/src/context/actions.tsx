import React, { createContext, useContext, useState } from "react";
import { IChildren, IToast } from "../types";
import { Domain } from "../api";

interface IActions {
  deleteModal: {
    status: boolean;
    data: null | Domain;
  };
  handleDeleteModal: (data?: null | Domain) => void;
  resolvedModal: {
    status: boolean;
    data: null | Domain;
    password: string;
  };
  handleResolvedModal: (data?: null | Domain, password?: string) => void;
  toast: IToast;
  handleToast: (open: boolean, success?: boolean, message?: string) => void;
}

//@ts-ignore
export const AppActions = createContext<IActions>(null);
export const useActions = () => useContext(AppActions);

const ActionsProvider = ({ children }: IChildren) => {
  const [deleteModal, setDeleteModal] = useState({
    status: false,
    data: null,
  });
  const [resolvedModal, setResolvedModal] = useState({
    status: false,
    data: null,
    password: "",
  });
  const [toast, setToast] = useState({
    open: false,
    success: false,
    message: "",
  });

  const handleToast = (open: boolean, success = false, message = "") => {
    setToast({
      open,
      success,
      message,
    });
  };

  const handleDeleteModal = (data = null) => {
    setDeleteModal({
      status: data ? true : false,
      data: data,
    });
  };

  const handleResolvedModal = (data = null, password = "") => {
    setResolvedModal({
      status: data ? true : false,
      data: data,
      password: password,
    });
  };

  return (
    <AppActions.Provider
      value={{
        deleteModal,
        //@ts-ignore
        handleDeleteModal,
        resolvedModal,
        //@ts-ignore
        handleResolvedModal,
        toast,
        handleToast,
      }}
    >
      {children}
    </AppActions.Provider>
  );
};

export default ActionsProvider;
