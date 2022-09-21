export interface ILoginInput {
  uid: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  status: boolean;
}
