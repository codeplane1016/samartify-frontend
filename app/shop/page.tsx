import CatalogGrid from "@/components/catalog/CatalogGrid";
import { shopCategories } from "@/lib/categories";
import { products } from "@/lib/catalog";

export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const { category = "all", sort = "featured" } = await searchParams;
  const paidProducts = products.filter(
    (product) => product.productType === "paid",
  );
  const items =
    sort === "newest"
      ? paidProducts.filter((product) => product.isNew)
      : sort === "bestselling"
        ? paidProducts.filter((product) => product.isBestseller)
        : paidProducts;
  const title =
    sort === "newest"
      ? "New embroidery design arrivals"
      : sort === "bestselling"
        ? "Best-selling embroidery designs"
        : "All embroidery designs";
  return (
    <CatalogGrid
      title={title}
      items={items}
      categoryOptions={shopCategories}
      initialCategory={category}
      initialSort={sort}
    />
  );
}
