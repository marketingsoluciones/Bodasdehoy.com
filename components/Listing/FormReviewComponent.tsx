import { Form, Formik, FormikContext, useField } from "formik";
import { FC } from "react";
import ButtonComponent from "../ButtonComponent";
import { RatingStars } from "../Home/FeaturedCompanies";
import { ArrowIcon, UploadImageIcon } from "../icons";

const FormReviewComponent: FC = () => {
  const initialValues = {
    source: "",
    profesionalidad: "",
    precio: "",
    recomendacion: "",
    message: ""
  };
  const listOption = [
    { title: "Utilizamos este servicio en nuestra boda", id: 0 },
    { title: "Lo consideramos un proveedor potencial", id: 1 },
    { title: "Estuve como invitado en una boda", id: 2 },
    { title: "Soy un profesional que conozco a este proveedor", id: 3 },
  ];
  return (
    <div className="py-4 w-full mx-auto inset-x-0">
      <h3 className="text-primary text-lg font-semibold">
        Cuéntanos ¿Qué te parecieron sus servicios?
      </h3>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => alert(values)}
      >
        <Form className="py-6 flex flex-col gap-4 w-full ">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <label className="text-tertiary ">
              ¿Cómo conociste a este proveedor?
            </label>
            <SelectField name={"source"} listOption={listOption} />
          </div>
          <div className="w-full gap-2 grid md:grid-cols-2">
              <RatingField name={"profesionalidad"} label={"Profesionalidad"} />
              <RatingField name={"precio"} label={"Calidad/Precio"} />
              <RatingField name={"recomendacion"} label={"¿Lo recomiendas?"} />
              <RatingField name={"flexibilidad"} label={"Flexibilidad"} />
          </div>
          <div className="relative ">
          <MessageField name={"message"} placeholder="Escribe tu reseña aquí" />
          <UploadImageIcon className="w-4 h-4 absolute top-3 right-3" />
          </div>
          <div className="flex w-full justify-end">
          <ButtonComponent color={"primary"} text="Añadir opinión" type={"submit"}  />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default FormReviewComponent;

interface propsSelectField {
  name: string;
  listOption: { title: string; id: number }[];
}

export const SelectField: FC<propsSelectField> = (props) => {
  const [field, meta, helpers] = useField({ ...props });
  console.log("field", field, "meta", meta, "helpers", helpers);
  return (
    <div className="relative w-full">
      <select
        className="md:text-sm text-xs text-gray-300 pl-3 py-2 rounded-lg focus:outline-none appearance-none w-full"
        onChange={(e) => helpers.setValue(e.target.value)}
      >
        <option className="text-gray-200 bg-color-base" disabled selected>
          Seleccionar una opción
        </option>
        {props?.listOption?.map((item, idx) => (
          <option key={idx} value={item.id} className="text-xs">
            {item.title}
          </option>
        ))}
      </select>
      {!field.value && <ArrowIcon width={3} className="w-5 h-5 text-primary rotate-90 transform absolute inset-y-0 my-auto right-2" />}
    </div>
  );
};


interface propsRatingField {
    name: string;
    label: string
  }

const RatingField : FC <propsRatingField>  = (props) => {
    const [field, meta, helpers] = useField({ ...props });
    return (
        <div className="gap-2 grid md:grid-cols-2 w-80">
            <label className=" text-tertiary capitalize">{props?.label}</label>
            <RatingStars size={"lg"} visibleText={false} rating={field.value} outValue={(value : number) => helpers.setValue(value)} />
        </div>
    )
}



interface propsMessageField {
  name: string,
  placeholder: string
}
const MessageField : FC <propsMessageField> = (props) => {
  const [field, meta, helpers] = useField({ ...props });
  return (
    <textarea className="w-full bg-white p-4 rounded-xl focus:outline-none focus:ring" value={field.value} placeholder={props?.placeholder} onChange={(e) => helpers.setValue(e.target.value) }/>
  )
}
