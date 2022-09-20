import axiosClient from '../API/AxiosClient';
import { IStoreResult } from '../Interfaces/IStoreServices';


export const GetAllStore = async()=>
{
    return(await axiosClient.get<IStoreResult[]>(`/Stores`)).data;
       
};

export const DeteleStore = async(cate : any)=>
{
    return(await axiosClient.delete(`/Stores/${cate.storeId}`)).data;
    
};
export const CreateStore = async(store : any)=>
{
     return(await axiosClient.post<IStoreResult>(`/Stores`,store)).data;
};

export const UpdateStore = async(store : any)=>
{
    //console.log("updateID: ",store.storeId);
    return(await axiosClient.put<IStoreResult>(`/Stores/${store.storeId}`,store)).data;
};
// export const DeleteAllStore = async()=>
// {
//     return(await axiosClient.delete<IStoreResult>(`/Stores`)).data;
// };


