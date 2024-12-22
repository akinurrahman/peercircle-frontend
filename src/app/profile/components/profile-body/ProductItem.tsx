"use client";

import Image from "next/image";

export default function ProductItem({ index }) {
    return (
        <div className="overflow-hidden rounded-lg border border-border bg-card">
            <div className="relative aspect-square">
                <Image
                    src={`/placeholder.svg?height=300&width=300`}
                    alt={`Product ${index + 1}`}
                    width={300}
                    height={300}
                    className="size-full object-cover"
                />
            </div>
            <div className="p-3">
                <h3 className="truncate font-semibold">Product {index + 1}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                    ${(Math.random() * 100).toFixed(2)}
                </p>
            </div>
        </div>
    );
}
