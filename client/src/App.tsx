import React, { useEffect } from "react";
import "./App.css";
import { Divider, VStack } from "@chakra-ui/react";
import { Domain, useGetDomainsLazyQuery } from "./api";
import { useStore } from "./store";
import ConfirmDeleteModal from "./components/Modal/ConfirmDelete";
import ConfirmResolvedModal from "./components/Modal/ConfirmResolved";
import Toast from "./components/Toast";
import { AppContainer } from "./components/AppContainer";
import Header from "./components/Header";
import { Loader } from "./components/Loader";
import ItemContainer from "./components/ItemContainer";

function App() {
  const [fn, response] = useGetDomainsLazyQuery();
  const { state, dispatch } = useStore();

  useEffect(() => {
    dispatch({ type: "IS_RESOLVED" });
  }, []);

  useEffect(() => {
    //@ts-ignore
    fn({ variables: { isDeleted: state.actions.isResolved }, canonizeResults: true });
  }, [state.actions.isResolved]);

  useEffect(() => {
    if (response.data?.domains)
      //@ts-ignore
      dispatch({ type: "FETCHED_DATA", payload: response.data?.domains });
  }, [response.data?.domains]);

  return (
    <AppContainer>
      <Header />
      <Divider my={2} shadow={"dark-lg"} />

      {response.loading ? (
        <Loader />
      ) : (
        <VStack mt={2}>
          {state.store.domains?.map((data: Domain) => (
            <ItemContainer key={data.id} data={data} />
          ))}
        </VStack>
      )}

      <ConfirmDeleteModal />
      <ConfirmResolvedModal />
      {state.actions.toast.isOpen && <Toast data={state.actions.toast} />}
    </AppContainer>
  );
}

export default React.memo(App);
