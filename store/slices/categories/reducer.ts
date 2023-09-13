import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { NameSpace } from "@/const";
import { fetchCategories } from "./api-actions";

type CategoriesState = {
  categories: string[];
  isLoading: boolean;
  isError: boolean;
  error: string | undefined;
};

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  isError: false,
  error: "",
};

export const CategoriesSlice = createSlice({
  name: NameSpace.Categories,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.isLoading = false;
          state.categories = action.payload;
        }
      )
      .addCase(fetchCategories.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
