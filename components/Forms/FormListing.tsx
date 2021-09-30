import { Form, Formik } from "formik";
import React from "react";
import { EmailIcon, UserIcon2 } from "../icons";
import { InputField } from "./InputField";
import PhoneField from "./PhoneField";



const FormListing = () => {
  const initialValue = {
    name: "",
    email: "",
    telefono: "",
    message: "",
  };

  const HandleOnSubmit = () => {
    console.log("click");
  };
  return (
    <Formik initialValues={initialValue} onSubmit={HandleOnSubmit}>
      <Form className="py-5 flex flex-col gap-4 text-sm h-max">
        <span className="h-max relative text-gray-200">
          <InputField name="name" type="text" placeholder="Nombre y apellido" />
          <UserIcon2 className="absolute w-5 h-5 inset-y-0 my-auto left-4 " />
        </span>

        <span className="h-max relative text-gray-200">
          <InputField
            name="email"
            type="email"
            placeholder="Correo electronico"
          />
          <EmailIcon className="absolute w-5 h-5 inset-y-0 my-auto left-4 " />
        </span>

        <span className="h-max relative text-gray-200">
          <InputField name="email" type="email" placeholder="Telefono" />
          <EmailIcon className="absolute w-5 h-5 inset-y-0 my-auto left-4 " />
          <PhoneField />
        </span>

        <span className="h-max relative text-gray-200">
          <label >Mensaje</label>
          <textarea id="w3review" className="w-full bg-base p-2 rounded focus:outline-none focus:ring transition" name="w3review" rows={4} cols={50}>
            
          </textarea>
        </span>
      </Form>
    </Formik>
  );
};

export default FormListing;
