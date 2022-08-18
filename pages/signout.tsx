import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import { AuthContextProvider, LoadingContextProvider } from "../context";
import { useAuthentication } from "../utils/Authentication";


const SignOut: FC = () => {
  const { _signOut } = useAuthentication()
  const { setLoading } = LoadingContextProvider()
  const r = useRouter()
  const [mount, setMount] = useState(false)
  setLoading(true)
  useEffect(() => {
    if (r?.query?.end === "true") {
      if (!mount) {
        console.log(1234567)
        _signOut()
        setMount(true)
      }
    }
  }, [r, _signOut, mount]);


  return (
    <>
    </>
  );
};

export default SignOut;
