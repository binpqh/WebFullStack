import { createSelector } from "@reduxjs/toolkit";

export const searchTextSelector = (state: any) => state.filters.search;
export const brandListSelector = (state: any) => state.brandList.brands;

export const brandsRemainingSelector = createSelector(brandListSelector, searchTextSelector, (brands, search) => {
  return brands.filter((brand: any) => {
    return brand.brandName.toLowerCase().includes(search.toLowerCase());
  });
});
