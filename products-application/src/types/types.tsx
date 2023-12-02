export interface IUser {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  country: string;
  image: FileList;
  ts?: string | undefined;
}

export interface IState {
  users: IUser[];
}
