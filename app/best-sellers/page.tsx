import type { Metadata } from "next";
import CatalogGrid from "@/components/catalog/CatalogGrid";
import { shopCategories } from "@/lib/categories";
import { products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Best-Selling Embroidery Designs | SamArtify",
  description:
    "Discover SamArtify embroidery designs most loved by fellow makers.",
};

export default function BestSellersPage() {
  return (
    <CatalogGrid
      title="Best-selling embroidery designs"
      items={products.filter(
        (product) => product.productType === "paid" && product.isBestseller,
      )}
      categoryOptions={shopCategories}
      initialSort="bestselling"
    />
  );
}
