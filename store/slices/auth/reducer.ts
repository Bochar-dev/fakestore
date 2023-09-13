import { createSlice } from "@reduxjs/toolkit";
import { AuthStatus, NameSpace } from "@/const";
import { loginAction } from "./api-actions";

type AuthState = {
  token: string;
  authStatus: AuthStatus;
  isLoading: boolean;
  isSucces: boolean;
  error: string | undefined;
};

const initialState: AuthState = {
  token: "",
  authStatus: AuthStatus.NoAuth,
  isLoading: false,
  isSucces: false,
  error: "",
};

export const authSlice = createSlice({
  name: NameSpace.Auth,
  initialState,
  reducers: {
    clearToken: (state) => {
      state.token = "";
      state.authStatus = AuthStatus.NoAuth;
      state.isSucces = false;
    },
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
        state.isSucces = true;
        state.authStatus = AuthStatus.Auth;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isSucces = false;
        state.authStatus = AuthStatus.NoAuth;
      });
  },
});

export const { clearToken, clearError } = authSlice.actions;
