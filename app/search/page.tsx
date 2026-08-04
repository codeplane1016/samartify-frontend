import CatalogGrid from "@/components/catalog/CatalogGrid";
import { products } from "@/lib/catalog";
export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  return (
    <CatalogGrid
      title={q ? `Results for “${q}”` : "Search designs"}
      items={products.filter((p) =>
        p.name.toLowerCase().includes(q.toLowerCase()),
      )}
    />
  );
}
