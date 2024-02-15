import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Form,  useFormikContext, FormikValues,FormikHelpers,Field } from "formik";
import { InputField,ButtonComponent } from "../../components/Inputs";
import { Formik } from "formik";
import { useState } from "react";
import { useToast } from '../../hooks/useToast';
import { ButtonClose } from "../../components/Inputs";
import router from "next/router";



const auth = getAuth()

const Desarrollo = () =>{
    
    const toast = useToast(); // verificacion de firebase

    const initialValues = { //valor inicial de la variable email
        email : '' ,
    }
    
   const handleSubmit = async () => {// funcion para conectar con con firebase para enviar el correo 
    if(initialValues.email !== ""){
        try {
            await  sendPasswordResetEmail(auth, initialValues?.email);
                console.log(auth)
                console.log("email enviado a", initialValues)
                toast("success", "Email enviado correctamente")
            } catch (error) {
                toast("error", "Error, email no encontrado")
                console.log(error);
            }
        }else{
            toast("error","introduce un correo")
        }
    };
    
    /* const handleSubmit = () =>{
        sendPasswordResetEmail(auth, initialValues.email)
            .then(() => {
                setCanEditEmail(!canEditEmail);
                console.log("emeil enviado", initialValues.email)
            
        })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error,errorCode,errorMessage)
        });
    } */
    
    return(

        <div className=" h-full col-span-3 relative flex  m-10 items-center justify-center w-full ">
            <Formik initialValues={initialValues} onSubmit={handleSubmit} >
                <Form className=" flex flex-col gap-4 bg-white p-10 rounded-lg items-center justify-center w-2/5">
                    <h3>Recupera tu contraseña</h3>

                    <div className=" w-2/4 " >
                        <InputField
                            name="email"
                            type={"text"}
                            placeholder="email"
                            />
                    </div>

                    <div className="space-x-7">
                        {/* <button 
                            className="bg-color-base hover:opacity-90 transition focus:outline-none font-medium rounded-full  px-5 py-2.5 text-center text-white "
                            onClick={()=>router.push('/login')}
                        > 
                            volver 
                        </button> */}
                        <ButtonComponent type="button"  onClick={()=>router.push('/login')} >
                            Volver
                        </ButtonComponent>
                        <ButtonComponent type="button" onClick={handleSubmit} >
                            Enviar
                        </ButtonComponent>
                    </div>                        
                </Form>
            </Formik>
        </div>
    )
}
export default Desarrollo