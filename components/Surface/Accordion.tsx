import { ReactChild, useState, FC } from 'react';
import { ArrowIcon } from "../Icons"

export const Accordion : FC <{title: string,isOpen : boolean, onClick: any}> = ({title = "Lorem ipsum", isOpen,  children, ...rest}) => {
    
    return (
        <div className="w-full">
            <div
             className="text-gray-500 p-3 bg-color-base rounded-xl flex items-center justify-between cursor-pointer hover:bg-gray-100 transition" {...rest}>
            <h2 className={`${isOpen ? "text-gray-700" : "text-gray-500"} text-sm transition capitalize`}>{title}</h2>
            <ArrowIcon width={3} className={`transform w-6 h-6 rotate-90 text-primary transition ${isOpen ? "-rotate-90 duration-700" : ""}`} />
            </div>
            <div className={`overflow-hidden transition-all duration-500 h-auto  ${isOpen ? "max-h-96" : "max-h-0"}`}>
        <div className="accordion-content text-sm p-3">{children}</div>
      </div>
        </div>
    )
}

