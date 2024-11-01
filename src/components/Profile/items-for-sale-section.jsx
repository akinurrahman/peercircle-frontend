import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function ItemsForSaleSection() {
  const itemsForSale = [
    {
      id: 1,
      title: "Calculus Textbook",
      price: "$45",
      condition: "Like New",
      popularity: 85,
    },
    {
      id: 2,
      title: "Physics Lab Manual",
      price: "$20",
      condition: "Good",
      popularity: 72,
    },
    {
      id: 3,
      title: "Laptop Stand",
      price: "$15",
      condition: "Used",
      popularity: 68,
    },
    {
      id: 4,
      title: "Programming in Java",
      price: "$30",
      condition: "Excellent",
      popularity: 90,
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {itemsForSale.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden rounded-xl transition-shadow duration-300 hover:shadow-lg">
            <CardContent className="p-0">
              <div className="aspect-w-16 aspect-h-9">
                <Image
                  src={`/placeholder.svg?height=225&width=400`}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h4 className="mb-2 text-lg font-semibold">{item.title}</h4>

                <p className="mb-3 text-2xl font-bold text-indigo-600">
                  {item.price}
                </p>
                <div className="mb-3 flex items-center justify-between">
                  <Badge variant="secondary" className="rounded-full">
                    {item.condition}
                  </Badge>
                  <div className="flex items-center">
                    <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600">
                      {item.popularity}% Popular
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full rounded-full"
                >
                  <Bookmark className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
