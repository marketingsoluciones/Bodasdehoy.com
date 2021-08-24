import { Form, Formik } from 'formik'
import React from 'react'
import { EmailIcon, UserIcon2 } from '../icons'
import { InputField } from './InputField'

const FormListing = () => {
    const initialValue ={
        name: "",
        email : "",
        telefono : "",
        message: ""
    }

    const HandleOnSubmit = () => {
        console.log("click")
    }
    return (
        <Formik initialValues={initialValue} onSubmit={HandleOnSubmit}>
            <Form className="py-5 flex flex-col gap-4">
                <span className="h-max relative text-gray-200">
                <InputField name="name" type="text" placeholder="Nombre y apellido"  />
                <UserIcon2 className="absolute w-5 h-5 inset-y-0 my-auto left-4 " />
                </span>

                <span className="h-max relative text-gray-200">
                <InputField name="email" type="email" placeholder="Correo electronico"  />
                <EmailIcon className="absolute w-5 h-5 inset-y-0 my-auto left-4 " />
                </span>
            </Form>
        </Formik>
    )
}

export default FormListing
