import { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogGrid from "@/components/catalog/CatalogGrid";
import {
  getCategoryBySlug,
  getCategoryParent,
  getProductsByCategory,
  shopCategories,
} from "@/lib/categories";
import { products } from "@/lib/catalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug, "shop");
  return {
    title: category
      ? category.name + " Embroidery Designs | SamArtify"
      : "Category | SamArtify",
    description: category?.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug, "shop");
  if (!category) notFound();
  const parent = getCategoryParent(category);
  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 pt-8 text-sm text-stone-500">
        Home / Shop / {parent ? parent.name + " / " : ""}
        {category.name}
      </div>
      <CatalogGrid
        title={category.name}
        items={getProductsByCategory(products, slug, "shop")}
        catalogType="shop"
        categoryOptions={shopCategories}
        initialCategory={slug}
      />
    </div>
  );
}
