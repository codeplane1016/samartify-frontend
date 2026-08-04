"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ProductCard from "@/components/home/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getProductsByCategory } from "@/lib/categories";
import { CatalogType, Category, Product } from "@/types/product";

export default function CatalogGrid({
  items,
  title = "All embroidery designs",
  catalogType = "shop",
  categoryOptions = [],
  initialCategory = "all",
  initialSort = "featured",
}: {
  items: Product[];
  title?: string;
  catalogType?: CatalogType;
  categoryOptions?: Category[];
  initialCategory?: string;
  initialSort?: string;
}) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState(initialSort);
  const selected = categoryOptions
    .flatMap((item) => [item, ...(item.children || [])])
    .find((item) => item.slug === category);
  const shown = useMemo(() => {
    const categoryItems =
      category === "all"
        ? items
        : getProductsByCategory(items, category, catalogType);
    return categoryItems
      .filter((product) => product.name.toLowerCase().includes(q.toLowerCase()))
      .sort((a, b) =>
        sort === "bestselling"
          ? Number(Boolean(b.isBestseller)) - Number(Boolean(a.isBestseller)) ||
            b.reviewCount - a.reviewCount
          : sort === "newest"
            ? b.id - a.id
            : sort === "price-low"
              ? a.price - b.price
              : sort === "price-high"
                ? b.price - a.price
                : sort === "rating"
                  ? b.rating - a.rating
                  : b.id - a.id,
      );
  }, [items, q, category, sort, catalogType]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:py-14">
      <div className="mb-10">
        <p className="text-sm text-rose-700">
          Home /{" "}
          {catalogType === "shop"
            ? "Shop"
            : catalogType === "free"
              ? "Free Designs"
              : "Reward Designs"}
          {selected ? " / " + selected.name : ""}
        </p>
        <h1 className="mt-2 text-4xl font-semibold">{title}</h1>
        <p className="mt-2 text-stone-600">
          {shown.length} thoughtfully digitized designs
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[270px_1fr] lg:gap-10">
        <aside className="h-fit rounded-2xl border border-border/70 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">Categories</h2>
            {category !== "all" && (
              <button
                onClick={() => setCategory("all")}
                className="text-xs font-semibold text-rose-700"
              >
                Clear
              </button>
            )}
          </div>
          <button
            onClick={() => setCategory("all")}
            className="w-full rounded-lg px-3 py-2 text-left hover:bg-rose-50"
          >
            All designs
          </button>
          {categoryOptions.map((option) => (
            <div key={option.id}>
              <button
                onClick={() => setCategory(option.slug)}
                className={
                  "w-full rounded-lg px-3 py-2 text-left font-medium hover:bg-rose-50 " +
                  (category === option.slug ? "bg-rose-50 text-rose-700" : "")
                }
              >
                {option.name}
              </button>
              {option.children && (
                <div className="ml-3 border-l pl-2">
                  {option.children.slice(0, 6).map((child) => (
                    <button
                      key={child.id}
                      onClick={() => setCategory(child.slug)}
                      className={
                        "block w-full rounded-lg px-3 py-1.5 text-left text-sm hover:bg-rose-50 " +
                        (category === child.slug
                          ? "text-rose-700"
                          : "text-stone-600")
                      }
                    >
                      {child.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </aside>
        <div>
          <div className="mb-6 grid gap-4 rounded-2xl bg-stone-100 p-5 sm:grid-cols-2">
            <input
              value={q}
              onChange={(event) => setQ(event.target.value)}
              placeholder="Search designs"
              className="rounded-xl border bg-white px-4 py-3"
            />
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="h-12 rounded-xl bg-white px-4">
                <SelectValue placeholder="Sort designs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="bestselling">Best selling</SelectItem>
                <SelectItem value="rating">Highest rated</SelectItem>
                <SelectItem value="price-low">Price low to high</SelectItem>
                <SelectItem value="price-high">Price high to low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {selected && (
            <div className="mb-5 flex items-center gap-3">
              <span className="rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-800">
                {selected.name}
                <button
                  onClick={() => setCategory("all")}
                  className="ml-2"
                  aria-label={"Remove " + selected.name + " filter"}
                >
                  x
                </button>
              </span>
              <button
                onClick={() => setCategory("all")}
                className="text-sm text-stone-500 underline"
              >
                Clear filters
              </button>
            </div>
          )}
          {shown.length ? (
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:gap-6">
              {shown.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-12 text-center shadow-sm sm:p-16">
              <h2 className="text-xl font-semibold">
                No designs found in this category yet.
              </h2>
              <button
                onClick={() => {
                  setCategory("all");
                  setQ("");
                }}
                className="mt-4 text-rose-700 underline"
              >
                Browse all designs
              </button>
              <Link href="/" className="sr-only">
                Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
