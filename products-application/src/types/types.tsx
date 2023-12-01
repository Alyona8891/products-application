export interface IUser {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  country: string;
}

export interface IState {
  users: IUser[];
}
