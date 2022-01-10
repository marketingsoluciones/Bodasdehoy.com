import { NextPage } from "next";
import { useRouter } from "next/router";
import Loading from "../components/Loading";
import { AuthContextProvider } from "../context";
const PagesWithAuth = (WrappedComponent: NextPage) => {
  return (props: any) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const { user } = AuthContextProvider();
      const Router = useRouter();

      if (!user) {
        Router.replace("/");
        return <Loading />;
      }

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default PagesWithAuth;
