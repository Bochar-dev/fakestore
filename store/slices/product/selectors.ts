import { createSelector } from "@reduxjs/toolkit";
import { NameSpace } from "@/const";
import { RootState } from "@/store/store";

export const getIsError = (state: RootState) =>
  state[NameSpace.ProductEdit].isError;

export const getIsLoading = (state: RootState) =>
  state[NameSpace.ProductEdit].isLoading;

export const getProduct = (state: RootState) =>
  state[NameSpace.ProductEdit].product;

export const getIsSave = (state: RootState) =>
  state[NameSpace.ProductEdit].isSave;

export const getIsDeleted = (state: RootState) =>
  state[NameSpace.ProductEdit].isDeleted;

export const getIsSuccses = (state: RootState) =>
  state[NameSpace.ProductEdit].isSucces;

export const getError = (state: RootState) =>
  state[NameSpace.ProductEdit].error;

export const productSelector = createSelector(
  [
    getIsError,
    getIsLoading,
    getProduct,
    getIsSave,
    getIsDeleted,
    getIsSuccses,
    getError,
  ],
  (isLoading, isError, product, isSave, isDeleted, isSucces, error) => {
    return { isLoading, isError, product, isSave, isDeleted, isSucces, error };
  }
);
