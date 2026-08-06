import { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogGrid from "@/components/catalog/CatalogGrid";
import {
  getCategoryBySlug,
  getProductsByCategory,
  rewardCategories,
} from "@/lib/categories";
import { products } from "@/lib/catalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug, "reward");
  return {
    title: category
      ? category.name + " Reward Designs | SamArtify"
      : "Reward Designs | SamArtify",
    description: category?.description,
  };
}

export default async function RewardCategory({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug, "reward");
  if (!category) notFound();
  return (
    <CatalogGrid
      title={category.name + " reward designs"}
      items={getProductsByCategory(products, slug, "reward")}
      catalogType="reward"
      categoryOptions={rewardCategories}
      initialCategory={slug}
    />
  );
}
