import * as yup from "yup";

export const ValidationSchemaRegister = {
  // ########### USER #############

  // Schema de validacion user con todos los valores
  userValidationTotal: yup.object().shape({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
    city: yup.string().required(),
    country: yup.string().required(),
    weddingDate: yup.date().required(),
    phoneNumber: yup.number().required(),
  }),
  // Schema de validacion user con valores parciales
  userValidationPartial: yup.object().shape({
    city: yup.string().required(),
    country: yup.string().required(),
    weddingDate: yup.date().required(),
    phoneNumber: yup.number().required(),
  }),

  // ########### BUSINESS #############

  // Schema de validacion business con todos los valores
  businessValidationTotal: yup.object().shape({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
    phoneNumber: yup.number().required(),
  }),
  // Schema de validacion business con valores parciales
  businessValidationPartial: yup.object().shape({
    fullName: yup.string().required(),
    phoneNumber: yup.number().required(),
  }),
};
