import React from "react";
import { Post, Product } from "../../type";
import { Card } from "@/components/ui/card";
import Header from "./header";
import MainContent from "./content";
import Footer from "./footer";

interface CardProps {
  item: Post | Product;
  type: "Post" | "Product";
}

const CardComponent: React.FC<CardProps> = ({ item, type }) => {
  return (
    <Card className="mb-6 w-full border-none shadow-none">
      <Header item={item} />
      <MainContent item={item} />
      <Footer item={item} type={type} />
    </Card>
  );
};

export default CardComponent;
