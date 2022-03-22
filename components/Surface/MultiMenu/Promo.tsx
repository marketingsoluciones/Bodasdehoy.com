export const Promo = () => {
  return (
    <>
      <button className="w-full hover:opacity-80 transition bg-primary text-white rounded-lg border border-primary -mt-8 relative flex items-center gap-2 p-3">
        <span className="text-3xl font-semibold">%</span>
        <span className="text-left">
        <h3 className="uppercase font-semibold text-md">Promociones</h3>
        <p className="text-xs ">
          No te pierdas las ofertas en tu zona
        </p>

        </span>
      </button>
      <style jsx>
        {`
          .promo::after {
            content: "%";
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            color: #f7628c;
            background-color: white;
            width: 5rem;
            height: 5rem;
            
            top: 0;
            left: 0;
            margin: auto;
            bottom: 0;
            border-radius: 100%;
            border: 1px solid #f7628c;
            transform: translateX(-75%);
            z-index: 10;
          }
        `}
      </style>
    </>
  );
};
