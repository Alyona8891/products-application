import * as yup from 'yup';
const MAX_FILE_SIZE = 1024000;

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Enter your name')
    .matches(/^[A-ZА-Я]([]*)/, { message: 'First letter must be uppercased' }),
  age: yup
    .number()
    .required('Enter your age')
    .positive('Must be no negative values'),
  email: yup.string().email().required('Enter your email'),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string().required(),
  country: yup.string().required(),
  image: yup
    .mixed<FileList>()
    .nullable()
    .required('A file is required')
    .test(
      'is-valid-size',
      'Max allowed size is 100KB',
      (value) =>
        value && Array.from(value).every((file) => file.size <= MAX_FILE_SIZE)
    )
    .test(
      'fileType',
      'Allow only "png", "jpeg" types',
      (value) =>
        value &&
        Array.from(value).every(
          (file) => file.type === 'image/png' || file.type === 'image/jpeg'
        )
    ),
  ts: yup.string().matches(/true/, { message: 'You must agree' }),
});

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required()
    .matches(RegExp('(.*[a-z].*)'), 'Lowercase')
    .matches(RegExp('(.*[A-Z].*)'), 'Uppercase')
    .matches(RegExp('(.*\\d.*)'), 'Number')
    .matches(RegExp('[!@#$%^&*(),.?":{}|<>]'), 'Special'),
});

export const insertSchema = schema.concat(passwordSchema);
