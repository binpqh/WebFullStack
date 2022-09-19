import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import categorySlice from '../Pages/Category/categorySlice';
import productSlide from '../Pages/Product/productSlice';
//import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    //counter: counterReducer,

    categorySlice : categorySlice.reducer,
    productSlice: productSlide.reducer
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