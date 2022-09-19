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
export const CreateCategory = async(categoryName : any)=>
{
    return(await axiosClient.post<ICategoryResult>(`/Category`,categoryName)).data;
};
export const UpdateCategory = async(category: ICategoryResult)=>
{
    return(await axiosClient.put<ICategoryResult>(`/Category/${category.categoryId}`)).data;
};
export const DeteleCategory = async(category : any)=>
{
    return(await axiosClient.delete(`/Category/${category.categoryId}`)).data;
};
