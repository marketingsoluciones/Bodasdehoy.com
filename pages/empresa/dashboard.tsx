import { AuthContextProvider } from "../../context";
import useFetch from "../../hooks/useFetch"
import { useState, useEffect, FC, MouseEventHandler } from "react";
import { business } from "../../interfaces";
import PagesWithAuth from "../../HOC/PagesWithAuth";
import Link from "next/link";
import { ExitIcon, ShareWhiteIcon, MessageIcon, CameraIcon, Location2IconBlack, PromoIconBlack, VideoIcon, DocumentIcon } from "../../components/Icons";
import { array } from "yup";


const query = `query ($uid : ID){
    getBusinesses(uid:$uid){
        _id,
        userUid,
        businessName,
        country,
        city,
        slug,
        zip,
        fase
        address,
        imgMiniatura{
          i1024
          i800
          i640
          i320
        }
        imgLogo{
          i1024
          i800
          i640
          i320
        }
        description,
      subCategories{
        _id
        title
      }
      }
  }`;

const Dashboard = () => {

    const { user } = AuthContextProvider()

    const initialQuery = {
        query,
        variables: { uid: user?.uid },
    }

    const [dato, setDato, loading, error, fetchy] = useFetch(initialQuery);

    const [isActive, setActive] = useState(0)

    const handleClickOption = (idx: number) => {
        setActive(idx)
    }

    const ArryOpt = [
        {
            titulo: "Datos de la empresa",
            icon: <DocumentIcon className="h-5" />
        },
        {
            titulo: "Localizacion y mapa",
            icon: <Location2IconBlack className="h-5" />
        },
        {
            titulo: "Preguntas frecuentes",
            icon: <MessageIcon className="h-5 " />
        },
        {
            titulo: "Promociones",
            icon: <PromoIconBlack className="h-5 w-5 " />
        },
        {
            titulo: "Fotos",
            icon: <CameraIcon className="h-5 w-4" />
        },
        {
            titulo: "Videos",
            icon: <VideoIcon />
        },
        {
            titulo: "Redes Sociales",
            icon: <ShareWhiteIcon className="h-5" fill="#ffffff" />
        },
        {
            titulo: "*Planes",
            icon: ""
        },
    ]

    const ArryComp = [
        {
            component: "1",
            id: 0
        },
        {
            component: "2",
            id: 1
        }, {
            component: "3",
            id: 2
        }, {
            component: "4",
            id: 3
        }, {
            component: "5",
            id: 4
        }, {
            component: "6",
            id: 5
        }, {
            component: "7",
            id: 6
        }, {
            component: "8",
            id: 7
        },
    ]


    return (
        <div className="container max-w-screen-lg mx-auto inset-x-0 py-10 w-full px-2 md:px-0 grid grid-cols-8 gap-6">
            <div className="col-span-2 h-full w-full bg-white rounded-md p-3  flex flex-col *space-y-4 divide-y">
                <div className="flex gap-4 w-max items-center pb-4">
                    <div className="cursor-pointer">
                        <Link href={"/"} passHref >
                            {/* <a>
                                <img src="/hogar.png" alt="back" className="h-6" />
                            </a> */}
                            <ExitIcon className="w-4 h-4" />
                        </Link>

                    </div>
                    <select name="select" id="select" className="rounded-md w-44 truncate">
                        {dato?.map((item: any, idx: any) => (
                            <option key={idx} value={item.businessName} className="text-ellipsis">{item.businessName}</option>
                        ))}
                    </select>
                </div>
                {
                    ArryOpt.map((item, idx) => (
                        <div key={idx} className={` ${isActive === idx ? " text-primary " : " text-gray-500 hover:text-tertiary"}   flex items-center space-x-2 py-2 cursor-pointer`} onClick={() => handleClickOption(idx)}>
                            {item.icon}
                            <span className={`${isActive === idx ? " text-primary" : " text-gray-500 hover:text-tertiary "} `}>
                                {item.titulo}
                            </span>
                        </div>
                    ))
                }
            </div>

            <div className="col-span-6 p-3 ">
                <div className="  bg-white w-full rounded-md">
                    {ArryComp[isActive].component}
                </div>
            </div>
        </div>
    )
}

export default PagesWithAuth(Dashboard, "empresa")
