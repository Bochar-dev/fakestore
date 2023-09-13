import { createSelector } from "@reduxjs/toolkit";
import { NameSpace } from "@/const";
import { RootState } from "@/store/store";

export const getAuthStatus = (state: RootState) =>
  state[NameSpace.Auth].authStatus;

export const getError = (state: RootState) => state[NameSpace.Auth].error;

export const getIsSucces = (state: RootState) => state[NameSpace.Auth].isSucces;

export const getIsLoading = (state: RootState) =>
  state[NameSpace.Auth].isLoading;

export const authSelector = createSelector(
  [getAuthStatus, getError, getIsSucces, getIsLoading],
  (authStatus, error, isSucces, isLoading) => {
    return { authStatus, error, isSucces, isLoading };
  }
);
