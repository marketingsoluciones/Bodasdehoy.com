import { FC, useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { AuthContextProvider } from "../context/AuthContext";

const DefaultLayout: FC = ({ children }) => {
  const [user, setUser] = useState({
    _id: "",
    username: "",
    email: "",
  });
  return (
    <AuthContextProvider>
      <div className="bg-base relative min-h-screen">
        <Navigation />

        <main>{children}</main>
        <Footer />
      </div>
    </AuthContextProvider>
  );
};

export default DefaultLayout;
