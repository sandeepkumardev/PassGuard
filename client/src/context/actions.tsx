import React, { createContext, useContext, useState } from "react";
import { IChildren } from "../types";
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
        handleDeleteModal,
        resolvedModal,
        handleResolvedModal,
      }}
    >
      {children}
    </AppActions.Provider>
  );
};

export default ActionsProvider;
