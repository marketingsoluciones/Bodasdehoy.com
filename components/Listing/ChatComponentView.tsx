import React, { FC } from "react";
import { business } from "../../interfaces/index";
import { createURL } from "../../utils/UrlImage";
import { createSrcSet } from "../../utils/CreateSrcSet";
import { Isologo } from "../Icons/index";

const ChatComponentView: FC<business> = ({
  contactName,
  businessName,
  imgLogo,
}) => {
  return (
    <div className="w-full border-b border-gray-200 pb-4">
      <div className="relative flex items-center p-3 border-b border-gray-200">
        <span className="relative w-max">
          <img
            alt={contactName === "" ? businessName : contactName}
            className="object-cover w-10 h-10 rounded-full border border-gray-200"
            src={
              imgLogo?.i640 ? createURL(imgLogo.i640) : "/placeholder/logo.png"
            }
            srcSet={createSrcSet(imgLogo)}
          />
          <span className="absolute w-3 h-3 bg-green-600 rounded-full -right-0 border border-white top-0" />
        </span>
        <div className="flex ml-2 items-start flex-col justify-end">
          <span className="block font-bold text-gray-600 capitalize">
            {contactName === "" ? businessName : contactName}
          </span>
          <span className="text-xs text-gray-400">en linea</span>
        </div>
      </div>


      <div className="flex flex-col items-center justify-between w-full py-3">
      <span className="flex items-center text-primary text-sm gap-2 py-2 justify-start w-full">
        <Isologo className="w-4 h-4" />
        Envia un mensaje al proveedor
      </span>
        <input
          type="text"
          className="text-gray-700 text-sm block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-lg focus:outline-none  border-gray-300"
          name="mensaje"
          placeholder="Hola, ¿estas disponible?"
          required
        />

        <button className="flex items-center text-white bg-primary w-full mt-2 text-sm p-2 flex justify-center rounded-lg hover:opacity-90 transition hover:text-gray-100 gap-1" type="submit">
          Enviar mensaje
          <svg
            className="w-4 h-4 origin-center transform rotate-90"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatComponentView;
