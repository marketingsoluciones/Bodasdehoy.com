import "../styles/globals.css";
import type { AppProps } from "next/app";
import DefaultLayout from "../layouts/DefaultLayout";
import "@fontsource/italiana";
import "@fontsource/montserrat";
import "@fontsource/poppins";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/Editor.css'
import ChatComponent from "../components/Chat/ChatComponent";
import { AuthContextProvider } from "../context";


function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <>
      <DefaultLayout>
        <ChatComponent />
        <Component {...pageProps} />
      </DefaultLayout>
      <style jsx global>
       {`
        html {
          scroll-behavior: smooth;
        }
        `}
      </style>
    </>
  );
}
export default MyApp;
