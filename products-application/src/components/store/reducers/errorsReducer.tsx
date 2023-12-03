import { createSlice } from '@reduxjs/toolkit';
import { IErrorsState } from '../../../types/types';
import { ValidationError } from 'yup';

export const initialState: IErrorsState = {
  errors: {
    name: [],
    age: [],
    email: [],
    password: null,
    confirmPassword: [],
    gender: [],
    country: [],
    image: [],
    ts: [],
  },
};

export const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setErrors: (state, action) => {
      const errorsInner: ValidationError[] = action.payload;
      errorsInner.forEach((el) => {
        const path = el.path?.split('.')[0] as keyof typeof initialState.errors;
        const error = state.errors[path];
        if (error) {
          error.push(el.message);
        } else {
          state.errors[path] = [];
        }
      });
    },
    clearErrors: (state) => {
      state.errors = {
        name: [],
        age: [],
        email: [],
        password: [],
        confirmPassword: [],
        gender: [],
        country: [],
        image: [],
        ts: [],
      };
    },
  },
});

export const { setErrors, clearErrors } = errorsSlice.actions;
export const errorsReducer = errorsSlice.reducer;
