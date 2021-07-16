import { Field, Formik, Form } from "formik";
import { FC, MouseEventHandler, useState } from "react";
import { EmailIcon, PasswordIcon, UserForm } from "../../icons";
import { Logo, Providers } from "../Components";


type TypeOption = {
    title : string
    icon : string
}

interface propsFirstStep {
    value : FunctionStringCallback
}
export const FirstStep : FC <propsFirstStep> = ({value}) => {
    const [select, setSelect] = useState<string>("")
    const List : TypeOption[] = [
        {title : "Novia", icon: "/FormRegister/icon-women.webp"},
        {title : "Novio", icon: "/FormRegister/icon-men.webp"},
        {title : "Otro", icon: "/FormRegister/icon-heart.webp"},
        {title : "Empresa", icon: "/FormRegister/icon-business.webp"},
    ]
    return (
        <div className="flex flex-col items-center justify-center gap-8">
        <h2 className="text-2xl text-primary ">¿Quien eres?</h2>
    <div className="grid grid-cols-4 gap-28">
        {List.map((item,idx) => (
            <Option key={idx} title={item?.title} icon={item?.icon} onClick={() => setSelect(item?.title)} color={item.title === select}  />
        ))}
    </div>
    <button className={` rounded-full px-10 py-2 text-white font-medium w-max mx-auto inset-x-0 ${select === "" ? "bg-gray-200" : "bg-primary hover:bg-tertiary transition"}`}  onClick={() => value(select)}  disabled={select === ""} >Siguiente</button>
    </div>
    )
}



interface propsOption {
    icon : string
    title : string
    onClick : MouseEventHandler
    color: boolean
}
const Option : FC <propsOption> = ({icon, title, onClick, color = false}) => {
    return (
        <>
        <div className={`flex flex-col items-center justify-center gap-2 ${color ? "selected" : "option"}`}>
        <div onClick={onClick} className="w-24 h-24 rounded-full shadow bg-base grid place-items-center overflow-hidden p-1 ">
            <img src={icon} alt={title} className="object-contain" />
        </div>
        <h2 className="text-gray-200 text-lg text-light">{title}</h2>
        </div>
        <style jsx>
            {`
            .selected {
                transform: scale(1.05);
                transition: 0.5s
            }
            .option {
                filter: saturate(0);
                transition: 0.5s
            }

            .option:hover {
                filter: saturate(1);
                transition: 0.5s;
                cursor: pointer;
                transform: scale(1.05)
            }
            `}
        </style>
        </>
    )
}





export const SecondStep = () => {
    return (
        <div className="gap-4 flex flex-col justify-center items-center">
            <Logo />
            <Providers />
            <FormRegister />
        </div>
    )
}




type MyFormValues = {
    fullName : string
    email : string
    password: string,
    city: string,
    country : string,
    weddingDate: Date,
    phoneNumber: string
}

const FormRegister = () => {
    const initialValues : MyFormValues = {
        fullName : "",
        email : "",
        password: "",
        city: "",
        country : "",
        weddingDate: new Date(),
        phoneNumber: "",
    }
    return (
        <Formik 
        initialValues={initialValues}
        onSubmit={(values, action) => {

            alert(JSON.stringify(values))

        }}
        >
            <Form className="w-full text-gray-200 flex flex-col gap-4 py-4">
                
                <span className="w-full relative ">
                    <Field id="fullName" name="fullName" placeholder="Nombre y apellidos" type="text" className={`bg-base pr-3 pl-12 py-2 rounded-lg w-full focus:outline-none focus:ring`} autoComplete="off" />
                    <UserForm className="absolute w-4 h-4 inset-y-0 left-4 m-auto" />
                </span>

                <div className="grid grid-cols-2 gap-4">

                <span className="w-full relative ">
                    <Field id="email" name="email" placeholder="Email" type="email" className={`bg-base pr-3 pl-12 py-2 rounded-lg w-full focus:outline-none focus:ring`} autoComplete="off" />
                    <EmailIcon className="absolute inset-y-0 left-4 m-auto w-4 h-4" />
                </span>

                <span className="w-full relative ">
                    <Field id="password" name="password" placeholder="Contraseña" type="password" className={`bg-base pr-3 pl-12 py-2 rounded-lg w-full focus:outline-none focus:ring`} autoComplete="off" />
                    <PasswordIcon className="absolute inset-y-0 left-4 m-auto w-4 h-4" />
                </span>

                <span className="w-full relative ">
                    <Field id="city" name="city" placeholder="Vives en" type="text" className={`bg-base pr-3 pl-5 py-2 rounded-lg w-full focus:outline-none focus:ring`} autoComplete="off" />
                </span>

                <span className="w-full relative ">
                    <select id="country" name="country" className={`bg-base pr-3 pl-5 py-2 rounded-lg w-full focus:outline-none focus:ring`}>
                        <option>Pais</option>
                    </select>
                </span>

                <span className="w-full relative ">
                    <input id="weddingDate" name="weddingDate" type={"date"} className={`bg-base pr-3 pl-5 py-2 rounded-lg w-full focus:outline-none focus:ring`} />
                </span>

                <span className="w-full relative ">
                    <input id="phoneNumber" name="phoneNumber" type="tel" placeholder="Número de telefono" className={`bg-base pr-3 pl-5 py-2 rounded-lg w-full focus:outline-none focus:ring`} autoComplete="off" />
                </span>

                </div>


                <button className="bg-primary rounded-full px-10 py-2 text-white font-medium w-max mx-auto inset-x-0 hover:bg-tertiary transition">Registrar</button>
            </Form>
    </Formik>
    )
}

