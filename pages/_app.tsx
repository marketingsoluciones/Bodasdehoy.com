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
import { useEffect, useState } from "react";
import { InfoDevelopment } from '../components/InfoDevelopment';


function MyApp({ Component, pageProps }: AppProps) {


  return (
    <>
      <DefaultLayout>
        <ChatComponent />
        <InfoDevelopment />
        <DefaultSeo {...SEO} />
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
