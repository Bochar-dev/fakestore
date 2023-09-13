"use client";

import ErrorText from "@/components/ErrorText/ErrorText";

type ProductsError = {
  error: Error;
};

const ProductError = ({ error }: ProductsError) => {
  return <ErrorText message={error.message} />;
};

export default ProductError;
