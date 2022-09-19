import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IStoreResult } from "../../Interfaces/IStoreServices";
import { CreateStore, DeteleStore, GetAllStore, UpdateStore } from "../../Services/Stores.Services";


const initialState = {
    data: [],
    loading: false
}
// Đầu tiên, tạo thunk
export const fetchListStores = createAsyncThunk(
    'Stores/fetchData',
    async () => {
        return await GetAllStore();
    }
)

export const createStore= createAsyncThunk(
    'Stores/createData',
   async (store : IStoreResult) => {
    
    return await CreateStore(store);
   }
)
export const updateStore = createAsyncThunk(
    'Stores/updateData',
    async (store : IStoreResult) => {
        console.log("updata data : ",store.storeId);
        return await UpdateStore(store);
    }
)
export const deteleStore = createAsyncThunk(
    'Stores/deleteData',
    async (store: IStoreResult) => {
       
        return await DeteleStore(store);
    }
)

// Tiếp thep xử lý các actions trong reducers.
const StoreSlice = createSlice({
    name: "store",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchListStores.pending, (state: any) => {
                state.loading = true;
            })
        builder
            .addCase(fetchListStores.fulfilled, (state: any, action: any) => {
                state.loading = false;//cap nhat trang thai
                state.data = [...action.payload]// update lai dl
            });

        builder
            .addCase(fetchListStores.rejected, (state: any) => {
                state.loading = false;
            });
        builder
            .addCase(deteleStore.pending, (state: any) => {
                state.loading = true;
            })
        builder.addCase(deteleStore.fulfilled, (state: any, action: any) => {
                state.loading = false;
                let store = state.data.filter((item: any) => item.storeId === action.payload.storeId);
                store =action.payload;
            });

        builder
            .addCase(deteleStore.rejected, (state: any) => {
                state.loading = false;
            });
            builder
            .addCase(createStore.pending, (state: any) => {
                state.loading = true;
            })
        builder
            .addCase(createStore.fulfilled, (state: any, action: any) => {
                state.loading = false;//cap nhat trang thai
                state.data.push(action.payload);
            });

        builder
            .addCase(createStore.rejected, (state: any) => {
                state.loading = false;
            });

        builder.addCase(updateStore.fulfilled, (state: any, action: any) => {
            state.loading = false;
            let store = state.data.find((item: any) => item.storeId === action.payload.storeId);
            store =action.payload;
        });
       
    }
})
export const listStoreSelect = (state: any) => state.storeSlice.data;
export default StoreSlice;