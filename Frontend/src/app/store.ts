<<<<<<< HEAD
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
//import categorySlice from '../Pages/Category/categorySlice';
import StoreSlice from '../Pages/Stores/storeSlice';
=======
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import categorySlice from "../Pages/Category/categorySlice";

import BrandsSlice from "../Features/Brand/BrandList/brandsSlice";
import FiltersBrandSlice from "../Features/Brand/Filters/filtersBrandSlice";
>>>>>>> 34b3ca4f79cf8de4f94dbec655e4953afe5770b8
//import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    //counter: counterReducer,
<<<<<<< HEAD
      //categorySlide : categorySlice.reducer,
       storeSlice   : StoreSlice.reducer,

  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
=======

    categorySlice: categorySlice.reducer,
    filters: FiltersBrandSlice.reducer,
    brandList: BrandsSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
>>>>>>> 34b3ca4f79cf8de4f94dbec655e4953afe5770b8
