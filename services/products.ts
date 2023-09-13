import { BASE_URL } from "@/const";

export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}products`);

  if (!response.ok) {
    throw new Error("Товары не удалось загрузить :(");
  }

  return response.json();
};
