import { Metadata } from "next";
import Button from "@/components/Button/Button";
import Products from "@/components/Products/Products";
import { fetchProducts } from "@/services/products";

export const metadata: Metadata = {
  title: "Fake store - Товары",
};

const ProductsList = async () => {
  const products = await fetchProducts();

  return (
    <div className="container">
      <h1 className="title-h1">Товары</h1>
      <Button className="button-add" variant="link" href="/products/add">
        Добавить товар
      </Button>
      <Products products={products} />
    </div>
  );
};

export default ProductsList;
