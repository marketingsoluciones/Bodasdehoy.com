import Link from "next/link"
import { Isologo, LogoFullColor } from "./Icons"

export const Error404 = () => {
    return (
        <>
            <div className=" w-full flex flex-col  justify-center  items-center truncate">

                <div className=" banner -mt-20 w-full h-40" />

                <div className="flex  flex-col md:flex-row items-center space-y-6  md:space-x-10 py-10">

                    <div>
                        <h2 className="text-6xl md:text-6xl text-tertiary  subpixel-antialiased font-bold ">
                            404
                        </h2>
                    </div>

                    <div className="space-y-2">

                        <span className=" relative  font-light">
                            <h2 className="  md:pl-0 text-2xl md:text-3xl text-tertiary subpixel-antialiased  font-bold">
                                Lo Sentim
                                <b className="hidden">o</b>
                                <b className="md:pl-20px pl-17px">s</b>
                            </h2>
                            <Isologo className="mt-1 isologo absolute bottom-2 md:bottom-1.5 right-267px md:right-182px text-tertiary" />
                        </span>

                        <h3 className=" flex flex-col md:flex-row  text-2xl md:text-xl text-tertiary  subpixel-antialiased font-bold">
                            No pudimos encontrar<b className=""> esta pagina</b>
                        </h3>

                        <span className="  flex gap-4">
                            <h3 className="text-2xl md:text-xl text-tertiary  subpixel-antialiased font-bold">
                                Vuelve a
                            </h3>
                            <Link href={"/"} passHref>
                                <a >
                                    <LogoFullColor className="w-auto h-5  mt-2 md:mt-1.5 cursor-pointer " />
                                </a>
                            </Link>
                        </span>
                    </div>

                </div>
            </div>
        </>
    )
}