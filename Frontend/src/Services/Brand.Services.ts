import axiosClient from '../API/AxiosClient';
import { IBrandInput,IBrandResult } from '../Interfaces/IBrandServices';


export const GetAllBrand = async()=>
{
    return(await axiosClient.get<IBrandResult[]>(`/Brand`)).data;
};
export const GetbyIdBrand = async(brandId : number)=>
{
    return(await axiosClient.get<IBrandResult>(`/Brand/${brandId}`)).data;
};
export const CreateBrand = async(brandName : IBrandInput)=>
{
    return(await axiosClient.post<IBrandResult>(`/Brand`,brandName)).data;
};
export const UpdateBrand = async(brand: any)=>
{
    return(await axiosClient.put<IBrandResult>(`/Brand/${brand.brandId}`,brand)).data;
};
export const DeleteBrand = async(brandId : any)=>
{
    return(await axiosClient.delete(`/Brand/${brandId}`)).data;
};