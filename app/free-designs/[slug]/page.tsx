import { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogGrid from "@/components/catalog/CatalogGrid";
import {
  freeCategories,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/categories";
import { products } from "@/lib/catalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug, "free");
  return {
    title: category
      ? category.name + " Free Embroidery Designs | SamArtify"
      : "Free Designs | SamArtify",
    description: category?.description,
  };
}

export default async function FreeCategory({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug, "free");
  if (!category) notFound();
  return (
    <CatalogGrid
      title={category.name + " free designs"}
      items={getProductsByCategory(products, slug, "free")}
      catalogType="free"
      categoryOptions={freeCategories}
      initialCategory={slug}
    />
  );
}
