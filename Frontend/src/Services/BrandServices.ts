//author: hiki
import axiosClient from "../API/AxiosClient";
import { BrandClass } from "../Interfaces/BrandClass";
import ApiResponse from "../Interfaces/Common/ApiResponse";

const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const GetAllBrands = async () => {
  return (await axiosClient.get<ApiResponse<BrandClass[]>>(`/Brands`)).data;
};

export const CreateBrand = async (brandName: any) => {
  return (await axiosClient.post<ApiResponse<BrandClass>>(`/Brands/create`, JSON.stringify(brandName), axiosConfig))
    .data;
};

export const UpdateBrand = async (brand: BrandClass) => {
  return (
    await axiosClient.put<ApiResponse<BrandClass>>(
      `/Brands/update/${brand.brandId}`,
      JSON.stringify(brand.brandName),
      axiosConfig
    )
  ).data;
};

export const DeleteBrand = async (brandId: number) => {
  return (await axiosClient.delete<ApiResponse<number>>(`/Brands/delete/${brandId}`)).data;
};
