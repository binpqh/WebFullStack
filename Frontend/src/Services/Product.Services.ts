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
export const CreateProduct = async(productName :any )=>
{
    return(await axiosClient.post<IProductResult>(`/Product`,productName)).data;
};
export const UpdateProduct = async(product : any)=>
{
    return(await axiosClient.put<IProductResult>(`/Product/${product.productId}`,product)).data;
};
export const DeleteProduct = async(product : any)=>
{
    return(await axiosClient.delete(`/Product/${product.productId}`)).data;
};

