import * as yup from 'yup';

export const validations = {
    first : yup.object().shape({
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