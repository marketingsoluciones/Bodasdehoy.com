import { Form, Formik } from "formik";
import { Checkbox, InputField } from "../../Inputs";
import { BlockConfiguration } from "../../../pages/configuracion";

export const Configuraciones = () => {
  const initialValues = {
    email: "",
  };
  const handleSubmit = () => {
    console.log("hola mundo");
  };
  return (
      <BlockConfiguration title="Notificaciones">
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form action="" className=" flex flex-col gap-3">
              <Checkbox
                name="newLetterMensual"
                label="Newsletter Mensuales"
                checked={true}
              />
              <Checkbox
                name="emailsFormation"
                label="Emails de formación durante durante la primera semana"
                checked={true}
              />
              <Checkbox
                name="favProviders"
                label="Alertas para saber sobre tus proveedores favoritos"
                checked={true}
              />
           
           
        <button
          className="bg-primary text-white px-5 py-2 rounded-xl w-fit ml-auto "
          color="primary"
          type="submit"
        >
          Añadir mails
        </button>
          </Form>
        </Formik>

      </BlockConfiguration>
  );
};
