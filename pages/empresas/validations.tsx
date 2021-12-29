import * as yup from 'yup';

export const validations = {
    first : yup.object().shape({
        contactName: yup.string().required(),
        contactEmail: yup.string().email().required(),
        webPage: yup.string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Ingresa una direccion valida (Incluyendo https://)'
        )
        .required('Ingresar una web valida'),
        mobilePhone: yup.number().required(),
        landline: yup.number().required(),
        businessName: yup.string().required(),
        country: yup.string().required(),
        city: yup.string().required(),
        zip: yup.number().required(),
        address: yup.string().required(),
        description: yup.string().required(),
        subcategories: yup.array().of(yup.string()),
      }),
    
    secondary : yup.object().shape({
        titleBusiness: yup.string().required(),
        country: yup.string().required(),
      }),
}