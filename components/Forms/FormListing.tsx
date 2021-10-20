import { Form, Formik } from "formik";
import React from "react";
import ButtonComponent from "../ButtonComponent";
import { EmailIcon, Isologo, LinkProps, PhoneIcon, UserIcon2 } from "../icons";
import { InputField } from "./InputField";



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
    <>
    <div className="flex gap-2 items-center text-primary w-full justify-center">
        <Isologo className="w-5 h-5" />
        <h2 className="text-md text-light">Consultar disponibilidad</h2>
      </div>
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
        
        </span>

        <span className="h-max relative text-gray-200">
          <textarea  className="w-full bg-color-base p-2 h-20 text-sm rounded focus:outline-none focus:ring transition" placeholder={"Escribe tu solicitud a la empresa"}>
            
          </textarea>
        </span>

        <ButtonComponent text={"Enviar solicitud"} color={"primary"} type={"submit"} className="mx-auto inset-x-0"/>
        <div className="pt-10 mt-3 border-t border-gray-100 flex gap-6 justify-center items-center">
          <ButtonComponent text={"Telefono"} color={"white"} type={"button"}>
            <PhoneIcon />
          </ButtonComponent>
          <ButtonComponent text={"Ver web"} color={"white"} type={"button"} >
            <LinkProps />
          </ButtonComponent>
        </div>
      </Form>
    </Formik>
    </>
  );
};

export default FormListing;
