import axiosClient from "../API/AxiosClient";
import { ILoginInput } from "../Interfaces/ILoginServices";

export const LoginAsync = async (data: ILoginInput) => {
  const response = await axiosClient.post("Auth/login", data);
  return response.data;
};

export const GetMeAsync = async () => {
  const response = await axiosClient.get("Auth/user");
  return response.data;
};
