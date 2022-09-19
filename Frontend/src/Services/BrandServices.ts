//author: hiki
import axiosClient from "../API/AxiosClient";
import { BrandClass } from "../Interfaces/BrandClass";
import ApiResponse from "../Interfaces/Common/ApiResponse";
import axios from "axios";

const token = localStorage.getItem("token");
const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token != null ? token : ""}`,
  },
};

export const GetAllBrands = async () => {
  return (await axiosClient.get<ApiResponse<BrandClass[]>>(`/Brands`)).data;
};

export const CreateBrand = async (brandName: any) => {
  return (
    await axios.post<ApiResponse<BrandClass>>(
      `${process.env.REACT_APP_API_URL}/Brands/create`,
      JSON.stringify(brandName),
      axiosConfig
    )
  ).data;
};

export const UpdateBrand = async (brand: BrandClass) => {
  return (
    await axios.put<ApiResponse<BrandClass>>(
      `${process.env.REACT_APP_API_URL}/Brands/update/${brand.brandId}`,
      JSON.stringify(brand.brandName),
      axiosConfig
    )
  ).data;
};

export const DeleteBrand = async (brandId: number) => {
  return (await axiosClient.delete<ApiResponse<number>>(`/Brands/delete/${brandId}`)).data;
};
