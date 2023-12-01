import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialState: IState = {
  users: [],
};

export interface IUser {
  name: string;
}

export interface IState {
  users: IUser[];
}

export const usersSlice = createSlice({
  name: "usersData",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload);
    },
  },
});

export const { setUsers } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
