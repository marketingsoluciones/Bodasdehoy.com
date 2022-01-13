import { Location2Icon as LocationIcon, StarRating } from "../Icons"

const CardBusiness = ({promocion = false}) => {
    return (
        <div className="rounded-xl">
            <img className="h-80 bg-black rounded-xl w-full relative object-cover object-center" src={"/catering.jpg"} alt="" />
            <div className="bg-white h-max shadow rounded-xl -mt-20 p-6 pt-10 flex flex-col gap-2 z-20 relative">
                {promocion && <div className="text-white bg-primary px-4 text-sm absolute top-0 left-5 rounded-full transform -translate-y-1/2 py-1">Promoción</div>}
                <div className="flex gap-2 items-center">
                    <StarRating className="text-yellow w-6 h-7" />
                    <StarRating className="text-yellow w-6 h-7" />
                    <StarRating className="text-yellow w-6 h-7" />
                    <StarRating className="text-yellow w-6 h-7" />
                    <StarRating className="text-gray-100 w-6 h-7" />
                </div>
                <h2 className="text-xl text-tertiary font-semibold">La Manga Club</h2>
                <div className="flex items-end gap-2">
                <LocationIcon className="text-primary"/>
                <p className="text-gray-200 text-sm">Guimar, Santa Cruz</p>
                </div>
            </div>
        </div>
    )
}

export default CardBusiness
