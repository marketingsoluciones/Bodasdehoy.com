import React, { FC, cloneElement } from "react";
import { Feature } from "../components/Home/AdsApp";
import { CheckIcon } from "../components/Icons";
import { ButtonComponent } from "../components/Inputs";
import { PropsIcon } from "../components/Icons/index";
import Slider from "react-slick";
import Link from "next/link";
import ReclamarEmpresa from "../components/ReclamarEmpresa/ReclamarEmpresa"
import { CheckboxScreen } from "../components/CheckboxScreen";
import { AuthContextProvider } from "../context";
import { fetchApi, queries } from "../utils/Fetching";
import { useToast } from "../hooks/useToast";
import { useRouter } from "next/router";

interface sliderItem {
  icon: any;
  title: string;
  description: string;
}

const InfoEmpresas = () => {
  const { user } = AuthContextProvider()
  const toast = useToast()
  const router = useRouter()
  const features = [
    "Recibe solicitudes de presupuesto de novios interesados",
    "Consigue nuevos clientes y posiciona tu negocio",
    "Ordenar, busca y responde tus solicitudes de servicios",
    "Construye relaciones con los novios",
  ];

  const contentSlider: sliderItem[] = [
    {
      title: "Más novios te encuentran",
      description:
        "A través de una solicitud de presupuesto con sus datos personales y los detalles del servicio en el que están interesados.",
      icon: <Icon1 />,
    },
    {
      title: "Gestiona las solicitudes",
      description:
        "Podrás responder con tu email o desde la web a los novios interesados en tus sevicios publicados.",
      icon: <Icon2 />,
    },
  ];

  const handleClick = async () => {
    const resp = await fetchApi({
      query: queries.updateAccount
    })
    if (resp === "ok") {
      toast("success", "ahora tu cuenta es de empresa")
      const path = window.origin.includes("://test.") ? process.env.NEXT_PUBLIC_CMS?.replace("//", "//test") : process.env.NEXT_PUBLIC_CMS
      await router.push(path ?? "")
    }
  }

  return (
    <div className="w-full bg-white">
      <div className="banner -mt-20 w-full h-40" />
      <div className="max-w-screen-lg mx-auto inset-x-0 py-10 px-5">
        <h1 className="text-3xl text-tertiary font-medium pb-2">
          ¡Llega a más novios cada mes!
        </h1>
        <div className="grid md:grid-cols-2 pt-4 gap-2 w-full">
          {features.map((item, idx) => (
            <div key={idx} className="w-full flex  text-sm gap-2 items-center">
              <CheckIcon className="w-4 h-4 border border-primary rounded-full text-primary" />
              {item}
            </div>
          ))}
        </div>
        {user?.uid &&
          <>
            <h3 className="text-center text-tertiary py-3 px-8 mt-2 text-sm">
              Puedes convertir gratis tu cuenta en una cuenta de empresa
            </h3>
            <div className="mx-auto w-max ">
              <ButtonComponent onClick={handleClick}>
                Convertir mi cuenta en empresa
              </ButtonComponent>
            </div>
            <h3 className="text-center text-tertiary font-medium">
              O
            </h3>
          </>
        }
        <div className={`mx-auto w-max ${user?.uid ? "pt-1" : "pt-8"}`}>
          <Link href={"/login?d=info-empresa&f=register"} passHref >
            <ButtonComponent>
              REGISTRATE <strong>GRATIS</strong> COMO EMPRESA
            </ButtonComponent>
          </Link>
        </div>
        <h3 className="text-center text-tertiary font-medium py-3 ">
          Y si ya tienes una cuenta empresa
        </h3>
        <div className="mx-auto w-max pt-2">
          <Link href={"/login?d=info-empresa"} passHref >
            <ButtonComponent>
              INICIA SESION
            </ButtonComponent>
          </Link>
        </div>
      </div>
      <div className="w-full bg-color-base grid grid-cols-1 p-10">
        <Slider autoplay={true}>
          {contentSlider.map((item, idx) => (
            <SliderItem key={idx} {...item} />
          ))}
        </Slider>
      </div>
      <div className="max-w-screen-lg mx-auto inset-x-0 py-16 grid md:grid-cols-2 place-items-center -mt-10  px-5 md:px-0">
        <div>
          <h2 className="text-primary text-xl">
            ¿Qué te ofrece <strong>Bodas de Hoy?</strong>
          </h2>
          <div className="flex flex-col gap-4 pt-6 pl-5">
            <div className="flex items-center gap-4 ">
              <Icon3 />
              <p className="text-sm text-gray-700">Un completo escaparate donde te verán miles de novios interesados en tus servicios.</p>
            </div>
            <div className="flex items-center gap-4 ">
              <Icon4 className="w-8" />
              <p className="text-sm text-gray-700">Te ayudamos a hacer crecer tu negocio</p>
            </div>
            <div className="flex items-center gap-4 ">
              <Icon5 />
              <p className="text-sm text-gray-700">Gestiona tu escaparate, solicitudes de novios y campañas de publicidad con tan solo unos clics</p>
            </div>
          </div>

        </div>
        <div className="hidden md:block w-full relative">
          <img src="/DesktopImageBusiness.png" className="object-center object-contain w-full h-full" alt="desktopImageBusiness" />
          <img src="/MobileImageBusiness.png" className="object-center object-contain absolute w-24 -bottom-7 left-1/4" alt="desktopImageBusiness" />

        </div>
      </div>
      <style jsx>
        {`
          .banner {
            background-image: url("/bannerCreateBusiness.webp");
            background-size: cover;
            background-position: center;
          }
        `}
      </style>
    </div>
  );
};

export default InfoEmpresas;

const SliderItem: FC<sliderItem> = ({ icon, title, description }) => {
  return (
    <div className="w-1/3 flex flex-col items-center justify-center text-center mx-auto gap-1">
      {cloneElement(icon, { className: "w-10 h-10" })}
      <h2 className="text-primary font-semibold text-lg">{title}</h2>
      <small className="text-gray-600">{description}</small>
    </div>
  );
};

const Icon1: FC<PropsIcon> = (props) => {
  return (
    <svg
      width={70}
      height={61}
      viewBox="0 0 70 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M64.0746 52.6418C67.9069 48.0701 68.9505 41.7558 66.7951 36.1809C64.6403 30.6066 59.6304 26.6629 53.7359 25.9007V7.18092C53.7317 3.21685 50.5398 0.00477447 46.6014 0H7.13442C3.19602 0.00477447 0.00474363 3.21745 0 7.18092V40.5813C0.00474363 44.5453 3.19602 47.758 7.13442 47.7622H36.4151C38.2811 52.8721 42.5527 56.7103 47.8075 57.9988C53.0629 59.2873 58.6099 57.8573 62.6017 54.1839L68.1861 59.8048C68.6012 60.2219 69.2736 60.2219 69.6887 59.8048C70.1038 59.387 70.1038 58.7096 69.6887 58.2918L64.0746 52.6418ZM7.13442 2.139H46.6014C49.367 2.14258 51.6077 4.39795 51.6107 7.18092V12.4281H2.12515V7.18092C2.12811 4.39795 4.36889 2.14258 7.13442 2.139ZM7.13442 45.6232C4.36948 45.6202 2.12811 43.3648 2.12515 40.5813V14.5671H51.6107V25.7676C46.6999 25.7831 42.0594 28.0331 38.9873 31.8898C35.9146 35.7464 34.7412 40.7943 35.7937 45.6226L7.13442 45.6232ZM37.5411 42.1157C37.5411 34.2681 43.8614 27.9066 51.6582 27.9066C59.4549 27.9066 65.7752 34.2681 65.7752 42.1157C65.7752 49.9632 59.4549 56.3247 51.6582 56.3247C43.865 56.3164 37.5494 49.9597 37.5411 42.1157Z"
        fill="#49516F"
      />
      <path
        d="M15.1757 10.3649H15.1847C16.7456 10.3671 18.013 9.0929 18.0153 7.51874C18.0181 5.94457 16.7546 4.66634 15.1931 4.66407H15.1847C13.6238 4.66179 12.3563 5.93546 12.3535 7.5102C12.3513 9.08437 13.6148 10.3626 15.1757 10.3649ZM15.1847 6.70377H15.1869C15.6311 6.70434 15.9905 7.068 15.99 7.51589C15.9894 7.96321 15.6288 8.32574 15.1847 8.32517H15.1819C14.7383 8.3246 14.3788 7.96094 14.3794 7.51305C14.38 7.06515 14.7406 6.7032 15.1847 6.70377Z"
        fill="#49516F"
      />
      <path
        d="M6.6819 10.3655H6.69237C8.39499 10.368 9.77752 8.97795 9.77998 7.26068C9.78244 5.5434 8.40422 4.14897 6.7016 4.14649H6.69175C4.98913 4.14339 3.6066 5.53347 3.60352 7.25074C3.60106 8.96864 4.97928 10.3624 6.6819 10.3655ZM6.69175 6.37162H6.69421C7.17927 6.37224 7.57138 6.76896 7.57138 7.25757C7.57076 7.7468 7.17804 8.1429 6.69298 8.1429C6.20854 8.1429 5.8152 7.7468 5.81459 7.25757C5.81459 6.76896 6.20669 6.37224 6.69175 6.37162Z"
        fill="#49516F"
      />
      <path
        d="M23.6663 10.3649H23.6767C25.3794 10.3671 26.7619 9.0929 26.7644 7.51874C26.7668 5.94457 25.3886 4.66634 23.686 4.66407H23.6761C21.9735 4.66122 20.591 5.93547 20.5879 7.50963C20.5854 9.08437 21.9637 10.3626 23.6663 10.3649ZM23.6761 6.70377H23.6792C24.163 6.70434 24.5551 7.068 24.5545 7.51532C24.5539 7.96322 24.1606 8.32574 23.6761 8.32517H23.6737C23.1892 8.3246 22.7971 7.96094 22.7977 7.51305C22.7983 7.06515 23.1917 6.70263 23.6761 6.70377Z"
        fill="#49516F"
      />
    </svg>
  );
};
const Icon3: FC<PropsIcon> = (props) => {
  return (
    <svg width={40} height={36} viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M36.4593 0H3.54067C1.5862 0.00210345 0.00211446 1.5779 0 3.52215V24.8524C0.00211446 26.797 1.5862 28.3724 3.54067 28.3749H14.0503V34.1032H11.8907C11.3924 34.1032 10.9885 34.5049 10.9885 35.0006C10.9885 35.4963 11.3924 35.8981 11.8907 35.8981H28.5844C29.0827 35.8981 29.4865 35.4963 29.4865 35.0006C29.4865 34.5049 29.0827 34.1032 28.5844 34.1032H25.9501V28.3749H36.4593C38.4138 28.3724 39.9979 26.797 40 24.8524V3.52215C39.9979 1.5779 38.4138 0.00210345 36.4593 0ZM3.54067 1.7949H36.4593C37.4179 1.79596 38.1946 2.56861 38.1957 3.52215V21.5588H1.80434V3.52215C1.8054 2.56861 2.58211 1.79596 3.54067 1.7949ZM24.1454 34.1032H15.8542V28.3749H24.1454V34.1032ZM36.4593 26.58H3.54067C2.58211 26.5789 1.8054 25.8059 1.80434 24.8524V23.3537H38.1957V24.8524C38.1946 25.8059 37.4179 26.5789 36.4593 26.58Z" fill="#49516F" />
    </svg>
  );
};
const Icon2: FC<PropsIcon> = (props) => {
  return (
    <svg
      width="51"
      height="51"
      viewBox="0 0 51 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M51 19.1615V43.0404C51 45.1514 50.1516 47.176 48.6414 48.6687C47.1313 50.1614 45.0831 51 42.9474 51H8.05263C5.91694 51 3.86872 50.1614 2.35856 48.6687C0.8484 47.176 0 45.1514 0 43.0404V19.1615C0 16.2164 1.61858 13.6428 4.02632 12.2684L4.01826 12.2578L25.4946 0L46.9871 12.2658L46.9844 12.2737C48.2059 12.973 49.22 13.9775 49.9248 15.1864C50.6296 16.3953 51.0004 17.7662 51 19.1615ZM4.60879 15.0915L25.5 28.5008L46.3912 15.0915L25.4946 3.06446L4.60879 15.0915ZM25.5 31.6634L3.0439 17.2512C2.80577 17.8605 2.68382 18.5082 2.68421 19.1615V43.0404C2.68421 44.4477 3.24981 45.7974 4.25658 46.7926C5.26336 47.7877 6.62884 48.3468 8.05263 48.3468H42.9474C44.3712 48.3468 45.7366 47.7877 46.7434 46.7926C47.7502 45.7974 48.3158 44.4477 48.3158 43.0404V19.1615C48.3158 18.4876 48.1896 17.8428 47.9561 17.2512L25.5 31.6608V31.6634Z"
        fill="#49516F"
      />
    </svg>
  );
};
const Icon4: FC<PropsIcon> = (props) => {
  return (
    <svg width="40" height="39" viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M38 32.8281L28.1667 32.8281L28.1667 12.7669C28.1667 12.4012 28.4658 12.1037 28.8333 12.1037L33.5 12.1037C33.8676 12.1037 34.1667 12.4012 34.1667 12.7669L34.1667 29.7769C34.1667 30.1431 34.4652 30.4401 34.8333 30.4401C35.2015 30.4401 35.5 30.1431 35.5 29.7769L35.5 12.7669C35.5 11.6699 34.6028 10.7773 33.5 10.7773L28.8333 10.7773C27.7306 10.7773 26.8333 11.6699 26.8333 12.7669L26.8333 32.8281L24.3333 32.8281L24.3333 17.7407C24.3333 16.6438 23.4361 15.7512 22.3333 15.7512L17.6667 15.7512C16.5639 15.7512 15.6667 16.6438 15.6667 17.7407L15.6667 30.2048C15.6667 30.571 15.9652 30.868 16.3333 30.868C16.7015 30.868 17 30.571 17 30.2048L17 17.7407C17 17.3751 17.2991 17.0776 17.6667 17.0776L22.3333 17.0776C22.7009 17.0776 23 17.3751 23 17.7407L23 32.8281L13.1667 32.8281L13.1667 22.7146C13.1667 21.6175 12.2695 20.7251 11.1667 20.7251L6.5 20.7251C5.39717 20.7251 4.5 21.6175 4.5 22.7146L4.5 30.523C4.5 30.8892 4.7985 31.1861 5.16667 31.1861C5.53483 31.1861 5.83333 30.8892 5.83333 30.523L5.83333 22.7146C5.83333 22.3489 6.13242 22.0514 6.5 22.0514L11.1667 22.0514C11.5343 22.0514 11.8333 22.3489 11.8333 22.7146L11.8333 33.4913C11.8333 33.8575 12.1318 34.1545 12.5 34.1545L38 34.1545C38.3676 34.1545 38.6667 34.452 38.6667 34.8176L38.6667 36.144C38.6667 36.5097 38.3676 36.8072 38 36.8072L2 36.8072C1.63242 36.8072 1.33333 36.5097 1.33333 36.144L1.33333 34.8176C1.33333 34.452 1.63242 34.1545 2 34.1545L8.83333 34.1545C9.2015 34.1545 9.5 33.8575 9.5 33.4913C9.5 33.125 9.2015 32.8281 8.83333 32.8281L2 32.8281C0.89725 32.8281 1.19782e-07 33.7207 1.25509e-07 34.8176L1.32433e-07 36.144C1.3816e-07 37.241 0.89725 38.1335 2 38.1335L38 38.1335C39.1028 38.1335 40 37.241 40 36.144L40 34.8176C40 33.7207 39.1028 32.8281 38 32.8281Z" fill="#49516F" />
      <path d="M5.94707 16.6538C16.6402 14.8041 26.4031 10.1811 33.9995 2.3495L33.9995 3.48272C33.9995 3.84896 34.298 4.14591 34.6662 4.14591C35.0343 4.14591 35.3328 3.84896 35.3328 3.48272C35.3328 0.426008 35.3471 0.599265 35.2978 0.453281C35.2246 0.235342 35.0394 0.0673895 34.8108 0.0170702C34.7062 -0.00597556 34.9163 0.00098788 31.5828 0.000987897C31.2147 0.000987899 30.9162 0.29793 30.9162 0.664175C30.9162 1.03042 31.2147 1.32736 31.5828 1.32736L33.1378 1.32736C26.1002 8.61918 16.654 13.4554 5.71857 15.347C5.35582 15.4097 5.1129 15.7531 5.17598 16.1139C5.23873 16.473 5.5824 16.7168 5.94707 16.6538Z" fill="#49516F" />
    </svg>

  );
};

const Icon5: FC<PropsIcon> = (props) => {
  return (
    <svg width={40} height={40} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0_594_7245)">
        <path d="M4.99244 39.8976H35.1332C37.3825 39.8948 39.2049 38.0724 39.2077 35.8231V8.3294C39.2053 6.08011 37.3825 4.25693 35.1332 4.25454H33.5448V3.13846C33.5448 1.34836 32.0939 -0.102539 30.3042 -0.102539C28.5141 -0.102539 27.0632 1.34836 27.0632 3.13846V4.25454H13.0629V3.13846C13.0629 1.34836 11.6116 -0.102539 9.82185 -0.102539C8.03175 -0.102539 6.58085 1.34836 6.58085 3.13846V4.25454H4.99244C2.74315 4.25693 0.92036 6.07972 0.917969 8.329V35.8231C0.92036 38.0724 2.74315 39.8948 4.99244 39.8976ZM35.1332 38.6731H4.99244C3.41917 38.6711 2.14406 37.3964 2.14246 35.8231V12.3943H37.9832V35.8231C37.9812 37.3964 36.7065 38.6711 35.1332 38.6731ZM28.2873 3.13846C28.2873 2.02478 29.1901 1.12195 30.3038 1.12195C31.4175 1.12195 32.3203 2.02478 32.3203 3.13846V5.2873C32.3203 6.40099 31.4175 7.30381 30.3038 7.30381C29.1901 7.30381 28.2873 6.40099 28.2873 5.2873V3.13846ZM7.80494 3.13846C7.80494 2.02478 8.70737 1.12195 9.82105 1.12195C10.9347 1.12195 11.8376 2.02478 11.8376 3.13846V5.2873C11.8376 6.40099 10.9347 7.30381 9.82105 7.30381C8.70737 7.30381 7.80494 6.40099 7.80494 5.2873V3.13846ZM4.99244 5.47903H6.58683C6.68847 7.19101 8.10668 8.52711 9.82145 8.52711C11.5362 8.52711 12.9544 7.19101 13.0561 5.47903H27.0692C27.1708 7.19101 28.589 8.52711 30.3038 8.52711C32.019 8.52711 33.4368 7.19101 33.5384 5.47903H35.1332C36.7065 5.48062 37.9812 6.75574 37.9832 8.329V11.1698H2.14246V8.3294C2.14406 6.75574 3.41877 5.48062 4.99244 5.47903Z" fill="#49516F" />
        <path d="M24.5627 24.2647C22.8687 24.2595 21.2448 24.9395 20.0597 26.15C18.2613 24.3233 15.5368 23.7648 13.1644 24.7366C10.7919 25.7084 9.24219 28.0179 9.24219 30.5816C9.24219 33.145 10.7919 35.4545 13.1644 36.4263C15.5368 37.398 18.2613 36.8396 20.0597 35.0128C22.0695 37.0553 25.2024 37.4889 27.6917 36.0695C30.1809 34.6501 31.403 31.7332 30.6688 28.9633C29.9346 26.1935 27.4282 24.2647 24.5627 24.2647ZM15.5628 35.6733C12.7506 35.6729 10.4715 33.3929 10.4719 30.5808C10.4719 27.7691 12.7518 25.4896 15.564 25.49C18.3761 25.49 20.6552 27.7695 20.6552 30.5816C20.6521 33.3925 18.3737 35.6705 15.5628 35.6733ZM24.5619 35.6733C23.1481 35.6769 21.7976 35.0886 20.8374 34.051C22.2273 31.9464 22.2273 29.2153 20.8374 27.1107C22.4234 25.4083 24.9621 24.9977 27.0041 26.1134C29.0461 27.229 30.0721 29.5871 29.4965 31.8416C28.9206 34.0961 26.8897 35.6737 24.5627 35.6733H24.5619Z" fill="#49516F" />
        <path d="M15.8285 19.8597C15.8249 20.5788 16.1099 21.2696 16.6193 21.7774L19.6296 24.7661C19.8679 25.0032 20.2534 25.0032 20.4921 24.7661L23.5043 21.7762C24.0129 21.2684 24.2987 20.5792 24.2987 19.8601C24.2987 19.1414 24.0129 18.4519 23.5043 17.9441C22.584 17.0261 21.1422 16.889 20.066 17.6176C19.2353 17.0504 18.1591 16.9898 17.2707 17.4602C16.3818 17.9305 15.8265 18.8545 15.8281 19.8601L15.8285 19.8597ZM17.4835 18.8094C17.7637 18.5264 18.1464 18.369 18.5446 18.3733C18.9308 18.3686 19.3023 18.5216 19.5726 18.7975C19.5761 18.8014 19.5801 18.8054 19.5841 18.8094L19.628 18.8533C19.8671 19.0924 20.2546 19.0924 20.4937 18.8533L20.5376 18.809C20.911 18.4248 21.4623 18.2709 21.9805 18.4068C22.4987 18.5428 22.9036 18.9469 23.0404 19.4651C23.1767 19.9833 23.0236 20.5345 22.6398 20.9084L20.0608 23.4694L17.4835 20.9104C16.9095 20.3277 16.9095 19.3922 17.4835 18.8098V18.8094Z" fill="#49516F" />
        <path d="M20.0634 15.6215C20.4018 15.6215 20.6757 15.3473 20.6757 15.0092V13.7138C20.6757 13.3758 20.4018 13.1016 20.0634 13.1016C19.7254 13.1016 19.4512 13.3758 19.4512 13.7138V15.0096C19.4516 15.3477 19.7258 15.6215 20.0634 15.6215Z" fill="#49516F" />
        <path d="M22.7312 16.2856C22.9954 16.4965 23.3809 16.4526 23.5913 16.1879L24.3686 15.2114C24.5791 14.9467 24.5356 14.5617 24.271 14.3512C24.0063 14.1403 23.6212 14.1842 23.4104 14.4489L22.6331 15.4254C22.4226 15.6901 22.4665 16.0751 22.7312 16.2856Z" fill="#49516F" />
        <path d="M16.5353 16.1886C16.7462 16.4521 17.1304 16.4956 17.3947 16.2851C17.6585 16.075 17.7028 15.6908 17.4931 15.4261L16.7167 14.4495C16.5058 14.1853 16.1208 14.1414 15.8561 14.3519C15.5914 14.5623 15.5476 14.9474 15.7584 15.2121L16.5353 16.1886Z" fill="#49516F" />
      </g>
      <defs>
        <clipPath id="clip0_594_7245">
          <rect width={40} height={40} fill="white" />
        </clipPath>
      </defs>
    </svg>

  );
};

