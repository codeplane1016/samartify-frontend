"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart(),
    price = product.salePrice ?? product.price;
  const badge =
    product.productType === "free"
      ? "Free"
      : product.productType === "reward"
        ? "Reward"
        : product.salePrice
          ? "Sale"
          : product.isNew
            ? "New"
            : product.isBestseller
              ? "Bestseller"
              : "Design";
  const badgeStyle =
    badge === "Free"
      ? "bg-success text-white"
      : badge === "Reward"
        ? "border border-accent bg-accent-soft text-accent-hover"
        : badge === "Sale"
          ? "bg-cta text-white"
          : badge === "New"
            ? "bg-blue text-white"
            : badge === "Bestseller"
              ? "bg-primary text-white"
              : "bg-info text-white";
  const priceStyle =
    product.productType === "free"
      ? "text-success"
      : product.productType === "reward"
        ? "text-accent-dark"
        : product.salePrice
          ? "text-cta"
          : "text-cta";
  return (
    <article className="product-card group overflow-hidden rounded-2xl border border-border/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-info/60 hover:shadow-md">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-square overflow-hidden border-b border-border bg-white"
      >
        <Image
          src={product.image}
          alt={`${product.name} embroidery design`}
          fill
          className="object-contain p-4 transition group-hover:scale-105"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold uppercase ${badgeStyle}`}
        >
          {badge}
        </span>
      </Link>
      <div className="space-y-3.5 bg-white p-5">
        <p className="text-xs uppercase tracking-wider text-brand-muted">
          {product.category.name}
        </p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-medium leading-snug text-foreground transition hover:text-info">
            {product.name}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm leading-relaxed text-foreground-secondary">
          {product.description}
        </p>
        <div className="flex items-center gap-1 text-sm">
          <Star className="h-4 w-4 fill-accent text-accent" />
          {product.rating.toFixed(1)}{" "}
          <span className="text-brand-muted">({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between">
          <strong className={priceStyle}>
            {product.productType === "free"
              ? "FREE"
              : product.productType === "reward"
                ? `${product.rewardPoints} Points`
                : `$${price.toFixed(2)}`}
          </strong>
          <div className="flex gap-2">
            <button
              aria-label="Save to wishlist"
              className="button-secondary rounded-full p-2"
            >
              <Heart className="h-4 w-4" />
            </button>
            {product.productType === "paid" && (
              <button
                aria-label="Add to cart"
                onClick={() => addToCart({ ...product, price, quantity: 1 })}
                className="flex items-center gap-1.5 rounded-full bg-cta px-3 py-2 text-xs font-semibold text-white transition hover:bg-cta-hover active:bg-primary-hover"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                Add to cart
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
