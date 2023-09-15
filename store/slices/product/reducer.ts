import { createSlice } from "@reduxjs/toolkit";
import { NameSpace } from "@/const";
import { Product } from "@/types/product";
import {
  fetchProductAction,
  productAddAction,
  productDeleteAction,
  productEditAction,
} from "./api-actions";

type ProductEditState = {
  product: Product | null;
  isLoading: boolean;
  isError: boolean;
  isSave: boolean;
  isDeleted: boolean;
  isSucces: boolean;
  error: string | undefined;
};

const initialState: ProductEditState = {
  product: null,
  isLoading: false,
  isError: false,
  isSave: false,
  isDeleted: false,
  isSucces: false,
  error: "",
};

export const ProductEditSlice = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {
    unSave: (state) => {
      state.isSave = false;
    },
    unSucces: (state) => {
      state.isSucces = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
        state.isDeleted = false;
      })
      .addCase(fetchProductAction.rejected, (state) => {
        state.isError = true;
      })
      .addCase(productEditAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(productEditAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
        state.isSave = true;
      })
      .addCase(productEditAction.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(productDeleteAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(productDeleteAction.fulfilled, (state) => {
        state.product = null;
        state.isDeleted = true;
      })
      .addCase(productDeleteAction.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(productAddAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(productAddAction.fulfilled, (state) => {
        state.isSucces = true;
      })
      .addCase(productAddAction.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { unSave, unSucces } = ProductEditSlice.actions;
