import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import StoreProvider from "./context";
import ActionsProvider from "./context/actions";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <ChakraProvider>
      <StoreProvider>
        <ActionsProvider>
          <App />
        </ActionsProvider>
      </StoreProvider>
    </ChakraProvider>
  </ApolloProvider>
);
