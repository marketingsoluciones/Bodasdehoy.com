const SkeletonCardBusiness = () => {
  return (
    <div className="rounded-xl h-full w-96 md:h-80 md:w-60 transition mx-auto inset-x-0 mb-40 md:mb-0 ">
      <div
        className={`md:h-2/3 h-full rounded-xl w-full relative object-cover object-center transition bg-slate-300 animate-pulse`}
      />

      <div
        className={`bg-white overflow-hidden shadow rounded-xl md:-mt-16 -mt-10 p-6 flex h-max flex-col  z-20 relative`}
      >
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-3 ">
            <div className="h-3 w-2/3 bg-slate-300 rounded"/>
              <div className="h-2 w-3/5 bg-slate-300 rounded"/>
              <div className="flex items-center gap-2">
              <div className="h-5 rounded-full w-5 bg-slate-300"/>
              <div className="h-2 w-2/6 bg-slate-300 rounded"/>

              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCardBusiness;
