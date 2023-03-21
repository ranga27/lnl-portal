import * as Yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const rolesSchema = Yup.object().shape({
  title: Yup.string()
    .max(100, 'Title Too Long!')
    .required('Please enter the Title'),
  locationType: Yup.string().required('Please select location type'),
  location: Yup.string().when('locationType', {
    is: (value) => value !== 'Remote',
    then: Yup.string().required('Please enter the location'),
    otherwise: Yup.string().nullable().notRequired(),
  }),
  positionType: Yup.string().required('Please select Position Type'),
  description: Yup.string().required('Please provide the details'),
  customMessage: Yup.string().required('Please provide the details'),
  deadline: Yup
    .date()
    .nullable()
    .when(['rolling', 'flexible', 'asap'], {
    is: (asap, flexible, rolling) => !(asap || flexible || rolling),
    then: Yup.date().required('Deadline is required'),
    otherwise: Yup.date().nullable(),
  }),    
  startDate: Yup.date().nullable().required('Start Date required'),
  salary: Yup.string().required('salary is required'),
  department: Yup.string().required('Department is required'),
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
