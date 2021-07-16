import TitleSection from "./TitleSection"

const PodcastList = () => {
    return (
        <div className="max-w-screen-lg mx-auto inset-x-0 w-full">
            <TitleSection principal={"Podcast"} secondary={"Cómplices de Bodas"} />
            <div className="grid grid-cols-3 gap-6 py-6">
                <Podcast />
                <Podcast />
                <Podcast />
            </div>
        </div>
    )
}

export default PodcastList


const Podcast = () => {
    return (
        <>
        <div className="bg-white rounded-xl shadow w-80 h-44 hover:opacity-80 transition cursor-pointer">
            
        </div>
        <style jsx>
            {`
            div {
                background-image: url("/mask_2.png");
                background-size: cover;
                background-position: center
            }
            `}
        </style>
        </>
    )
}

