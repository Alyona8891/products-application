export interface IUser {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  image: FileList;
  ts?: string | undefined;
}

export interface IState {
  users: IUser[];
  countries: string[];
}
