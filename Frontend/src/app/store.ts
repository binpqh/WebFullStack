import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
//import categorySlice from '../Pages/Category/categorySlice';
import StoreSlice from '../Pages/Stores/storeSlice';
//import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    //counter: counterReducer,
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