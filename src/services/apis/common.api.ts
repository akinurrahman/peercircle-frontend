import { toast } from "sonner";
import generateApis from "../generate.api";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useEffect, useState } from "react";

export const commonApis = {
  category: generateApis("/category"),
};

interface Category {
  _id: string;
  name: string;
}
export const useCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const getAllCategory = async () => {
    try {
      const categories = await commonApis.category.getAll();
      setCategories(categories);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return { categories };
};
