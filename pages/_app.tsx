import "../styles/globals.css";
import type { AppProps } from "next/app";
import DefaultLayout from "../layouts/DefaultLayout";
import "@fontsource/italiana";
import "@fontsource/montserrat";
import "@fontsource/poppins";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Editor.css";
import ChatComponent from "../components/Chat/ChatComponent";
import "swiper/css";
import "swiper/css/bundle";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import { InfoDevelopment } from "../components/InfoDevelopment";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log(router);

  if (!router.asPath.includes("/landingpage")) {
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
  } else {
    return (
      <>
        <Component {...pageProps} />
      </>
    );
  }
}
export default MyApp;
