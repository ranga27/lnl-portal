import * as Yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const rolesSchema = Yup.object().shape({
  title: Yup.string()
    .max(100, 'Title Too Long!')
    .required('Please enter the Title'),
  location: Yup.string().required('Please select the Location'),
  positionType: Yup.string().required('Please select Position Type'),
  description: Yup.string().required('Please provide the details'),
  howToApply: Yup.string().required('An option is required'),
  email: Yup.string().when('howToApply', {
    is: (value) => value === 'email',
    then: Yup.string()
      .email('Invalid email')
      .required('Please enter an email address'),
  }),
  website: Yup.string().when('howToApply', {
    is: (value) => value === 'website',
    then: Yup.string().required('Please enter your website'),
  }),
  deadline: Yup.date().when('rolling', {
    is: (value) => value === false,
    then: Yup.date().nullable().required('Deadline required'),
    otherwise: Yup.date().nullable().notRequired(),
  }),
  startDate: Yup.date().nullable().required('Start Date required'),
  qualification: Yup.string().required(
    'Please enter the required qualifications'
  ),
  salary: Yup.string().required('salary is required'),
  department: Yup.string().required('Department is required'),
  rolesOfInterests: Yup.mixed().required('Roles Of Interests is required'),
  technicalSkills: Yup.mixed().required('Technical Skills is required'),
  technicalSkillsOther: Yup.string().when('technicalSkills', {
    is: (value) => value === 'Other',
    then: Yup.string().required('Please enter other skills'),
  }),
});
