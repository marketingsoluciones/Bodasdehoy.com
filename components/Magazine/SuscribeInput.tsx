import { Form, Formik } from "formik";
import { EmailIcon } from "../Icons";
import { ButtonComponent, InputField } from "../Inputs";
import { useToast } from "../../hooks/useToast";
import * as Yup from "yup";

export const SuscribeInput = () => {
  const toast = useToast()
  const initialValues = {
    email: "",
  };
  const validation = Yup.object(
    {
      email: Yup.string().required("requerido"),
    }
  )

  const handleSubmit = async (value: any) => {
    const data = value.email
    if (data.length > 3) {
      toast("success", data + " gracias por suscribirte al Newsletter")
    } else {
      toast("error", "sin datos")
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validation}
      >

        <Form className="flex items-center justify-center gap-3">
            <span className="relative flex ">
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

