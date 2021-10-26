export const PrincipalPost = () => {
    return (
        <div className="w-full relative  hidden md:grid pt-4">
          <div className="bg-white w-3/5 rounded-2xl shadow-lg h-max absolute top-1/4 py-6 px-12">
            <h2 className="font-medium text-2xl">
              Flores para novias: 5 modelos en tendencia
            </h2>
            <div className="grid grid-cols-8 pt-3">
                <div className="col-span-2 flex flex-col justify-center items-end border-r pr-3 border-primary py-1">
                    <h3 className="text-primary text-sm ">Ceremonia</h3>
                    <p className="text-gray-300 text-xs">17 de junio de 2021</p>
                </div>
                <div className="col-span-6 px-4">
                    <p className="text-xs">Siempre pensamos en las nuevas tendencias de bodas, en la moda y en las más recientes propuestas, lo que nos lleva a dejar de lado antiguas alternativas que aún pueden servirnos.</p>
                </div>
            </div>
          </div>
          <div>
        <img
          src="/mask_1.png"
          className="h-80 w-2/4 rounded-2xl object-cover float-right"
          alt={""}
        />

          </div>
        </div>
    )
}

