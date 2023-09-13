import { BASE_URL } from "@/const";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>("catigories/fetch", async (_arg, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}products/categories`);

    if (!response.ok) {
      throw new Error("Не удалось получить категории");
    }

    return response.json();
  } catch (err) {
    const error = err as Error;

    return rejectWithValue(error.message);
  }
});
