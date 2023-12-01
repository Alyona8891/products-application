import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IState, IUser } from '../../../types/types';

export const initialState: IState = {
  users: [],
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
