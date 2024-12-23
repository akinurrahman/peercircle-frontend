"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { profileApis } from "@/services/apis/profile/profile.api";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  likes: number;
  comments: number;
}

export default function ProductsGrid({ profileId }: { profileId?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async (profileId = "") => {
    setIsLoading(true);
    try {
      const response = await profileApis.products.getAll(
        `?profileId=${profileId}`
      );
      setProducts(response);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(profileId);
  }, [profileId]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (products.length === 0) {
    return <NoProductsFound />;
  }

  return (
    <div className="mt-6 grid grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="group relative aspect-square">
        <Image
          src={product.images[0]}
          alt={`Product `}
          width={300}
          height={300}
          className="size-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex items-center gap-6 text-white">
            <span className="flex items-center gap-2">
              <Heart className="size-5 fill-white" />
              {product.likes}
            </span>
            <span className="flex items-center gap-2">
              <MessageCircle className="size-5 fill-white" />
              {product.comments}
            </span>
          </div>
        </div>
      </div>
      <div className="p-3">
        <h3 className="truncate font-semibold">{product.name} </h3>
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {product.description}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">₹{product.price}</p>
      </div>
    </div>
  );
};

const NoProductsFound = () => {
  return (
    <div className="flex-center mt-6 h-40 rounded-md">
      <p className="text-lg text-gray-500">No product found</p>
    </div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg border border-border bg-card"
        >
          <Skeleton className="aspect-square w-full" />
          <div className="p-3">
            <Skeleton className="mb-2 h-5 w-3/4" />
            <Skeleton className="mb-1 h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};
