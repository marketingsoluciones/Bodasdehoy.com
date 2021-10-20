import { FC, useState } from "react";
import Footer from "../components/Footer";
import FooterMobile from "../components/FooterMobile";
import Navigation from "../components/Navigation";
import NavigationMobile from "../components/NavigationMobile";
import Sidebar from "../components/Sidebar";
import { AuthContextProvider } from "../context/AuthContext";

const DefaultLayout: FC = ({ children }) => {
  
  return (
    <AuthContextProvider>
      <div className="bg-color-base relative min-h-screen w-full">
        
        <Navigation />
        {/* <NavigationMobile /> */}

        <main className="w-full pt-20">{children}</main>
        <Footer />
        <FooterMobile />
      </div>
    </AuthContextProvider>
  );
};

export default DefaultLayout;
