import { Form, Formik } from "formik";
import { EmailIcon } from "../Icons";
import { ButtonComponent, InputField } from "../Inputs";
import { useToast } from "../../hooks/useToast";
import * as Yup from "yup";
import { fetchApi, queries } from "../../utils/Fetching";

export const SuscribeInput = () => {
  const toast = useToast()
  const initialValues = {
    email: "",
  };
  const validation = Yup.object(
    {
      email: Yup.string().required("hola"),
    }
  )

  console.log(validation)


  const handleSubmit = async (value: any, {resetForm}:any ) => {
    try {
      const data = await fetchApi({
        query: queries.createSubscripcion, variables: {
          ...value, development: "bodasdehoy"
        }
      })
      if (data?.email) {
        toast("success", data?.email + " gracias por suscribirte al Newsletter")
        resetForm({value:''})
      }
    } catch (error) {
      console.log(error)
      toast("error", "sin datos")
    }
  };

  return (
    <div className="h-full flex items-center">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validation}
      >
        <Form className="flex items-center justify-center gap-3 *h-full">
            {/* <EmailIcon className="absolute top-0 my-auto inset-y-0 w-4 h-4 text-gray-200 left-4" /> */}
            <span className="h-full flex items-center">
              <InputField
                name={"email"}
                placeholder="correo electronico"
                type={"email"}
              />
            </span>
            <button className="bg-primary text-white px-4 py-2  rounded-xl" color="primary" type="submit">Enviar</button>
        </Form>
      </Formik>
    </div>
  );
};

