"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useCustomer } from "@/context/CustomerContext";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function ProductActions({ product }: { product: Product }) {
  const [hoop, setHoop] = useState(product.hoopSizes[0]);
  const license = "Personal";
  const { addToCart } = useCart();
  const { isAuthenticated, points, ownsProduct, addFreeDesign, redeemReward } = useCustomer();
  const [message, setMessage] = useState("");
  const router = useRouter();
  const price = product.price;
  const add = () =>
    addToCart({
      ...product,
      price,
      image: product.image,
      quantity: 1,
      hoopSize: hoop,
      license,
    });
  const owned = ownsProduct(product.id);
  const loginHref = `/login?next=${encodeURIComponent(`/product/${product.slug}`)}`;
  const acquireDesign = () => {
    if (!isAuthenticated) {
      router.push(loginHref);
      return;
    }
    if (product.productType === "free") {
      addFreeDesign(product.id);
      setMessage("Added to My Downloads. Your design is ready.");
      return;
    }
    const result = redeemReward(product.id, product.rewardPoints ?? 0);
    setMessage(result === "insufficient" ? "You need more points to redeem this design." : "Reward redeemed and added permanently to My Downloads.");
  };

  return (
    <div className="space-y-5">
      {product.sizes?.length ? (
        <div className="rounded-xl bg-secondary px-4 py-3"><strong>{product.sizes.length} sizes included</strong><p className="mt-1 text-sm text-foreground-secondary">All listed size variants are included automatically.</p></div>
      ) : <fieldset>
        <legend className="mb-2 font-medium">Hoop size</legend>
        <div className="flex gap-2">
          {product.hoopSizes.map((size) => (
            <button
              type="button"
              onClick={() => setHoop(size)}
              className={`rounded-lg border px-4 py-2 ${size === hoop ? "border-primary bg-primary-soft text-primary" : "border-border bg-white"}`}
              key={size}
            >
              {size}
            </button>
          ))}
        </div>
      </fieldset>}
      {product.productType === "paid" ? (
        <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={add}
            className="flex-1 rounded-full bg-cta px-5 py-3 font-semibold text-white transition hover:bg-cta-hover"
          >
            Add to cart · ${price.toFixed(2)}
          </button>
          <button
            type="button"
            onClick={() => {
              add();
              router.push("/checkout");
            }}
            className="rounded-full border border-primary bg-white px-5 text-primary transition hover:bg-primary-soft"
          >
            Buy now
          </button>
        </div>
        <Link href="/wishlist" className="flex items-center justify-center gap-2 font-semibold text-foreground-secondary hover:text-primary"><Heart className="h-5 w-5" /> Add to wishlist</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {product.productType === "reward" && (
            <div className="flex items-center justify-between rounded-xl bg-accent-soft px-4 py-3 text-sm">
              <span>Your balance</span>
              <strong className="text-accent-hover">{points} points</strong>
            </div>
          )}
          <button
            type="button"
            onClick={owned ? () => setMessage("Your download is ready.") : acquireDesign}
            disabled={product.productType === "reward" && isAuthenticated && !owned && points < (product.rewardPoints ?? 0)}
            className="w-full rounded-full bg-cta px-5 py-3 font-semibold text-white transition hover:bg-cta-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {owned ? "Download" : product.productType === "free" ? "Add to My Library — Free" : `Redeem for ${product.rewardPoints} points`}
          </button>
          {!isAuthenticated && (
            <p className="text-center text-sm text-foreground-secondary">
              <Link className="font-semibold text-primary" href={loginHref}>Sign in or create an account</Link>{" "}
              to keep this design in your library.
            </p>
          )}
          {message && (
            <div className="rounded-xl border border-border bg-white p-4 text-sm" role="status">
              <p>{message}</p>
              {owned ? (
                <Link href="/account/downloads" className="mt-2 inline-block font-semibold text-primary">Open My Downloads →</Link>
              ) : product.productType === "reward" ? (
                <Link href="/account/rewards" className="mt-2 inline-block font-semibold text-primary">See ways to earn points →</Link>
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
