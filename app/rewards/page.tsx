import CatalogGrid from "@/components/catalog/CatalogGrid";
import { rewardCategories } from "@/lib/categories";
import { products } from "@/lib/catalog";
import RewardsOverview from "@/components/rewards/RewardsOverview";

export default async function Rewards({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category = "all" } = await searchParams;
  return (
    <div className="bg-yellow-soft">
      <RewardsOverview />
      <CatalogGrid
        title="Redeem exclusive reward designs"
        catalogType="reward"
        categoryOptions={rewardCategories}
        initialCategory={category}
        items={products.filter((product) => product.productType === "reward")}
      />
    </div>
  );
}
