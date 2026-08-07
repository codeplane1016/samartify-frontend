import CatalogGrid from "@/components/catalog/CatalogGrid";
import { freeCategories } from "@/lib/categories";
import { products } from "@/lib/catalog";
import FreeDesignOverview from "@/components/free-designs/FreeDesignOverview";

export default async function Free({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category = "all" } = await searchParams;
  return (
    <div className="bg-success-soft">
      <FreeDesignOverview />
      <CatalogGrid
        title="Browse free embroidery designs"
        catalogType="free"
        categoryOptions={freeCategories}
        initialCategory={category}
        items={products.filter((product) => product.productType === "free")}
      />
    </div>
  );
}
