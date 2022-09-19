import { IProductInput } from './../../Interfaces/IProductServices';
import { createSlice,createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { IProductResult } from "../../Interfaces/IProductServices";
import { DeleteProduct, GetAllProduct, UpdateProduct, CreateProduct } from "../../Services/Product.Services"


interface IProductSlice
{
    listproduct : IProductResult[]
}

const value : IProductSlice = {
    listproduct : []
}
export const fetchListProduct = createAsyncThunk(
    'Product/fetchData',
    async () => {
        return await GetAllProduct();
    }
)
export const updateProduct = createAsyncThunk(
    'Product/updateData',
   async (product : IProductResult) => {
    return await UpdateProduct(product);
   }
)
export const createProduct = createAsyncThunk(
    'Product/createData',
   async (product : IProductInput) => {
    return await CreateProduct(product);
   }
)
export const deteleProduct = createAsyncThunk(
    'Product/deleteData',
   async (product : IProductResult) => {
    return await DeleteProduct(product);
   }
)
const ProductSlice = createSlice({
    name : "products",
    initialState :value,
    reducers : {
        //actions ở trong này nè vd edit create delete ó :v
    },
    extraReducers : (builder) =>
    {//dc ma`
        builder.addCase(fetchListProduct.pending,(state :any , action)=>
        {
            //chỗ này làm slice cho loading quay zòng zòng nè
        }
        )
        .addCase(fetchListProduct.fulfilled,(state :any , action)=>
        {
            console.log("slice said :",action.payload);
            
            state.listcate = action.payload
        })
        .addCase(fetchListProduct.rejected,(state :any , action)=>
        {
            console.log(action);
            
            
            state.listcate = action.payload
        })
        .addCase(updateProduct.fulfilled,(state: any, action : any)=>
        {
            state.listproduct.forEach((item : IProductResult,index : number) => {
                if(item.productId === action.payload.productId)
                {
                    state.listproduct[index] = action.payload
                    return;
                }
            });
        })
        .addCase(createProduct.fulfilled,(state,action : any)=>
        {
            state.listproduct.push(action.payload);
        })
        .addCase(deteleProduct.fulfilled,(state,action : any)=>
        {
            const temp = [...state.listproduct];
            const newlist = temp.filter((item: IProductResult) => item.productId !== action.payload);
            return {
                listproduct: newlist,
        };
        })

    }
})
export const listProductSelect= (state :any) => state.productSlide.listcate;
export default ProductSlice;