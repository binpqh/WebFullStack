import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import categorySlice from "../Pages/Category/categorySlice";

import BrandsSlice from "../Features/Brand/BrandList/brandsSlice";
import FiltersBrandSlice from "../Features/Brand/Filters/filtersBrandSlice";
//import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    //counter: counterReducer,

    categorySlice: categorySlice.reducer,
    filters: FiltersBrandSlice.reducer,
    brandList: BrandsSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
