"use client";

import ProductItem from "./ProductItem";

export default function ProductsGrid() {
    return (
        <div className="grid grid-cols-3 gap-4 mt-6">
            {[...Array(6)].map((_, i) => (
                <ProductItem key={i} index={i} />
            ))}
        </div>
    );
}
