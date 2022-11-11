/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('Please enter your First Name')
    .min(2, 'Name is too short - should be 2 chars minimum'),
  lastName: yup
    .string()
    .required('Please enter your Last Name')
    .min(2, 'Name is too short - should be 2 chars minimum'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Please enter your email address'),
  password: yup
    .string()
    .required('Please enter your password')
    .min(12, 'Please use at least 12 characters')
    .matches(
      /^.*(?=.{12,})((?=.*[!@#$%^&*?-]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 12 characters, one uppercase, one number and one special character (i.e !,@,#,$,%,^,&,?,-)'
    ),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});
