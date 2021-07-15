import { FC } from "react"
import { Isologo, SearchIcon } from "../components/icons"

const Home : FC = () => {
  return (
    <section className="bg-base min-h-screen">
      <div className="xl:max-w-screen-lg 2xl:max-w-screen-xl py-10 mx-auto inset-x-0">
        <Welcome />
      </div>
    </section>
  )
}

export default Home

export const Welcome : FC = (props) => {
  return (
    <div className="relative w-max h-max flex flex-col gap-6">
      <h1 className="text-4xl text-tertiary relative subpixel-antialiased font-bold"><span className="relative font-light">Encuentra todo <Isologo className="mt-1 ml-0.25 absolute bottom-3 right-0" /></span> <br /> para una boda inolvidable</h1>
      <p className="text-tertiary">Miles de proveedores de bodas en un sólo lugar. </p>
      <Searcher />
    </div>
  )
}


const Searcher = () => {
  return (
    <div className="relative w-full">
      <input 
        placeholder="catering, hoteles, fincas, vestidos"
        className="px-3 py-2 w-full rounded-full focus:ring focus:outline-none transition" />
        <button className="bg-primary w-12 h-16 h-full rounded-full absolute top-0 right-0"><SearchIcon className="text-white"/></button>
    </div>
  )
}

