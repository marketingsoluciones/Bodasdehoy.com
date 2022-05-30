import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Form, Formik, useFormikContext, FormikValues } from "formik";
import { InputField } from "../../components/Inputs";

const auth = getAuth()
const enDesarrollo = () =>{
    const {values} =useFormikContext<{email:string}>();
   const SendPassWordReset = async() => {
        try{
            await sendPasswordResetEmail (auth,values?.email);
        }catch(error){
            console.log(error);
        }
    }

   /* sendPasswordResetEmail(auth, email)
    .then(() => {
    "Password reset email sent!"

    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    })
     */

    return(
        <Form>
            <InputField
                label={"correo"}
                name={"correo"}
                type={"text"}
            />
            <button
                onClick={SendPassWordReset}
            >
            </button>
        </Form>
    )

}

export default enDesarrollo