import { Metadata } from "next";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { Product } from "@/types/product";
import { getProduct } from "@/services/product";

type PropductProps = {
  params: {
    id: string;
  };
};

export const generateMetadata = async ({
  params: { id },
}: PropductProps): Promise<Metadata> => {
  const product: Product = await getProduct(id);

  return {
    title: `Fake store - ${product.title}`,
  };
};

const Product = async ({ params: { id } }: PropductProps) => {
  const product: Product = await getProduct(id);

  return (
    <div className="container">
      <h1 className="title-h1">Product: {product.title}</h1>
      <ProductDetail product={product} />
    </div>
  );
};

export default Product;
