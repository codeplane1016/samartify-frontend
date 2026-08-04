import type { Metadata } from "next";
import CatalogGrid from "@/components/catalog/CatalogGrid";
import { shopCategories } from "@/lib/categories";
import { products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "New Embroidery Design Arrivals | SamArtify",
  description: "Browse the newest machine embroidery designs from SamArtify.",
};

export default function NewArrivalsPage() {
  return (
    <CatalogGrid
      title="New embroidery design arrivals"
      items={products.filter(
        (product) => product.productType === "paid" && product.isNew,
      )}
      categoryOptions={shopCategories}
      initialSort="newest"
    />
  );
}
