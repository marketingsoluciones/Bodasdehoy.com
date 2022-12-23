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
// Import Swiper styles
import 'swiper/css';
import "swiper/css/bundle";
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <DefaultLayout>
        <ChatComponent />
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </DefaultLayout>
      <style jsx global>
        {`
        body {
  overscroll-behavior: contain;
}
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1
          border-radius: 6px;
        }

        ::-webkit-scrollbar-thumb {
          background: pink;
          border-radius: 6px;
          height: 50%;
        }
      `}
      </style>
    </>
  );
}
export default MyApp;
