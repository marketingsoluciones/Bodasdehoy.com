import { CrearEvento } from "../components/WelcomeApp/CrearEvento"
import { EventoOrganizador } from "../components/WelcomeApp/EventoOrganizador"
import { ExtraInfo } from "../components/WelcomeApp/ExtraInfo"
import { FacilGestion } from "../components/WelcomeApp/FacilGestion"
import { LograEvento } from "../components/WelcomeApp/LograEvento"
import { MasFacil } from "../components/WelcomeApp/MasFacil"

const WelcomeApp = () => {
    return (
        <>
            <section className="w-full">
                <div className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg md:pt-16 mx-auto ">
                    <CrearEvento />
                </div>
                <div className="relative">
                    <div className="bg-white md:pb-20">
                        <LograEvento />
                    </div>
                    <div className="hidden md:block absolute md:top-[25%] md:left-[18%]  ">
                        <img src="/imgPrincipal.png" alt="imagne principal" width={900} />
                    </div>
                    <div className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg md:pt-60 mx-auto ">
                        <EventoOrganizador />
                    </div>
                </div>
                <div className="bg-white w-full py-20 ">
                    <ExtraInfo />
                </div>
                <div className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg  mx-auto ">
                    <FacilGestion />
                </div>
                <div className="bg-white w-full py-20 ">
                    <MasFacil />
                </div>
            </section>
        </>
    )
}

export default WelcomeApp