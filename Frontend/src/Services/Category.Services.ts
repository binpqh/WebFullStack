import axiosClient from '../API/AxiosClient';
import { ICategoryInput,ICategoryResult } from '../Interfaces/ICategoryServices';


export const GetAllCategory = async()=>
{
    return(await axiosClient.get<ICategoryResult[]>(`/Category`)).data;
};
export const GetbyIdCategory = async(categoryId : number)=>
{
    return(await axiosClient.get<ICategoryResult>(`/Category/${categoryId}`)).data;
};
export const CreateCategory = async(categoryName : ICategoryInput)=>
{
    return(await axiosClient.post<ICategoryResult>(`/Category`,categoryName)).data;
};
export const UpdateCategory = async(categoryId : number,categoryName : ICategoryInput)=>
{
    return(await axiosClient.put<ICategoryResult>(`/Category/${categoryId}`,categoryName)).data;
};
export const DeteleCategory = async(categoryId : number)=>
{
    return(await axiosClient.delete(`/Category/${categoryId}`)).data;
};
