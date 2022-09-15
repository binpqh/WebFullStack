import axiosClient from '../API/AxiosClient';
import { IProductInput,IProductResult } from '../Interfaces/IProductServices';


export const GetAllProduct = async()=>
{
    return(await axiosClient.get<IProductResult[]>(`/Product`)).data;
};
export const GetbyIdProduct = async(productId : number)=>
{
    return(await axiosClient.get<IProductResult>(`/Product/${productId}`)).data;
};
export const CreateProduct = async(productName : IProductInput)=>
{
    return(await axiosClient.post<IProductResult>(`/Product`,productName)).data;
};
export const UpdateProduct = async(productId : number,productName : IProductInput)=>
{
    return(await axiosClient.put<IProductResult>(`/Product/${productId}`,productName)).data;
};

