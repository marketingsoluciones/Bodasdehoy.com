import * as yup from 'yup';

const message = "Requerido"
export const validations = {
    first : yup.object().shape({
        contactName: yup.string().required(message),
        contactEmail: yup.string().email().required(message),
        webPage: yup.string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'URL invalida'
        )
        .required('Ingresar una web valida'),
        mobilePhone: yup.number().required(message),
        landline: yup.number().required(message),
        businessName: yup.string().required(message),
        country: yup.string().required(message),
        city: yup.string().required(message),
        zip: yup.number().required(message),
        address: yup.string().required(message),
        description: yup.string().required(message),
        subcategories: yup.array().of(yup.string()),
      }),
    
    secondary : yup.object().shape({
        titleBusiness: yup.string().required(message),
        country: yup.string().required(message),
      }),
}