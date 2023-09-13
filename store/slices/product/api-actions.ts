import { BASE_URL } from "@/const";
import { Product } from "@/types/product";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductAction = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>("product/fetch", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}products/${id}`);

    if (!response.ok) {
      throw new Error("Не удалось получить товар");
    }

    return response.json();
  } catch (err) {
    const error = err as Error;

    return rejectWithValue(error.message);
  }
});

export const productEditAction = createAsyncThunk<
  Product,
  { id: string; updateProduct: Omit<Product, "id"> },
  { rejectValue: string }
>("product/edit", async ({ id, updateProduct }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updateProduct }),
    });

    if (!response.ok) {
      throw new Error("Не удалось обновить товар");
    }

    return response.json();
  } catch (err) {
    const error = err as Error;

    return rejectWithValue(error.message);
  }
});

export const productDeleteAction = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>("product/delete", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Не удалось удалить товар");
    }

    return response.json();
  } catch (err) {
    const error = err as Error;

    return rejectWithValue(error.message);
  }
});

export const productAddAction = createAsyncThunk<
  Product,
  Omit<Product, "id">,
  { rejectValue: string }
>("product/add", async (newProduct, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newProduct }),
    });

    if (!response.ok) {
      throw new Error("Не удалось добавить товар");
    }

    return response.json();
  } catch (err) {
    const error = err as Error;

    return rejectWithValue(error.message);
  }
});
