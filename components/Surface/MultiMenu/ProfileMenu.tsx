import { FC } from "react";
import { AuthContextProvider, LoadingContextProvider } from "../../../context";
import { useAuthentication } from "../../../utils/Authentication";
import { useRouter } from "next/router";
import { ListItemProfile, Option } from "./ListItemProfile";
import { CompanyIcon, Eventos, Posts, StarRating, UserIcon, WeddingPage } from "../../Icons";
import { CSSTransition } from "react-transition-group";
import { PiUserPlusLight } from "react-icons/pi"
import { RiLoginBoxLine } from "react-icons/ri"
import { MdLogout } from "react-icons/md"
import { BiBell } from "react-icons/bi"
import { useToast } from "../../../hooks/useToast";

export const ProfileMenu: FC<any> = ({ isHovered, setHovered, modal, setModal }) => {
  const { user } = AuthContextProvider();
  const { setLoading } = LoadingContextProvider();
  const { _signOut } = useAuthentication()
  const toast = useToast()

  const router = useRouter()

  const options: Option[] = [
    {
      title: "Iniciar sesión",
      onClick: async () => { await router.push(`/login?d=${router.asPath.slice(1, router.asPath.length)}`) },
      icon: <RiLoginBoxLine />,
      rol: undefined,
    },
    {
      title: "Registrarse",
      onClick: async () => { await router.push(`/login?q=register&d=${router.asPath.slice(1, router.asPath.length)}`) },
      icon: <PiUserPlusLight />,
      rol: undefined,
    },
    {
      title: "Mis empresas",
      onClick: async () => {
        const path = window.origin.includes("://test.") ? process.env.NEXT_PUBLIC_CMS?.replace("//", "//test") : process.env.NEXT_PUBLIC_CMS
        await router.push(user?.role?.includes("empresa") ? path ?? "" : "/info-empresa")
      },
      icon: <CompanyIcon />,
      rol: ["all"],
    },
    {
      title: "Notificaciones",
      onClick: async () => { setModal(!modal) },
      icon: <BiBell />,
      rol: ["novio", "novia", "otro", "empresa"],
    },
    {
      title: "Mis post",
      onClick: async () => {
        toast("success", "debes ininiciar sessión o registrarte")
        const path = `${window.origin.includes("://test.") ? process.env.NEXT_PUBLIC_CMS?.replace("//", "//test") : process.env.NEXT_PUBLIC_CMS}/InfoPage/publicaciones`
        await router.push(user?.uid ? path ?? "" : `/login?d=${router.asPath.slice(1, router.asPath.length)}&end=${process.env.NEXT_PUBLIC_CMS}/InfoPage/publicaciones`)
      },
      icon: <Posts />,
      rol: ["all"],
    },
    {
      title: "Wedding page",
      onClick: async () => { setModal(!modal) },
      icon: <WeddingPage />,
      rol: ["novio", "novia", "otro", "empresa"],
    },
    {
      title: "Mis eventos",
      onClick: async () => { await router.push(`/welcome-app`) },
      icon: <Eventos />,
      rol: ["all"],
    },
    {
      title: "Mi perfil",
      onClick: async () => { await router.push(`/configuracion`) },
      icon: <UserIcon />,
      rol: ["novio", "novia", "otro", "empresa"],
    },
    {
      title: "Cerrar Sesion",
      icon: <MdLogout />,
      onClick: async () => {
        setHovered(false)
        setLoading(true);
        _signOut()
        setLoading(false);
      },
      rol: ["novio", "novia", "otro", "empresa"],
    },
  ];

  const optionsReduce = options.reduce((acc: Option[], item: Option) => {
    if (
      item.rol?.includes(user?.role ? user.role[0] : "") ||
      item.rol?.includes("all") ||
      item.rol === user?.role
    ) {
      acc.push(item)
    }
    return acc
  }, [])

  return (
    <CSSTransition
      in={isHovered}
      unmountOnExit
      mountOnEnter
      timeout={300}
      classNames={"fade"}>
      < div
        className={`w-80 p-3 rounded-xl h-max bg-white shadow-md absolute bottom-0 right-0 inset-y-full translate-y-1 overflow-hidden z-50 
    }`}
      >
        <div className="w-full border-b border-gray-100 pb-2">
          <p className="text-gray-500 font-extralight uppercase tracking-wider	text-xs text-center  cursor-default">
            {user?.role && user?.role?.length > 0 && user?.role[0]}
          </p>
          <h3 className="text-primary font-medium w-full text-center cursor-default ">
            {user?.displayName}
          </h3>
        </div>
        <ul className="grid grid-cols-2 gap-2 text-xs place-items-left p-2 ">
          {optionsReduce.map((item: Option, idx) => (
            <ListItemProfile key={idx} {...item} />
          ))}
        </ul>
      </div >
    </CSSTransition >

  );
};