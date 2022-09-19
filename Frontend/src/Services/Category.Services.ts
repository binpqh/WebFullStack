import axiosClient from "../API/AxiosClient";
import { ICategoryResult } from "../Interfaces/ICategoryServices";

export const GetAllCategory = async () => {
  return (await axiosClient.get<ICategoryResult[]>(`/Category`)).data;
};
export const GetbyIdCategory = async (categoryId: number) => {
  return (await axiosClient.get<ICategoryResult>(`/Category/${categoryId}`)).data;
};
export const CreateCategory = async (categoryName: any) => {
  return (await axiosClient.post<ICategoryResult>(`/Category`, categoryName)).data;
};
<<<<<<< HEAD
export const UpdateCategory = async(category : ICategoryResult)=>
{
    return(await axiosClient.put<ICategoryResult>(`/Category/${category.categoryId}`,category)).data;
=======
export const UpdateCategory = async (category: ICategoryResult) => {
  return (await axiosClient.put<ICategoryResult>(`/Category/${category.categoryId}`, category)).data;
>>>>>>> 34b3ca4f79cf8de4f94dbec655e4953afe5770b8
};
export const DeleteCategory = async (cate: any) => {
  return (await axiosClient.delete(`/Category/${cate.categoryId}`)).data;
};
