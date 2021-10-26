import {SuscribeInput} from ".";

export const SuscribeComponent = () => {
  return (
    <div className="py-10 flex flex-col items-center justify-center bg-white gap-1 w-full px-5 md:px-0">
      <h3 className="text-sm md:text-md text-primary text-center">
        ¿No te quieres perder las ultimas novedades para tu boda?
      </h3>
      <h4 className="text-sm text-gray-300">Suscribete a nuestra newsletter</h4>
      <div className=" pt-4">
        <SuscribeInput />
      </div>
    </div>
  );
};
