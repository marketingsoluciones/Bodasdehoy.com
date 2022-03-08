import Link from "next/link";
import router from "next/router";
import { FC, MouseEventHandler } from "react";
import { Menu } from "./Menu";
import { useState } from "react";
import {
  StatisticsInsideComponent,
} from "../EmpresaInicio/Tablero";
import { CheckIcon, UserIcon } from "../../Icons";
import { ButtonComponent } from "../../Inputs";

export const Header: FC = () => {
  const HeaderOptions = [
    {
      title: "Solicitudes recibidas",
      subtitle: "Los úlltimos 12 meses",
      icon: <UserIcon />,
    },
    {
      title: "Tiempo de respuesta",
      subtitle: "Los úlltimos 3 meses",
      icon: <UserIcon />,
    },
    {
      title: "Opiniones",
      subtitle: "Los úlltimos 12 meses",
      icon: <UserIcon />,
    },
    {
      title: "Impresiones de tu escaparate",
      subtitle: "Los úlltimos 12 meses",
      icon: <UserIcon />,
    },
    {
      title: "Clics en ver teléfono",
      subtitle: "Los úlltimos 12 meses",
      icon: <UserIcon />,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg flex p-10 justify-between">
      {HeaderOptions.map((item, idx) => (
        <div key={idx} className="text-center flex flex-col text-sm items-center gap-3">
          <div className="flex items-center gap-2">
            {item.icon}
            <p className="text-xl font-bold text-gray-900">0</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h2 className="text-primary text-md font-bold">{item.title}</h2>
            <h3 className="text-xs">{item.subtitle}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export const Panel = () => {
  const [isActive, setActive] = useState(0);
//   const components = [
//     { component: <StatisticsInsideComponent />, id: 0 },
//     { component: <Solicitudes />, id: 1 },
//     { component: <Telefono />, id: 2 },
//     { component: <SitioWeb />, id: 3 },
//   ];

const components = [
    {title: "Impresiones de tu Escaparate", description: "Esta gráfica muestra el número de impresiones de tu escaparate por novios interesados en tus servicios durante el ultimo año"},
    {title: "Solicitudes recibidas", description: "Esta gráfica muestra el número de solicitudes realizadas por novios interesados en tus servicios.  "},
    {title: "Click en ver teléfono", description: "Esta gráfica muestra las veces que los novios interesados en tus servicios han visto tu número de telefono."},
    {title: "Click en ver sitio Web", description: "Esta gráfica muestra las veces que los novios interesados en tus servicios han visto tu sitio web."},
]
  const handleClickOption = (idx: number) => {
    setActive(idx);
  };

  return (
    <div className="col-span-4 w-full bg-white rounded-lg shadow-lg p-2 grid grid-cols-4">
      <Menu onClick={handleClickOption} state={isActive} />
      <div className="p-5 col-span-3">
          <StatisticsInsideComponent title={components[isActive].title} description={components[isActive].description} />
      </div>
    </div>
  );
};

export const PanelDerecho = () => {
    const recommendations = [
        "Comparte tus mejores",
        "Actualiza las preguntas frecuentes",
        "Activa tus promociones",
        "Comparte tus mejores",
        "Comportelo en otras plataformas"

    ] 
  return (
    <div className="col-span-2 bg-white rounded-lg shadow-lg p-5 space-y-5 h-max">
      <div>
        <h2 className="text-primary text-lg font-bold">¡Sigue estas recomendaciones!</h2>
        <small>Manten tu escaparate actualizado</small>
      </div>
      <ul className="flex flex-col gap-4">
          {recommendations.map((item,idx) => (
             <li key={idx} className={"text-sm flex items-center gap-2"}>
                 <div className="w-4 h-4 roudned-lg border border-primary rounded-xl text-primary"><CheckIcon/></div>
                 <p className="text-tertiary font-medium">{item}</p>
             </li> 
          ))}
      </ul>
      <div className="mx-auto inset-x-0 w-max">
      <ButtonComponent>
          Actualizar
      </ButtonComponent>

      </div>
    </div>
  );
};
