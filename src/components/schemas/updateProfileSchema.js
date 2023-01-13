/* eslint-disable import/prefer-default-export */
import * as Yup from 'yup';

export const updateProfileSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  location: Yup.string().required('Location is required'),
  mobileNumber: Yup.string().required('Phone Number is required'),
  logoFile: Yup.mixed().when('photoUrl', {
    is: (value) => value,
    then: Yup.mixed().notRequired(),
    otherwise: Yup.mixed()
      .required('You need to provide a file')
      .test(
        'type',
        'Only the following formats are accepted: .jpeg, .jpg, and .png',
        (value) => {
          return (
            value && (value.type === 'image/jpeg' || value.type === 'image/png')
          );
        }
      ),
  }),
});
