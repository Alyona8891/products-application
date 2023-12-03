import * as yup from 'yup';
import { store } from '../store/store';
const MAX_FILE_SIZE = 102400;
const countries = store.getState().users.countries;

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
  country: yup
    .string()
    .required()
    .test(
      'country',
      'Non-existent country',
      (value) => !!value && countries.includes(value)
    ),
  image: yup
    .mixed<FileList>()
    .nullable()
    .required('A file is required')
    .test(
      'is-valid-size',
      'Max allowed size is 100KB',
      (value) => !!value.length && value[0].size <= MAX_FILE_SIZE
    )
    .test(
      'fileType',
      'Only "png", "jpeg" types',
      (value) =>
        !!value.length &&
        (value[0].type === 'image/png' || value[0].type === 'image/jpeg')
    ),
  ts: yup.string().matches(/true/, { message: 'You must agree' }),
});

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required()
    .matches(RegExp('(.*[a-z].*)'), 'Lowercase letter')
    .matches(RegExp('(.*[A-Z].*)'), 'Uppercase letter')
    .matches(RegExp('(.*\\d.*)'), 'Number')
    .matches(RegExp('[!@#$%^&*(),.?":{}|<>]'), 'Special symbol'),
});

export const insertSchema = schema.concat(passwordSchema);
