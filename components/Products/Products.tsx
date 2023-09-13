import "./style.css";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

type ProductsProps = {
  products: Product[];
};

const Products = ({ products }: ProductsProps) => {
  return (
    <div className="products">
      <div className="products__list">
        {products.map((product: Product) => (
          <Link
            className="products__list-item product"
            href={`products/${product.id}`}
            key={product.id}
          >
            <Image
              className="product__image"
              src={product.image}
              alt={product.title}
              width={200}
              height={200}
            />
            <h2 className="product__title">{product.title}</h2>
            <span className="product__price">{product.price}$</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
