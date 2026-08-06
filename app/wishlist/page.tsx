import { products } from "@/lib/catalog";
import CatalogGrid from "@/components/catalog/CatalogGrid";
export default function Page() {
  return <CatalogGrid title="Your wishlist" items={products.slice(0, 4)} />;
}
