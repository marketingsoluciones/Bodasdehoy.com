import useHover from "../../hooks/useHover";
import { CheckIcon, CheckIconFill } from "../icons";

const Feautres2Listing = ({
  title,
  proveedor,
  data
}: {
  title: string;
  proveedor: string;
  data? : {title: string, check: boolean}[]
}) => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-primary pb-4">
        {title}
        <span className="font-light"> {proveedor}</span>
      </h2>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {data?.map((item,idx) => (
              <Feature key={idx} text={item.title} check={item.check} />
          ))}
      </div>
    </div>
  );
};

export default Feautres2Listing;

export const Feature = ({ text, check = false }: { text: string, check?: boolean }) => {
  const [hoverRef, isHovered] = useHover()
    return (
    <div ref={hoverRef} className="flex gap-2 items-center">
      <div
        className={`${check && isHovered ? "bg-primary" : "bg-white"} w-5 h-5 rounded-full grid place-items-center ${check && isHovered ? "text-white" : "text-primary"} transition border-2 ${check ? "border-primary" : "border-gray-200"}`}
      >
        {check && <CheckIcon className="w-4 h-4" />}
      </div>
      <p className="text-gray-300">{text}</p>
    </div>
  );
};
