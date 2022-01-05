import { FC } from 'react';
import {Footer, FooterMobile, Navigation} from "../components/Surface";
import { AuthProvider, ToastProvider, LoadingProvider } from "../context";

const DefaultLayout: FC = ({ children }) => {
  
  return (
    <AuthProvider>
      <LoadingProvider>
      <ToastProvider>
        <div className="bg-color-base relative min-h-screen w-full">
          <Navigation />
          {/* <NavigationMobile /> */}
          <main className="w-full pt-20">{children}</main>
          <Footer />
          <FooterMobile />
        </div>
      </ToastProvider>
      </LoadingProvider>
    </AuthProvider>
  );
};

export default DefaultLayout;
