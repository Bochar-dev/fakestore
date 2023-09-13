import { Metadata } from "next";
import EditForm from "@/components/EditForm/EditForm";
import { Product } from "@/types/product";
import { getProduct } from "@/services/product";

type ProductEditProps = {
  params: {
    id: string;
  };
};

export const generateMetadata = async ({
  params: { id },
}: ProductEditProps): Promise<Metadata> => {
  const product: Product = await getProduct(id);

  return {
    title: `Fake store - редактирование - ${product.title}`,
  };
};

const ProductEdit = ({ params: { id } }: ProductEditProps) => {
  return (
    <div className="container">
      <h1 className="title-h1">Редактирование товара</h1>
      <EditForm productId={id} />
    </div>
  );
};

export default ProductEdit;
