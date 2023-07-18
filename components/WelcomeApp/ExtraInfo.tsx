import { CuadroExtraInfo, CuadroExtraInfo2 } from "./MicroComponentes/CuadroExtraInfo"

export const ExtraInfo = () => {

    return (
        <>
            <div className="xl:max-w-screen-lg 2xl:max-w-screen-lg mx-auto flex flex-col justify-center items-center space-y-10">
                <CuadroExtraInfo />
                <CuadroExtraInfo2/>
            </div>
        </>
    )
}