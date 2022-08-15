/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Please enter your email address'),
  password: yup
    .string()
    .required('Please enter your password')
    .min(8, 'Please use at least 8 characters'),
});
