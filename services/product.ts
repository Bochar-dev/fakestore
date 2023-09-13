import { BASE_URL } from "@/const";

export const getProduct = async (id: string) => {
  const response = await fetch(`${BASE_URL}products/${id}`);

  if (!response.ok) {
    throw new Error("Товар не удалось загрузить :(");
  }

  return response.json();
};
