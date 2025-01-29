"use client";
import React from "react";
import Skeleton from "../components/card/skeleton";
import ProductCard from "../components/card";
import { useFetchProducts } from "../hooks/useFetchProducts";

const Post = () => {
  const { isLoading, products } = useFetchProducts();

  if (isLoading) {
    return (
      <div className="mx-auto my-5 max-w-lg px-4 py-8">
        {[...Array(10)].map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      {products?.map((product) => (
        <ProductCard key={product._id} item={product} type="product" />
      ))}
    </div>
  );
};

export default Post;
