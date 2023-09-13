import { NameSpace } from "@/const";
import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth/reducer";
import { ProductEditSlice } from "./slices/product/reducer";
import { CategoriesSlice } from "./slices/categories/reducer";

export const rootReducer = combineReducers({
  [NameSpace.Auth]: authSlice.reducer,
  [NameSpace.ProductEdit]: ProductEditSlice.reducer,
  [NameSpace.Categories]: CategoriesSlice.reducer,
});
