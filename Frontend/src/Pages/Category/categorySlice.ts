import { createSlice,createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { ICategoryResult } from "../../Interfaces/ICategoryServices";
import { DeteleCategory, GetAllCategory, UpdateCategory } from "../../Services/Category.Services";
import { CreateCategory } from './../../Services/Category.Services';

interface ICateSlice
{
    listcate : ICategoryResult[]
}

const value : ICateSlice = {
    listcate : []
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
    initialState :value,
    reducers : {
        //actions ở trong này nè vd edit create delete ó :v
    },
    extraReducers : (builder) =>
    {//dc ma`
        builder.addCase(fetchListCategory.pending,(state :any , action)=>
        {
            //chỗ này làm slice cho loading quay zòng zòng nè
        }
        )
        .addCase(fetchListCategory.fulfilled,(state :any , action)=>
        {
            console.log("slice said :",action.payload);
           
            state.listcate = action.payload
            console.log("state said :",state.listcate);
        })
        .addCase(fetchListCategory.rejected,(state :any , action)=>
        {
            console.log(action);
            
            
            state.listcate = action.payload
        })
        .addCase(updateCategory.fulfilled,(state: any, action : any)=>
        {
            state.listcate.forEach((item : ICategoryResult,index : number) => {
                if(item.categoryId === action.payload.categoryId)
                {
                    state.listcate[index] = action.payload
                    return;
                }
            });
        })
        .addCase(createCategory.fulfilled,(state,action : any)=>
        {
            state.listcate.push(action.payload);
        })
        .addCase(deteleCategory.fulfilled,(state,action : any)=>
        {
            const temp = [...state.listcate];
            const newlistCate = temp.filter((item: ICategoryResult) => item.categoryId !== action.payload);
            return {
            listcate: newlistCate,
        };
        })

    }
})
export const listCategorySelect = (state :any) => state.categorySlice.listcate;
export default categorySlice;