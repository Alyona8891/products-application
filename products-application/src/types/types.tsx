export interface IUser {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  image: FileList;
  ts?: string;
}

export interface IState {
  users: IUserState[];
  countries: string[];
}

export interface IUserState {
  name: string;
  age: string;
  email: string;
  password: string;
  gender: string;
  country: string;
  image: string;
}

export interface IErrorsState {
  errors: {
    name: string[];
    age: string[];
    email: string[];
    password: null | string[];
    confirmPassword: string[];
    gender: string[];
    country: string[];
    image: string[];
    ts: string[];
  };
}
