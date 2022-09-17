import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { ICategoryResult } from "../../Interfaces/ICategoryServices";
import { DeteleCategory, GetAllCategory, UpdateCategory } from "../../Services/Category.Services";
import { CreateCategory } from './../../Services/Category.Services';

const initialState = {
    data : [],
    loading : false
}
export const fetchListCategory = createAsyncThunk(
    'Category/fetchData',
    async () => {
            return await GetAllCategory();
    }
)
export const updateCategory = createAsyncThunk(
    'Category/updateData',
   async (category : ICategoryResult) => {
    return await UpdateCategory(category);
   }
)
export const createCategory = createAsyncThunk(
    'Category/createData',
   async (category : ICategoryResult) => {
    return await CreateCategory(category);
   }
)
export const deteleCategory = createAsyncThunk(
    'Category/deleteData',
   async (category : ICategoryResult) => {
    return await DeteleCategory(category);
   }
)
const categorySlice = createSlice({
    name : "categories",
    initialState,
    reducers : {
        //actions ở trong này nè vd edit create delete ó :v
    },
    extraReducers : (builder) =>
    {

        builder.addCase(fetchListCategory.fulfilled,(state :any , action)=>
        {
            state.data = [...state.data, ...action.payload]
        });
        builder.addCase(updateCategory.fulfilled,(state: any, action : any)=>
        {
            state.data = [...state.data, ...action.payload]
        })
    }
})
export const listCategorySelect = (state :any) => state.categorySlide.data;
export default categorySlice;
// export const { editCate } = categorySlice.actions