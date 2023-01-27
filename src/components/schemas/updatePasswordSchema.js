/* eslint-disable import/prefer-default-export */
import * as Yup from 'yup';

export const updatePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Please enter your current password')
    .min(12, 'Please use at least 12 characters')
    .matches(
      /^.*(?=.{12,})((?=.*[!@#$%^&*?-]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 12 characters, one uppercase, one number and one special character (i.e !,@,#,$,%,^,&,?,-)'
    ),
  newPassword: Yup.string()
    .required('Please enter your new password')
    .min(12, 'Please use at least 12 characters')
    .matches(
      /^.*(?=.{12,})((?=.*[!@#$%^&*?-]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 12 characters, one uppercase, one number and one special character (i.e !,@,#,$,%,^,&,?,-)'
    ),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});
