import axiosClient from '../API/AxiosClient';
import { IStoreResult } from '../Interfaces/IStoreServices';


export const GetAllStore = async()=>
{
    return(await axiosClient.get<IStoreResult[]>(`/Stores`)).data;
       
};

  
export const DeteleStore = async(storeId : number)=>
{
    //console.log("delete",storeId);
    return(await axiosClient.delete(`/Stores/${storeId}`)).data;
    
    
};


