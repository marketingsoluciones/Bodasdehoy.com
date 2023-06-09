import dynamic from "next/dynamic";
import { LoadingProvider, FiltersProvider } from "../context";
import ButtonCrearEmpresa from "../components/ButtonCrearEmpresa";
import ButtonReclamarEmpresa from "../components/ButtonReclamarEmpresa";
import ButtonEmpezar from "../components/ButtonEmpezar";
import { FloatButtonchat } from "../components/FloatButtonChat";
import { NavigationMobile } from "../components/Surface";
import { FC } from "react";
import Head from "next/head";
import Script from "next/script";
import { ButtonMessages } from "../components/ButtonMessages";
const DynamicAuthProvider = dynamic((): any =>
  import("../context").then((mod) => mod.AuthProvider)
);
const DynamicToastProvider = dynamic((): any =>
  import("../context").then((mod) => mod.ToastProvider)
);
const DynamicSocketProvider = dynamic((): any =>
  import("../context").then((mod) => mod.SocketProvider)
);
const DynamicChatsProvider = dynamic((): any =>
  import("../context").then((mod) => mod.ChatProvider)
);
const DynamicSidebarProvider = dynamic((): any =>
  import("../context").then((mod) => mod.SidebarProvider)
);
const DynamicNavigation = dynamic((): any =>
  import("../components/Surface").then((mod) => mod.Navigation)
);
const DynamicFooter = dynamic((): any =>
  import("../components/Surface/Footer").then((mod) => mod.Footer)
);
const DynamicFooterMobile = dynamic((): any =>
  import("../components/Surface/FooterMobile").then((mod) => mod.FooterMobile)
);
const DynamicNavbarMobile = dynamic((): any =>
  import("../components/Surface/NavbarMobile").then((mod) => mod.NavbarMobile)
);

const DefaultLayout: FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Bodas de hoy - Directorio de Bodas en España</title>
        <Script charSet="UTF-8" src="//web.webpushs.com/js/push/759e8f1ac698c18e51de3784cb1ff494_1.js" async></Script>

        <meta name="description" content="¡Bodas de Hoy! Miles de proveedores para bodas, en un sólo click. Conoce a los más destacados de la región y haz realidad tu boda de ensueño" />
      </Head>
      <DynamicAuthProvider>
        <DynamicSocketProvider>
          <DynamicChatsProvider>
            <LoadingProvider>
              <FiltersProvider>
                <DynamicToastProvider>
                  <div className="bg-color-base relative min-h-screen w-full h-full">
                    <DynamicSidebarProvider>
                      <ButtonCrearEmpresa />
                      {/* <ButtonMessages /> */}
                      <ButtonEmpezar />
                      <FloatButtonchat/>
                      <DynamicNavigation />
                      <DynamicNavbarMobile/>
                      {/* <NavigationMobile /> */}
                      <main className="w-full pt-5 md:pt-20">
                        {/* @ts-ignore */}
                        {children}
                      </main>
                      <DynamicFooter />
                      <DynamicFooterMobile />
                    </DynamicSidebarProvider>
                  </div>
                </DynamicToastProvider>
              </FiltersProvider>
            </LoadingProvider>
          </DynamicChatsProvider>
        </DynamicSocketProvider>
      </DynamicAuthProvider>
    </>
  );
};

export default DefaultLayout;
