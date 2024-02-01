import React, { useEffect } from "react";
import "./App.css";
import { Divider, VStack } from "@chakra-ui/react";
import { Domain, useGetDomainsLazyQuery } from "./api";
import { useStore } from "./context";
import ConfirmDeleteModal from "./components/Modal/ConfirmDelete";
import ConfirmResolvedModal from "./components/Modal/ConfirmResolved";
import Toast from "./components/Toast";
import { AppContainer } from "./components/AppContainer";
import Header from "./components/Header";
import { Loader } from "./components/Loader";
import ItemContainer from "./components/ItemContainer";

function App() {
  const [fn, response] = useGetDomainsLazyQuery();
  const { actions, store, actionDispatch, storeDispatch } = useStore();

  useEffect(() => {
    actionDispatch({ type: "IS_RESOLVED" });
  }, []);

  useEffect(() => {
    fn({ variables: { isDeleted: actions.isResolved }, canonizeResults: true });
  }, [actions.isResolved]);

  useEffect(() => {
    if (response.data?.domains)
      //@ts-ignore
      storeDispatch({ type: "FETCHED_DATA", payload: response.data?.domains });
  }, [response.data?.domains]);

  return (
    <AppContainer>
      <Header />
      <Divider my={2} shadow={"dark-lg"} />

      {response.loading ? (
        <Loader />
      ) : (
        <VStack mt={2}>
          {store.domains?.map((data: Domain) => (
            <ItemContainer key={data.id} data={data} />
          ))}
        </VStack>
      )}

      <ConfirmDeleteModal />
      <ConfirmResolvedModal />
      {actions.toast.isOpen && <Toast data={actions.toast} />}
    </AppContainer>
  );
}

export default React.memo(App);
