import React, { FC } from "react";
import { business } from "../../interfaces/index";
import { createURL } from "../../utils/UrlImage";
import { createSrcSet } from "../../utils/CreateSrcSet";

const ChatComponentView: FC<business> = ({ contactName, businessName, imgLogo }) => {
  return (
    <div className="w-full">
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
            <span className="text-xs text-gray-400">
                en linea
            </span>
        </div>
      </div>

      <div className="relative w-full p-6 overflow-y-auto h-[40rem] text-xs">
        <ul className="space-y-2">
          <li className="flex justify-start">
            <div className="relative max-w-xl px-3 py-1 text-gray-700 rounded shadow">
              <span className="block">Hola</span>
            </div>
          </li>
          <li className="flex justify-end">
            <div className="relative max-w-xl px-3 py-1 text-gray-700 bg-gray-100 rounded shadow">
              <span className="block">Holaaa!</span>
            </div>
          </li>
          <li className="flex justify-end">
            <div className="relative max-w-xl px-3 py-1 text-gray-700 bg-gray-100 rounded shadow">
              <span className="block">como estas?</span>
            </div>
          </li>
          <li className="flex justify-start">
            <div className="relative max-w-xl px-3 py-1 text-gray-700 rounded shadow">
              <span className="block">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.{" "}
              </span>
            </div>
          </li>
        </ul>
      </div>

      <div className="flex items-center justify-between w-full py-3 border-t border-gray-300">
        <input
          type="text"
          className="text-gray-700 text-xs block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-lg focus:outline-none  border-gray-300"
          name="mensaje"
          required
        />

        <button type="submit">
          <svg
            className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
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
