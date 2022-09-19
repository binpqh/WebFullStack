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
    {//dc ma`
        builder.addCase(fetchListCategory.pending,(state :any , action)=>
        {
            //chỗ này làm slice cho loading quay zòng zòng nè
        }
        );
        builder.addCase(fetchListCategory.fulfilled,(state :any , action)=>
        {
            console.log("slice said :",action.payload);
           
            state.listcate = action.payload
            console.log("state said :",state.listcate);
        });
        builder.addCase(fetchListCategory.rejected,(state :any , action)=>
        {
            console.log(action);
            
            
            state.listcate = action.payload
        });
        builder.addCase(updateCategory.fulfilled,(state: any, action : any)=>
        {
            state.listcate.forEach((item : ICategoryResult,index : number) => {
                if(item.categoryId === action.payload.categoryId)
                {
                    state.listcate[index] = action.payload
                    return;
                }
            });
        });
        builder.addCase(createCategory.fulfilled,(state:any,action : any)=>
        {
            state.listcate.push(action.payload);

        })

        builder.addCase(deteleCategory.fulfilled,(state:any,action : any)=>
        {
            const temp = [...state.listcate];
            console.log(action.payload);
            let newlistCate = temp.filter((item: ICategoryResult) => item.categoryId !== action.payload);
           
             newlistCate==action.payload;
                
        });

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
