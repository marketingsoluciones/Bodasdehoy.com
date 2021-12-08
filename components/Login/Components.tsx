import { FC, MouseEventHandler, useContext } from "react";
import { GoogleProvider, FacebookProvider } from "../../firebase";
import { Icon } from "../Surface/Footer";
import { AppleIcon, FacebookIcon, GoogleIcon } from "../Icons";
import { getAuth, signInWithPopup, UserCredential } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../api";
import router from "next/router";
import { GraphQL } from '../../utils/Fetching';

interface propsRegisterQuestion {
  onClick: MouseEventHandler;
}
export const RegisterQuestion: FC<propsRegisterQuestion> = ({ onClick }) => {
  return (
    <h2 className={`font-light text-tertiary flex gap-2 items-center `}>
      ¿No dispones de una cuenta?
      <span
        className="text-primary font-semibold cursor-pointer hover:text-tertiary transition"
        onClick={onClick}
      >
        Regístrate
      </span>
    </h2>
  );
};

export const Providers: FC = () => {
  const { setUser } = useContext(AuthContext);

  const handleClick = async (provider: any) => {
    try {
      // Autenticar con firebase
      const auth = getAuth();
      const res: UserCredential = await signInWithPopup(auth, provider);
      //

      const moreInfo = await GraphQL.getUser(res.user.uid)
      // Actualizar estado con los dos datos
      setUser({ ...res.user, ...moreInfo });
      await router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const ListProviders = [
    {
      icon: <FacebookIcon className="w-5 h-5" />,
      function: () => alert("Aun por configurar"),
    },
    {
      icon: <GoogleIcon className="w-5 h-5" />,
      function: () => handleClick(GoogleProvider()),
    },
    { icon: <AppleIcon className="w-5 h-5" />, function: () => alert("Aun por configurar") },
  ];

  return (
    <div className={`text-center flex flex-col gap-2 w-full items-center `}>
      <h1 className="text-primary">Accede con</h1>
      <div className="gap-4 flex items-center">
        {ListProviders.map((item, idx) => (
          <Icon key={idx} icon={item.icon} onClick={item.function} />
        ))}
      </div>
    </div>
  );
};

export const BusinessAccess: FC = () => {
  return (
    <div className="w-full text-center h-max text-gray-500">
      <p >¿Eres profesional?</p>
      <h3 className="text-primary font-medium cursor-pointer hover:text-tertiary transition">
        Acceso para empresas
      </h3>
    </div>
  );
};
