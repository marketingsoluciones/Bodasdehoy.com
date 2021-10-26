export const Promo = () => {
  return (
    <>
      <div className="promo w-full bg-white pl-10 py-2 rounded-lg border border-primary relative">
        <h3 className="text-primary">Promociones</h3>
        <p className="text-gray-200 text-xs">
          No te pierdas las ofertas en tu zona
        </p>
      </div>
      <style jsx>
        {`
          .promo::before {
            content: "%";
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            color: #f7628c;
            background-color: white;
            width: 5rem;
            height: 5rem;
            position: absolute;
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
