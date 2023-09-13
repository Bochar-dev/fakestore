"use client";

import ErrorText from "@/components/ErrorText/ErrorText";

type ProductsError = {
  error: Error;
};

const ProductsError = ({ error }: ProductsError) => {
  return (
    <div className="container">
      <ErrorText message={error.message} />
    </div>
  );
};

export default ProductsError;
