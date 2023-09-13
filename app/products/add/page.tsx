import { Metadata } from "next";
import AddForm from "@/components/AddForm/AddForm";
import { getProduct } from "@/services/product";
import { Product } from "@/types/product";

type ProductAddProps = {
  params: {
    id: string;
  };
};

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: `Fake store - добавление продукта`,
  };
};

const ProductAdd = ({}) => {
  return (
    <div className="container">
      <h1 className="title-h1">Добавление товара</h1>
      <AddForm></AddForm>
    </div>
  );
};

export default ProductAdd;
