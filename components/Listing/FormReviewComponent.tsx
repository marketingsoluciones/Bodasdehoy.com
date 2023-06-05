import { Form, Formik, FormikContext, useField } from "formik";
import { FC, forwardRef, MouseEventHandler, useEffect, useState } from "react";
import { ButtonComponent } from "../Inputs";
import { RatingStars } from "../Home/FeaturedCompanies";
import { ArrowIcon, CrossIcon, UploadImageIcon } from "../Icons";
import { SelectField } from "../Inputs/SelectFieldComponent";
import { AuthContextProvider } from "../../context";
import { fetchApi, queries } from "../../utils/Fetching";
import * as yup from "yup";
import { IDGenerator } from "../../utils/IDGenerator";
import { image } from "../../interfaces/index";
import { createURL } from "../../utils/UrlImage";
import { DeleteIcon } from "../Icons/index";
import { useHover } from "../../hooks/useHover";
import { useToast } from "../../hooks/useToast";

const FormReviewComponent: FC<any> = forwardRef(
  ({ businessID, onClose, setReviews, fetchy, initialValues }, ref: any) => {
    const { user } = AuthContextProvider();

    const initialValuesWithoutUserAndBusiness = { ...initialValues };
    if (initialValuesWithoutUserAndBusiness) {
      delete initialValuesWithoutUserAndBusiness.user;
      delete initialValuesWithoutUserAndBusiness.business;
      delete initialValuesWithoutUserAndBusiness.createdAt;
      delete initialValuesWithoutUserAndBusiness._id;
      delete initialValuesWithoutUserAndBusiness.average;
    }

    const initialValues2 = {
      user: user?.uid,
      business: businessID,
      reference: "",
      professionalism: "",
      priceQuality: "",
      recommended: "",
      flexibility: "",
      comment: "",
    };
    const listOptions = [
      "Utilizamos este servicio en nuestra boda",
      "Lo consideramos un proveedor potencial",
      "Estuve como invitado en una boda",
      "Soy un profesional que conozco a este proveedor",
    ];

    const message = "Campo requerido";

    const schemaValidation = yup.object().shape({
      user: yup.string(),
      business: yup.string(),
      reference: yup.string().required(message),
      professionalism: yup.string().required(message),
      priceQuality: yup.string().required(message),
      recommended: yup.string().required(message),
      flexibility: yup.string().required(message),
      comment: yup.string().required(message),
    });

    const toast = useToast()

    return (
      <Formik
        initialValues={{
          ...initialValues2,
          ...initialValuesWithoutUserAndBusiness,
        }}
        innerRef={ref}
        validationSchema={schemaValidation}
        onSubmit={async (values, actions) => {
          if (initialValues) {
            try {
              const data = await fetchApi({
                query: queries.updateReview,
                variables: { args: values, id: initialValues._id },
                token: user?.accessToken,
                type: "formData",
              });
              if (data.errors) {
                throw new Error();
              }
              toast("success", "Reseña enviada con exito")
              fetchy();
              onClose();
            } catch (error) {
              toast("error", "Error al enviar la reseña")
              console.log(error);
            }
          } else {
            try {
              const data = await fetchApi({
                query: queries.createReviews,
                variables: { args: values, development: "bodasdehoy" },
                token: user?.accessToken,
                type: "formData",
              });
              data && setReviews((old: any) => [...old, data]);
              if (data.errors) {
                throw new Error();
              }
              toast("success", "Reseña enviada con exito")
              fetchy();
              onClose();
            } catch (error) {
              toast("error", "Error al enviar la reseña")
              console.log(error);
            }
          }
        }}
      >
        <Form className="py-6 flex flex-col gap-6 w-full ">
          <div className="flex flex-col items-center gap-1 text-sm w-full">
            <SelectField
              name={"reference"}
              options={listOptions}
              label="¿Cómo conociste a este proveedor?"
            />
          </div>
          <label className="text-sm text-gray-500 -mb-4">Calificación</label>
          <div className="w-full gap-x-2 gap-y-4 grid grid-cols-2 w-full">
            <RatingField name={"professionalism"} label={"Profesionalidad"} />
            <RatingField name={"priceQuality"} label={"Calidad/Precio"} />
            <RatingField name={"recommended"} label={"¿Lo recomiendas?"} />
            <RatingField name={"flexibility"} label={"Flexibilidad"} />
          </div>
          <div className="relative ">
            <MessageField
              name={"comment"}
              placeholder="Escribe tu reseña aquí"
              label="Mensaje"
            />
          </div>
        </Form>
      </Formik>
    );
  }
);

export default FormReviewComponent;

interface propsRatingField {
  name: string;
  label: string;
}

const RatingField: FC<propsRatingField> = (props) => {
  const [field, meta, helpers] = useField({ ...props });
  return (
    <div className="flex items-center justify-center flex-col w-full">
      <label className=" text-tertiary capitalize">{props?.label}</label>
      {meta.touched && meta.error ? (
            <span className="text-red-500 text-xs font-medium mb-1 ">
              Campo requerido
            </span>
          ) : null}
      <RatingStars
        active={true}
        size={"lg"}
        rating={field.value}
        outValue={(value: number) => helpers.setValue(value)}
      />
    </div>
  );
};

interface propsMessageField {
  name: string;
  placeholder: string;
  label: string;
}
interface imageUpload {
  id: string;
  file: File;
  image: string;
}
const MessageField: FC<propsMessageField> = ({
  label,
  placeholder,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const [fieldUpload, metaUpload, helpersUpload] = useField<image[] | null>({
    name: "imgCarrusel",
  });

  const [image, setImage] = useState<imageUpload[]>((): any => {
    if (fieldUpload.value) {
      return fieldUpload.value.map((item, idx) => ({
        id: item._id,
        image: item.i640,
      }));
    }
  });

  const handleChange = async (e: any) => {
    try {
      let file = e.target.files;
      const arrayOfFiles = Object.values(file);

      arrayOfFiles?.forEach((item: any) => {
        console.log(item);
        let reader = new FileReader();
        reader.onloadend = async () => {
          if (reader.result) {
            const nuevaImagen = {
              id: IDGenerator(),
              file: item,
              image: reader.result,
            };
            //helpers?.setValue([...field?.value, item])
            setImage((old: any) =>
              old ? [...old, nuevaImagen] : [nuevaImagen]
            );
          }
        };

        reader.readAsDataURL(item);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const files = image?.reduce((acc: any, item: any) => {
      item.file && acc.push(item.file);
      item.image && !item.image.includes("data:image") && acc.push(item.id);
      return acc;
    }, []);
    helpersUpload.setValue(files);
  }, [image]);

  const handleDelete = (id: string) => {
    setImage(old => old.filter(itemOld => itemOld.id !== id))
  }
  return (
    <div>
      <span className="flex items-center gap-2">
        <label className="text-sm text-gray-500">{label}</label>
        {meta.touched && meta.error ? (
          <span className="text-red-500 text-xs font-medium ">
            {meta.error}
          </span>
        ) : null}
      </span>
      <div className="relative">
        <textarea
          className="w-full bg-white p-4 rounded-lg focus:outline-none text-sm border focus:border-primary border-gray-400 focus:ring-transparent	"
          value={field.value}
          placeholder={placeholder ?? ""}
          onChange={(e) => helpers.setValue(e.target.value)}
        />
        <label className="cursor-pointer text-gray-500 hover:text-gray-700">
          <input
            onChange={handleChange}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
          />
          <UploadImageIcon className="w-4 h-4 absolute top-3 right-3" />
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        {image?.map((item, idx) => (
          <ImageItem key={idx} handleDelete={handleDelete} {...item} />
        ))}
      </div>
    </div>
  );
};

interface propsImageItem extends imageUpload {
  handleDelete: CallableFunction
}
const ImageItem: FC<propsImageItem> = ({ image, id, handleDelete }) => {
  const [hoverRef, isHovered] = useHover();
  return (
    <span className={"relative"} ref={hoverRef}>
      <img
        src={image?.includes("data") ? image : createURL(image)}
        className={"w-24 h-24 object-cover object-center border rounded"}
        alt={"review"}
      />
      <button
        onClick={() => handleDelete(id)}
        type="button"
        className={`p-1 rounded bg-red-500 w-full absolute bottom-0 left-0 text-xs hover:bg-red-600 text-white ${isHovered ? "opacity-100" : "opacity-0"
          } transition`}
      >
        Borrar
      </button>
    </span>
  );
};
