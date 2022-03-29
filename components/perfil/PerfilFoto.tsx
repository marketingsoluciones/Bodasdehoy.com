import { AuthContextProvider } from "../../context"
import { image } from "../../interfaces";
import { FC, ImgHTMLAttributes, InputHTMLAttributes, useState, useEffect, memo, Dispatch, SetStateAction } from "react";
import { GraphQL, fetchApi, queries } from '../../utils/Fetching';
import { auth } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { createURL } from "../../utils/UrlImage";
import { useToast } from '../../hooks/useToast';


interface ImageUploaded extends image {
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

export const PerfilFoto = () => {
    const { user } = AuthContextProvider()
    return (
        <div className="w-full flex flex-col items-center justify-center gap-2">
            <FormImages />
            {/* <label htmlFor="photo" className="">
                <img src={"/placeholder/user.png"} alt={"imagen del perfil"} className={"border-primary border-2 rounded-full objeto-cover h-40 w-40 hover:opacity-75 "} />
            </label> */}
            <input type="file" id="photo" name="photo" className="hidden" />
            <h2 className="text-xl font-semibold w-full text-center text-tertiary">{user?.displayName}</h2>
            <div className="w-fit flex items-center gap-1 text-tertiary -mt-3">
                <small className="text-gray-700">{user?.role && user.role.length > 0 && user?.role[0]}</small>
                |
                <small>{user?.city}</small>
            </div>
        </div>
    )
}

const FormImages: FC = () => {
    const { user, setUser } = AuthContextProvider()
    const [loading, setLoading] = useState<boolean>()
    const toast = useToast();
        

    const handleChange = async (e: any) => {
        try {
            const file = e.target.files[0]
            const reader = new FileReader();
            setLoading(true)

            reader.onloadend = async () => {
                setLoading(false)
                const result: Partial<image> = await fetchApi({
                    query: queries.singleUpload, variables: {
                        file,
                        use: "profile"
                    },
                    type: "formData"
                })
                if (result.i640 && auth.currentUser) {
                    await updateProfile(auth.currentUser, {
                        photoURL: createURL(result.i640)
                    })
                    
                    setUser(old => ({ ...old, photoURL: createURL(result.i640) }))
                }
            }
            reader.readAsDataURL(file);
            toast("success", "la imagen fue actualizado con exito")
        } catch (error) {
            toast("error", "error al cargar la imagen")
            console.log(error)
        } 
    }

    return (
        <>
            <label htmlFor="photo" className={""}>
                <img src={user?.photoURL ?? "/placeholder/user.png"} alt={"imagen del perfil"} className={"border-primary border-2 rounded-full objeto-cover h-40 w-40 hover:opacity-50 cursor-pointer" }  />
            </label>
            <input type="file" id="photo" name="photo" className="hidden" onChange={handleChange} />
        </>

    );
}