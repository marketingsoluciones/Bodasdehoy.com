import "../styles/globals.css";
import type { AppProps } from "next/app";
import DefaultLayout from "../layouts/DefaultLayout";
import "@fontsource/italiana";
import "@fontsource/montserrat";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/Editor.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
      
    </>
  );
}
export default MyApp;
