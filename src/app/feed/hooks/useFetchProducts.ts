import { feedApis } from "@/services/apis/feed/feed.api";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Product } from "../type";

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await feedApis.products.getAll();
      setProducts(res);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { isLoading, products };
};
