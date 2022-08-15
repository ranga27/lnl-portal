/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';

export const companySchema = yup.object().shape({
  companyName: yup
    .string()
    .required('Please enter the Company Name')
    .min(2, 'Name is too short - should be 2 chars minimum'),
  location: yup.string().required('Location is required'),
});
