import {
  Header,
  Panel,
  PanelDerecho,
} from "../../components/Dasboard/EmpresaInicio/Inicio";

const EmpresaInicio = () => {
  return (
    <div className="xl:max-w-screen-xl max-w-screen-lg mx-auto flex flex-col inset-x-0 w-full py-10 gap-8">
      <h1 className="text-primary text-2xl  font-bold ">Estadísticas</h1>
      <Header />
      <div className="flex space-x-2 flex-col">
      <div className="grid grid-cols-6 gap-10 ">
        <Panel />
        <PanelDerecho />
      </div>
          
      </div>
    </div>
  );
};
export default EmpresaInicio;
