import { FC } from "react";

interface propsIndiceSteps {
  step : Number
}
const IndiceSteps : FC <propsIndiceSteps> = ({step}) => {
  const steps = [
    "Información personal",
    "Galeria de fotos",
    "Preguntas frecuentes",
    "Promociones",
  ];

  const setWidth : CallableFunction = (step : number) : number  => {
    const base = 100 / steps.length
    console.log(Array.of(steps.length))
    return 0
  }
  return (
    <div className="w-full flex items-center gap-32 relative w-max mx-auto inset-x-0 py-6">
      {steps.map((item, idx) => (
        <Step step={idx} key={idx} isActive={idx < step} title={item} />
      ))}
      <Bar width={setWidth(step)} />
    </div>
  );
};

export default IndiceSteps;

interface propsStep {
  step: number;
  isActive: boolean;
  title: string
}
const Step: FC<propsStep> = ({ step, isActive, title }) => {
  return (
    <div className="z-10 relative w-max">
      <figure
        className={`rounded-full w-12 h-12 bg-white border-2 flex items-center justify-center text-xl ${
          isActive
            ? "border-primary"
            : "border-gray-300"
        }`}
      >
        <span className={`${isActive ? "text-primary" : "text-gray-400"}`}>{step}</span>
      <p className="text-xs  absolute text-center bottom-0 transform translate-y-full w-20 pt-1 text-gray-400">{title}</p>
      </figure>
    </div>
  );
};

interface propsBar {
  width: number
}
const Bar: FC <propsBar> = ({width}) => {
  return (
    <div className="rounded-xl w-full h-1 bg-gray-200 absolute ">
      <svg className="bg-primary h-full" width={`${width}%`} />
    </div>
  );
};
