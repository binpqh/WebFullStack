//author: hiki
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { IBrandServices } from "../../Interfaces/IBrandServices";

import { GetAllBrands, CreateBrand, UpdateBrand, DeleteBrand } from "../../Services/Brand.Services";

interface initialState {
  status: string;
  brands: IBrandServices[];
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
        state.brands.forEach((item: IBrandServices, index: number) => {
          if (item.brandId === action.payload?.brandId) {
            state.brands[index] = action.payload;
            return;
          }
        });
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        const temp = [...state.brands];
        const newBrands = temp.filter((item: IBrandServices) => item.brandId !== action.payload);
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

export const updateBrand = createAsyncThunk("brands/updateBrand", async (brand: IBrandServices) => {
  const result = await UpdateBrand(brand);

  if (!result.isSuccessed) return;

  return result.resultObj;
});

export const deleteBrand = createAsyncThunk("brands/deleteBrand", async (brandId: number) => {
  const result = await DeleteBrand(brandId);

  if (!result.isSuccessed) return;

  return result.resultObj;
});

export const searchTextSelector = (state: any) => state.filters.search;

export const brandListSelector = (state: any) => state.brandList.brands;

export const brandsRemainingSelector = createSelector(brandListSelector, searchTextSelector, (brands, search) => {
  return brands.filter((brand: any) => {
    return brand.brandName.toLowerCase().includes(search.toLowerCase());
  });
});

export default BrandsSlice;
