import { FC } from "react";
import {Footer, FooterMobile, Navigation} from "../components/Surface";
import { AuthContextProvider, ToastContextProvider } from "../context";

const DefaultLayout: FC = ({ children }) => {
  return (
    <AuthContextProvider>
      <ToastContextProvider>
        <div className="bg-color-base relative min-h-screen w-full">
          <Navigation />
          {/* <NavigationMobile /> */}

          <main className="w-full pt-20">{children}</main>
          <Footer />
          <FooterMobile />
        </div>
      </ToastContextProvider>
    </AuthContextProvider>
  );
};

export default DefaultLayout;
