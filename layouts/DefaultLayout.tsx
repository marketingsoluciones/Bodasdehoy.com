import dynamic from "next/dynamic";
import { LoadingProvider, FiltersProvider } from "../context";
import ButtonCrearEmpresa from "../components/ButtonCrearEmpresa";
import { NavigationMobile } from "../components/Surface";
import { FC } from "react";
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

const DefaultLayout: FC = ({ children }) => {
  return (
    <DynamicAuthProvider>
      <DynamicSocketProvider>
        <DynamicChatsProvider>
          <LoadingProvider>
            <FiltersProvider>
              <DynamicToastProvider>
                <div className="bg-color-base relative min-h-screen w-full h-full">
                  <DynamicSidebarProvider>
                    <ButtonCrearEmpresa />
                    <DynamicNavigation />
                    <NavigationMobile />
                    <main className="w-full pt-20">
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
  );
};

export default DefaultLayout;
