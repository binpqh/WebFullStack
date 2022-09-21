//author: hiki
import axiosClient from "../API/AxiosClient";
import { IBrandServices } from "../Interfaces/IBrandServices";
import ApiResponse from "../Interfaces/Common/ApiResponse";
import axios from "axios";

export const GetAllBrands = async () => {
  return (await axiosClient.get<ApiResponse<IBrandServices[]>>(`/Brands`)).data;
};

export const CreateBrand = async (brandName: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return (
    await axios.post<ApiResponse<IBrandServices>>(`${process.env.REACT_APP_API_URL}/Brands/create`, brandName, config)
  ).data;
};

export const UpdateBrand = async (brand: IBrandServices) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return (
    await axios.put<ApiResponse<IBrandServices>>(
      `${process.env.REACT_APP_API_URL}/Brands/update/${brand.brandId}`,
      JSON.stringify(brand.brandName),
      config
    )
  ).data;
};

export const DeleteBrand = async (brandId: number) => {
  return (await axiosClient.delete<ApiResponse<number>>(`/Brands/delete/${brandId}`)).data;
};
