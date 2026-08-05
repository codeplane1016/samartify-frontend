import { Button } from "@/components/ui/button";
import { Shield, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white px-6 py-14 text-center shadow-sm sm:px-12">
        <div className="mb-8">
          <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-2xl bg-secondary text-info">
            <ShoppingBag className="h-10 w-10" />
          </div>
          <h1 className="mb-4 text-3xl font-semibold text-foreground">
            Your cart is empty
          </h1>
          <p className="text-muted-foreground text-lg">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            asChild
            size="lg"
            className="bg-cta text-white hover:bg-cta-hover active:bg-primary-hover"
          >
            <Link href="/">Continue Shopping</Link>
          </Button>

          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Free shipping over $50
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Secure checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
