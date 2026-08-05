"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { getStableProductImage } from "@/lib/product-images";

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
  isLast: boolean;
}

export default function CartItem({ item, isLast }: CartItemProps) {
  const { removeFromCart } = useCart();

  return (
    <div>
      <div className="flex items-start gap-4">
        <div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-lg border bg-white">
          <Image
            src={getStableProductImage(item.id)}
            alt={item.name}
            fill
            sizes="100px"
            className="object-contain p-1.5"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 pr-4">
              <h2 className="font-semibold text-foreground line-clamp-2">
                {item.name}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Digital embroidery design
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeFromCart(item.id)}
              className="text-muted-foreground hover:text-destructive h-8 w-8 shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-4 flex items-center justify-end">
            <div className="text-right">
              <p className="text-lg font-bold text-foreground">
                ${item.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {!isLast && <Separator className="mt-4" />}
    </div>
  );
}
