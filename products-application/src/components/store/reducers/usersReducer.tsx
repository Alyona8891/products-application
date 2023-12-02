import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IState, IUser } from '../../../types/types';

export const initialState: IState = {
  users: [
    {
      id: 1,
      name: 'Alena',
      age: 35,
      email: 'besssta888@mail.ru',
      password: '12345678',
      gender: 'female',
      country: 'belarus',
    },
  ],
};

export const usersSlice = createSlice({
  name: 'usersData',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload);
    },
  },
});

export const { setUsers } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
