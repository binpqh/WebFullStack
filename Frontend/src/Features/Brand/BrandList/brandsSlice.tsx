//author: hiki
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BrandClass } from "../../../Interfaces/BrandClass";

import { GetAllBrands, CreateBrand, UpdateBrand, DeleteBrand } from "../../../Services/BrandServices";

interface initialState {
  status: string;
  brands: BrandClass[];
}

const value: initialState = {
  brands: [],
  status: "idle",
};

const BrandsSlice = createSlice({
  name: "brandList",
  initialState: value,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state, action) => {
        state.status = "loading brands";
      })
      .addCase(fetchBrands.fulfilled, (state: initialState, action) => {
        if (action.payload != null) {
          state.brands = action.payload;
          state.status = "idle";
        }
      })
      .addCase(createBrand.fulfilled, (state: initialState, action: any) => {
        state.brands.push(action.payload);
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.brands.forEach((item: BrandClass, index: number) => {
          if (item.brandId === action.payload?.brandId) {
            state.brands[index] = action.payload;
            return;
          }
        });
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        const temp = [...state.brands];
        const newBrands = temp.filter((item: BrandClass) => item.brandId !== action.payload);
        return {
          ...state,
          brands: newBrands,
        };
      });
  },
});

export const fetchBrands = createAsyncThunk("brands/fetchBrands", async () => {
  const result = await GetAllBrands();
  return result.resultObj;
});

export const createBrand = createAsyncThunk("brands/createBrand", async (brandName: string) => {
  const result = await CreateBrand(brandName);

  if (!result.isSuccessed) return;

  return result.resultObj;
});

export const updateBrand = createAsyncThunk("brands/updateBrand", async (brand: BrandClass) => {
  const result = await UpdateBrand(brand);

  if (!result.isSuccessed) return;

  return result.resultObj;
});

export const deleteBrand = createAsyncThunk("brands/deleteBrand", async (brandId: number) => {
  const result = await DeleteBrand(brandId);

  if (!result.isSuccessed) return;

  return result.resultObj;
});

export default BrandsSlice;
