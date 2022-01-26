import React, { useState } from 'react'
import { BurgerIcon } from '../Icons'
import Image from 'next/image'
import Logo from "../../public/logo.webp";
import { Icons } from './Navigation';
import {Sidebar} from './';

export const NavigationMobile = () => {
    const [showSidebar, setShowSidebar] = useState(false)
    return (
        <>
        <Sidebar set={(act : boolean) => setShowSidebar(act)} state={showSidebar}/>
        <div className="bg-white h-20 w-full md:hidden block relative flex items-center justify-between px-5 z-50 ">
            <span onClick={() => setShowSidebar(!showSidebar)}>
            <BurgerIcon className="w-7 h-7 text-primary" />
            </span> 
            <Image
            src={Logo}
            alt={"Logo bodasdehoy.com"}
            width={160}
            objectFit={"contain"}
          />
          <Icons />
        </div>
        </>
    )
}

