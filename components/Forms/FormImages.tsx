import { SectionForm } from "../../pages/empresa/crear-empresa";
import {
  FC,
  ImgHTMLAttributes,
  InputHTMLAttributes,
  useState,
  useEffect,
  memo,
  Dispatch,
  SetStateAction
} from "react";
import { StarRating, PicturesIcon, UploadImageIcon, DeleteIcon, CheckIcon } from "../Icons";
import { GraphQL, fetchApi, queries } from '../../utils/Fetching';
import { useToast } from '../../hooks/useToast';
import { useFormikContext, FormikValues } from 'formik';
import { image } from "../../interfaces";
import { createURL } from '../../utils/UrlImage';

interface ImageUploaded extends image{
  file?: File;
  image?: any;
}

interface File {
  name: string;
  lastModified: number;
  lastModifiedDate: string;
  webkitRelativePath: string;
  size: number;
  type: string;
  arrayBuffer: string;
  slice: string;
  stream: string;
  text: string;
}

interface PrincipalSelected extends ImageUploaded {
  idx: number | undefined;
}

const FormImages: FC  = () => {
  const [images, setImages] = useState<ImageUploaded[]>([]);
  const {values} = useFormikContext<FormikValues>()
  const [principalSelected, setPrincipal] = useState<
    PrincipalSelected | undefined
  >(undefined);
  

  // const fetchingPhotos = async () => {
  //   const result = await GraphQL.getPhotosBusinessByID({_id : values?._id})
  //   setImages(result?.photos)
  // }
  // useEffect(() => {
  //   fetchingPhotos()
  // }, [fetchingPhotos])

  const handleChange = async (e: any) => {
    try {
      if(values._id) {
      let file = e.target.files[0];
      let reader = new FileReader();

      
      reader.onloadend = async () => {
        if (reader.result) {
          //setImages([...images])
          const nuevaImagen = {
            file: file,
            image: reader.result,
          };
          const res = await GraphQL.uploadImage(file, values?._id, "business");
          setImages([...images, {...nuevaImagen, ...res}]);
        }
      };
      
      reader.readAsDataURL(file);

      } else {
        throw new Error("ID de empresa no especificado")
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleClick = (idx: number) => {
    const principal = { idx, ...images[idx] };
    setPrincipal(principal);
  };

  useEffect(() => {
    values.imgCarrusel && setImages([...images, ...values.imgCarrusel])
  }, [values.imgCarrusel])
  

  return (
    <div>
      <SectionForm>
        <div className="flex flex-col gap-6">
          <h2 className="text-primary text-lg font-semibold">
            Galería Fotográfica
          </h2>
          <div className="bg-gray-100 p-3">
            <p className="text-sm text-tertiary">
              Publica un mínimo de 8 fotos de tu empresa (salones, menús,
              vestidos, coches, etc.) Cuantas más fotos publiques más fácil será
              que los usuarios te contacten.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <ItemCheck
              text={"Sube 8 fotos y selecciona una como imagen principal"}
            />
            <ItemCheck
              text={"Arrastra las imágenes para cambiarlas de orden"}
            />
          </div>
          {images.length > 0 ? (
            <div className="grid grid-cols-5 gap-4">
              {images.map((item, idx) => (
                item.i640 && (
                  <ImageComponent
                  key={idx}
                  idx={idx}
                  data={item}
                  principal={principalSelected}
                  onClick={() => handleClick(idx)}
                  values={values}
                  setImages={setImages}
                />
                )
              ))}
              {images.length < 8 && <UploadModuleV2 onChange={handleChange} />}
            </div>
          ) : (
            <UploadModule onChange={handleChange} />
          )}
        </div>
      </SectionForm>
    </div>
  );
};

export default FormImages;

const ItemCheck = ({ text }: { text: string }) => {
  return (
    <div className="text-primary text-sm flex items-center gap-2">
      <span className="grid place-items-center border border-primary  rounded-full w-max">
        <CheckIcon className="w-4 h-4" />
      </span>
      <p>{text}</p>
    </div>
  );
};

const UploadModule: FC<InputHTMLAttributes<HTMLInputElement>> = memo(
  (props) => {
    return (
      <label className="w-72 h-72 mx-auto inset-x-0 rounded-full border-2 border-gray-300 border-dashed flex flex-col items-center justify-center gap-5 cursor-pointer hover:bg-gray-100 transition	">
          <input type="file" className="hidden" accept={"image/*"} {...props} />
        <PicturesIcon />
        <small className="text-tertiary text-center text-xs w-1/2">
          Formato GIF, JPG o PNG Peso máximo 5 MB
        </small>
        <div className="w-max text-sm text-primary bg-white border-primary border rounded-xl py-1 px-3">
          Añadir imagenes
        </div>
      </label>
    );
  }
);

interface ImgHTMLAttributesV2 extends ImgHTMLAttributes<HTMLImageElement> {
  principal: PrincipalSelected | undefined
  data: ImageUploaded
  values : any
  setImages: Dispatch<SetStateAction<any>>
  idx: number
}
const ImageComponent: FC<ImgHTMLAttributesV2> = ({
  principal,
  idx,
  data,
  values,
  setImages,
  ...props
}) => {
  const [isPrincipal, setPrincipal] = useState<PrincipalSelected | undefined>(
    principal ?? undefined
  );

  const toast = useToast()
  const handleRemove = async () => {
    try {
      const result = await fetchApi({query : queries.deleteImages, variables:{idImage: data._id, idBusiness: values._id, use: "business"}})
      if(!result){
        throw new Error("No se pudo borrar la foto")
      }
      toast("success", result)
      setImages((old: any) => old.filter((item : any) => item._id !== data._id))
    } catch (error) {
      toast("error", JSON.stringify(error))
      console.log(error)
    }
    
  }

  useEffect(() => {
    setPrincipal(principal);
  }, [principal]);
  
  return (
    <>
      <picture className="rounded-xl border-2 border-gray-200 w-full h-32 text-gray-400 hover:text-gray-600 flex items-center justify-center cursor-pointer bg-white shadow-md transition overflow-hidden relative">
        <button type={"button"} className="z-20 bg-white p-1 rounded-xl absolute bottom-3 left-3" onClick={handleRemove}><DeleteIcon className={"w-5 h-5"} /></button>
        <img alt="imagen" src={data.i640 ? createURL(data.i640) : data.image} className="object-cover object-center absolute top-0 left-0 w-full h-full"/>
        {/* <img
          className="object-cover object-center absolute top-0 left-0 w-full h-full"
          src={data?.image ?? `${process.env.NEXT_PUBLIC_BASE_URL}${data?.mediumUrl}`}
          {...props}
        /> */}
        {isPrincipal?.idx === idx && (
          <StarRating className="w-6 h-6 text-yellow-400 z-50 top-2 right-2 absolute" />
        )}
      </picture>
    </>
  );
};

const UploadModuleV2: FC<InputHTMLAttributes<HTMLInputElement>> = memo(
  (props) => {
    return (
      <label className="">
        <input type="file" className="hidden" accept={"image/*"} {...props} />
        <div className="w-full rounded-xl border-2 border-gray-200 h-32 text-gray-400 hover:text-gray-600 flex items-center justify-center cursor-pointer bg-white shadow-md transition overflow-hidden">
          <UploadImageIcon className="w-8 h-8" />
        </div>
      </label>
    );
  }
);
