import "./style.css";
import Image from "next/image";
import { Product } from "@/types/product";
import Button from "../Button/Button";

type ProductDetailProps = {
  product: Product;
};

const ProductDetail = ({ product }: ProductDetailProps) => {
  return (
    <div className="product-detail">
      <div className="product-detail__inner">
        <Image
          className="product-detail__image"
          src={product.image}
          alt={product.title}
          width={500}
          height={500}
        />
        <div className="product-detail__info">
          <span className="product-detail__price">{product.price}$</span>
          <span className="product-detail__category">{product.category}</span>
          <p className="product-detail__desc">{product.description}</p>
          <Button variant="link" href={`/products/${product.id}/edit`}>
            Отредактировать товар
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
