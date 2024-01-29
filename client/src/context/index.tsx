import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Domain, useGetDomainsLazyQuery } from "../api";
import { Loader } from "../components/Loader";
import { ErrorPage } from "../components/ErrorPage";
import { AppContainer } from "../components/AppContainer";
import Header from "../components/Header";
import { Divider } from "@chakra-ui/react";

interface IStore {
  domains: Domain[];
  handledata: (data: Domain[]) => void;
  addNewDomain: (data: Domain) => void;
  deleteDomain: (id: string) => void;
  addPassword: (id: string, pwd: string) => void;
  isResolved: boolean;
  includeResolved: () => void;
}

//@ts-ignore
const AppStore = createContext<IStore>(null);

export const useStore = () => useContext(AppStore);

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [fn, response] = useGetDomainsLazyQuery();
  const [domains, setDomains] = useState<Domain[]>([]);
  const [isResolved, setIsResolved] = useState(false);

  const handledata = (data: Domain[]) => {
    setDomains(data);
  };

  const addNewDomain = (data: Domain) => {
    setDomains([data, ...domains]);
  };

  const deleteDomain = (id: string) => {
    setDomains(domains.filter((d) => d.id !== id));
  };

  const addPassword = (id: string, pwd: string) => {
    const nl = domains.map((obj) => {
      if (obj.id === id) {
        if (!obj.usedPW) return { ...obj, usedPW: [pwd] };
        //@ts-ignore
        return { ...obj, usedPW: [...obj.usedPW, pwd] };
      }
      return obj;
    });
    //@ts-ignore
    setDomains(nl);
  };

  const includeResolved = () => {
    localStorage.setItem(
      "include_resolved",
      JSON.stringify({ status: !isResolved })
    );
    setIsResolved(!isResolved);
    window.location.reload();
  };

  useEffect(() => {
    const data = localStorage.getItem("include_resolved");

    if (!data) {
      localStorage.setItem(
        "include_resolved",
        JSON.stringify({ status: false })
      );
      return;
    }

    const { status } = JSON.parse(data || "");
    setIsResolved(status);
  }, []);

  useEffect(() => {
    fn({ variables: { isDeleted: isResolved }, canonizeResults: true });
  }, [isResolved]);

  useEffect(() => {
    if (response.data?.domains) {
      //@ts-ignore
      setDomains(response.data.domains);
    }
  }, [response.data?.domains]);

  if (response.error) return <ErrorPage error={response.error} />;

  return (
    <AppStore.Provider
      value={{
        domains,
        handledata,
        addNewDomain,
        deleteDomain,
        addPassword,
        isResolved,
        includeResolved,
      }}
    >
      <AppContainer>
        <Header />
        <Divider my={2} shadow={"dark-lg"} />
        {response.loading ? <Loader /> : <>{children}</>}
      </AppContainer>
    </AppStore.Provider>
  );
};

export default StoreProvider;
