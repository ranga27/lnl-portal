import * as Yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const rolesSchema = Yup.object().shape({
  title: Yup.string()
    .max(100, 'Title Too Long!')
    .required('Please enter the Title'),
  locationType: Yup.string().required('Please select location type'),
  location: Yup.string()
    .when('locationType', {
      is: (value) => value !== 'Remote',
      then: Yup.string().required('Please enter the location'),
    })
    .required('Please select the Location'),
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
  salary: Yup.string().required('salary is required'),
  department: Yup.string().required('Department is required'),
  meetingLink: Yup.string().when('howToApply', {
    is: (value) => value === 'Email to Hiring Manager',
    then: Yup.string()
      .required('Meeting link is required')
      .url('Meeting Link must be a valid URL'),
  }),
  rolesOfInterests: Yup.mixed().required('Roles Of Interests is required'),
  technicalSkills: Yup.array()
    .max(5, 'No more than 5 skills can be selected')
    .required('Technical Skills is required')
    .nullable(),
  technicalSkillsOther: Yup.string().when('technicalSkills', {
    is: (value) => value === 'Other',
    then: Yup.string().required('Please enter other skills'),
  }),
});
