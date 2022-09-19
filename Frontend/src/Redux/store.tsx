import { configureStore } from "@reduxjs/toolkit";

import BrandsSlice from "../Features/Brand/BrandList/brandsSlice";
import FiltersBrandSlice from "../Features/Brand/Filters/filtersBrandSlice";

const store = configureStore({
  reducer: {
    filters: FiltersBrandSlice.reducer,
    brandList: BrandsSlice.reducer,
  },
});

export default store;
