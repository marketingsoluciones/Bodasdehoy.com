import TitleSection from "./TitleSection";

const PlaceDiscovery = () => {
  return (
    <>
    <div className="grid-cards relative w-full">
    <div className="main xl:max-w-screen-lg 2xl:max-w-screen-lg mx-auto inset-x-0 pt-32 pb-20 z-20">
      <TitleSection principal={"Descubre"} secondary={"lugares para bodas"} />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 px-5 py-6 z-20 relative w-full">
        <PlaceCard />
        <PlaceCard />
        <PlaceCard />
        <PlaceCard />
      </div>
    </div>
    </div>
    <style jsx>
        {`
        .grid-cards::after {
            content: "";
            background-image: url("/break.svg");
            background-size: contain;
            position: absolute;
            width: 100%;
            height: 100px;
            top: 40%
            
        }

        .grid-cards::before{
            content: "";
            background-color: white;
            width: 100%;
            height: 50%;
            position: absolute;
            margin: auto;
            right: 0;
            left: 0;
            bottom: 0
        }
        `}
    </style>
    </>
  );
};

export default PlaceDiscovery;

const PlaceCard = () => {
  return (
    <div >
      <div className="w-56 h-52 bg-gray-100 rounded-2xl shadow"/>
      <h2 className="px-2 py-1 font-ligth text-gray-200 tracking-widest">Fincas</h2>
    </div>
  );
};
