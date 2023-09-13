import { BASE_URL } from "@/const";
import { AuthData } from "@/types/auth-data";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginAction = createAsyncThunk<
  string,
  AuthData,
  { rejectValue: string }
>("auth/login", async ({ login, password }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: login,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error("Неверный логин или пароль");
    }

    return response.json();
  } catch (err) {
    const error = err as Error;

    return rejectWithValue(error.message);
  }
});
