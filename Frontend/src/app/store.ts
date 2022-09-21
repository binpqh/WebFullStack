import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import categorySlice from "../Pages/Category/categorySlice";
import StoreSlice from "../Pages/Stores/storeSlice";
import BrandsSlice from "../Pages/Brand/brandsSlice";
import FiltersBrandSlice from "../Pages/Brand/filtersBrandSlice";
import authSlice from "../Pages/Auth/Login/AuthSlice/authSlice";
//import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    //counter: counterReducer,
    filters: FiltersBrandSlice.reducer,
    brandList: BrandsSlice.reducer,
    storeSlice: StoreSlice.reducer,
    categorySlice: categorySlice.reducer,
    authSlice: authSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
