"use client";

import ProductItem from "./ProductItem";

export default function ProductsGrid() {
  return (
    <div className="mt-6 grid grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <ProductItem key={i} />
      ))}
    </div>
  );
}
