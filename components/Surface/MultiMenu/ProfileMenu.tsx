import { FC } from "react";
import { AuthContextProvider, LoadingContextProvider } from "../../../context";
import { useAuthentication } from "../../../utils/Authentication";
import { useRouter } from "next/router";
import { ListItemProfile, Option } from "./ListItemProfile";
import { ChatIcon, CompanyIcon, Eventos, UserIcon } from "../../Icons";
import { CSSTransition } from "react-transition-group";
import { PiUserPlusLight } from "react-icons/pi"
import { RiLoginBoxLine } from "react-icons/ri"
import { MdLogout } from "react-icons/md"
import { BsCamera } from "react-icons/bs"
import Cookies from "js-cookie";
import { getChatLoginUrl } from "../../../utils/whitelabelUrls";

export const ProfileMenu: FC<any> = ({ isHovered, setHovered, modal, setModal }) => {
  const { user } = AuthContextProvider();
  const { setLoading } = LoadingContextProvider();
  const { _signOut } = useAuthentication()

  const router = useRouter()
  const cookieContent = JSON.parse(Cookies.get("guestbodas") ?? "{}")
  const options: Option[] = [
    {
      title: "Iniciar sesión",
      onClick: async () => {
        const redirect = encodeURIComponent(window.location.href)
        const url = getChatLoginUrl(redirect)
        if (!url) {
          console.error("NEXT_PUBLIC_CHAT no está definido.")
          return
        }
        window.location.href = url
      },
      icon: <RiLoginBoxLine />,
      rol: undefined,
    },
    {
      title: "Registrarse",
      onClick: async () => {
        const redirect = encodeURIComponent(window.location.href)
        const url = getChatLoginUrl(redirect, "register")
        if (!url) {
          console.error("NEXT_PUBLIC_CHAT no está definido.")
          return
        }
        window.location.href = url
      },
      icon: <PiUserPlusLight />,
      rol: undefined,
    },
    {
      title: "Mis eventos",
      onClick: async () => {
        router.push(cookieContent?.eventCreated || user?.uid ? process.env.NEXT_PUBLIC_EVENTSAPP ?? "" : "/welcome-app")
      },
      icon: <Eventos />,
      rol: ["all"],
    },
    {
      title: "Copilot IA",
      onClick: async () => {
        router.push(process.env.NEXT_PUBLIC_CHAT ?? "")
      },
      icon: <ChatIcon />,
      rol: ["all"],
    },
    {
      title: "Momentos",
      onClick: async () => {
        router.push(process.env.NEXT_PUBLIC_MEMORIES ?? "")
      },
      icon: <BsCamera />,
      rol: ["novio", "novia", "otro"],
    },
    {
      title: "Suite",
      onClick: async () => {
        router.push(user?.role?.includes("empresa") ? process.env.NEXT_PUBLIC_SUITE ?? "" : "/info-empresa")
      },
      icon: <CompanyIcon />,
      rol: ["empresa"],
    },
    {
      title: "Mi perfil",
      onClick: async () => { router.push(`/configuracion`) },
      icon: <UserIcon />,
      rol: ["novio", "novia", "otro", "empresa"],
    },
    {
      title: "Cerrar Sesión",
      icon: <MdLogout />,
      onClick: async () => {
        setHovered(false)
        setLoading(true);
        _signOut()
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
        className={`bg-white w-80  p-3 rounded-xl h-max shadow-md absolute bottom-0 right-0 inset-y-full translate-y-1 overflow-hidden z-50
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
