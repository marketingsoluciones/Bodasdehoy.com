import React, { FC } from 'react'
import { useState } from 'react';
import { useField } from 'formik';
import { image } from '../../interfaces/index';
import { createURL } from '../../utils/UrlImage';

interface propsUploadImage {
    name : string
    label : string
}
const UploadImage : FC <propsUploadImage> = ({label, ...props}) => {
    const [field, meta, helpers] = useField<image>({...props});
    const [image, setImage] = useState<string | null>(null)

    const handleChange = async (e :any) => {
        try {
          let file = e.target.files[0];
          let reader = new FileReader();
    
          reader.onloadend = async () => {
            if (reader.result) {
              
              helpers.setValue(file)
              setImage(reader.result.toString())
            }
          };
    
          reader.readAsDataURL(file);
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div className="flex flex-col w-full pb-5">
        <label className="text-sm text-gray-500 py-2">{label}</label>
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-2 border-dashed overflow-hidden hover:bg-gray-100 hover:border-gray-300 transition-all cursor-pointer rounded-xl">
                    {!image && !field?.value?.i640 ? (
                        <div className="flex flex-col items-center justify-center pt-7">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12 text-gray-400  group-hover:text-gray-600" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fillRule="evenodd"
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                clipRule="evenodd" />
                        </svg>
                        <p className="pt-1 text-sm  text-gray-400 group-hover:text-gray-600">
                            Seleccionar una imagen</p>
                    </div>
                    ) : field.value.i640 ? (
                      <img src={createURL(field.value.i640)} className='w-full h-full object-center object-cover' />
                    ) : <img src={image ?? ""} className='w-full h-full object-center object-cover' />}
                    <input onChange={handleChange} type="file" accept='image/*' className="opacity-0" />
                </label>
            </div>
        </div>
  )
}

export default UploadImage