import { createSelector } from "@reduxjs/toolkit";
import { NameSpace } from "@/const";
import { RootState } from "@/store/store";

export const getIsError = (state: RootState) =>
  state[NameSpace.Product].isError;

export const getIsLoading = (state: RootState) =>
  state[NameSpace.Product].isLoading;

export const getProduct = (state: RootState) =>
  state[NameSpace.Product].product;

export const getIsSave = (state: RootState) => state[NameSpace.Product].isSave;

export const getIsDeleted = (state: RootState) =>
  state[NameSpace.Product].isDeleted;

export const getIsSuccses = (state: RootState) =>
  state[NameSpace.Product].isSucces;

export const getError = (state: RootState) => state[NameSpace.Product].error;

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
