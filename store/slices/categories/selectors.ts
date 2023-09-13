import { createSelector } from "@reduxjs/toolkit";
import { NameSpace } from "@/const";
import { RootState } from "@/store/store";

export const getIsError = (state: RootState) =>
  state[NameSpace.Categories].isError;

export const getIsLoading = (state: RootState) =>
  state[NameSpace.Categories].isLoading;

export const getCategories = (state: RootState) =>
  state[NameSpace.Categories].categories;

export const getError = (state: RootState) => state[NameSpace.Categories].error;

export const categoriesSelector = createSelector(
  [getIsError, getIsLoading, getCategories, getError],
  (isLoading, isError, categories, error) => {
    return { isLoading, isError, categories, error };
  }
);
