//author: hiki
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BrandClass } from "../../../Interfaces/BrandClass";
import { GetAllBrands, CreateBrand, UpdateBrand, DeleteBrand } from "../../../Services/BrandServices";
interface initialState {
  //status: string;
  brand: BrandClass[];
}

const value: initialState = {
  brand: [],
  //status: "idle",
};
export const fetchBrands = createAsyncThunk("brands/fetchBrands", async () => {
  const result=  await GetAllBrands();
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

const BrandSlice = createSlice({
  name: "brandList",
  initialState:value,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state, action) => {
        //state.status = "loading brands";
      })
      .addCase(fetchBrands.fulfilled, (state:any, action) => {
        if (action.payload != null) {
          console.log("brand list:", action.payload);
          state.brand = [...action.payload];
          //state.status = "idle";
        }
      })
      .addCase(fetchBrands.rejected, (state: any, action) => {
        state.brand = action.payload;
      })
      .addCase(createBrand.fulfilled, (state:any, action: any) => {
        state.brand.push(action.payload);
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.brand.forEach((item: BrandClass, index: number) => {
          if (item.brandId === action.payload?.brandId) {
            state.brand[index] = action.payload;
            return;
          }
        });
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        const temp = [...state.brand];
        const newBrands = temp.filter((item: BrandClass) => item.brandId !== action.payload);
        return {
          ...state,
          brand: newBrands,
        };
      });
     
  },
});


export const listBrandsSelect = (state:any) => state.brandList.brand;
export default BrandSlice;
