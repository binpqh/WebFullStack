//author: hiki
import { createSlice } from "@reduxjs/toolkit";

const FiltersBrandSlice = createSlice({
  name: "filters",
  initialState: {
    search: "",
  },
  reducers: {
    searchFilterChange: (state, action) => {
      state.search = action.payload;
    },
  },
});

export default FiltersBrandSlice;
