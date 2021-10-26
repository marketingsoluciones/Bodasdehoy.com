import { Form, Formik } from "formik";
import { EmailIcon } from "../Icons";
import { ButtonComponent, InputField } from "../Inputs";

export const SuscribeInput = () => {
  const initialValues = {
    email: "",
  };
  const handleSubmit = () => { console.log("hola mundo")};
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className="flex items-center gap-3">
        <span className="relative">
          <EmailIcon className="absolute top-0 my-auto inset-y-0 w-4 h-4 text-gray-200 left-4" />
          <InputField
            name={"email"}
            placeholder="correo electronico"
            type={"email"}
          />
        </span>
        <button className="bg-primary text-white px-4 py-2 rounded-xl" color="primary" type="submit">Enviar</button>
        </Form>
      </Formik>
    </div>
  );
};

