export const Banner = () => {
  return (
    <div className="w-full relative">
      <div className="relative w-full flex items-center justify-end h-full overflow-hidden pb-28 md:pb-0 ">
        <div className="w-5/6 md:w-1/2 p-8 bg-white absolute md:top-0 my-auto md:inset-y-0 bottom-0  h-max left-0 rounded-xl">
          <h1 className="text-tertiary text-lg font-semibold border-b pb-4 border-primary">
            15 formas románticas de pedir matrimonio, ¡la 5 os sorprenderá!
          </h1>
          <p className="text-sm text-gray-200 pt-4">
            Es una de las escenas que más nos gusta en una peli romántica y uno
            de los momentos que más hemos imaginado. ¿Cómo será la tuya?
          </p>
          <p className="absolute bottom-0 transform pt-3 translate-y-full text-xs text-gray-200 italic">Por María de los Angeles</p>
        </div>
        <img
          alt={"mascara"}
          className="w-5/6 md:w-3/5 bg-gray-300 h-80 md:h-96 rounded-xl object-cover object-center"
          src={"/mask_1.png"}
        />
      </div>
    </div>
  );
};
