import Link from "next/link";
import { notFound } from "next/navigation";
import { findProduct, products } from "@/lib/catalog";
import ProductActions from "@/components/product/ProductActions";
import ProductCard from "@/components/home/ProductCard";
import ProductGallery from "@/components/product/ProductGallery";
import ProductDetailSections from "@/components/product/ProductDetailSections";
import { getCategoryHref, getCategoryParent } from "@/lib/categories";
export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params,
    p = findProduct(productId);
  if (!p) notFound();
  const categoryParent = getCategoryParent(p.category);
  const catalogLabel =
    p.productType === "free"
      ? "Free Designs"
      : p.productType === "reward"
        ? "Reward Designs"
        : "Shop";
  const catalogHref =
    p.productType === "free"
      ? "/free-designs"
      : p.productType === "reward"
        ? "/rewards"
        : "/shop";
  const related = products
    .filter((product) => product.id !== p.id)
    .sort((a, b) => {
      const score = (product: typeof p) =>
        (product.category.slug === p.category.slug ? 4 : 0) +
        (p.productType !== "paid" && product.productType === "paid" ? 5 : 0) +
        (p.productType === "paid" && product.productType === p.productType ? 2 : 0) +
        (product.isBestseller ? 1 : 0);
      return score(b) - score(a) || b.rating - a.rating;
    })
    .slice(0, 3);
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex flex-wrap gap-2 text-sm text-stone-500"
      >
        <Link href="/" className="hover:text-rose-700">
          Home
        </Link>
        <span>/</span>
        <Link href={catalogHref} className="hover:text-rose-700">
          {catalogLabel}
        </Link>
        {categoryParent && (
          <>
            <span>/</span>
            <Link
              href={getCategoryHref(categoryParent)}
              className="hover:text-rose-700"
            >
              {categoryParent.name}
            </Link>
          </>
        )}
        <span>/</span>
        <Link
          href={getCategoryHref(p.category)}
          className="hover:text-rose-700"
        >
          {p.category.name}
        </Link>
        <span>/</span>
        <span className="text-stone-800">{p.name}</span>
      </nav>
      <div className="grid gap-12 lg:grid-cols-2">
        <ProductGallery images={p.images?.length ? p.images : [p.image]} name={p.name} />
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-rose-700">
            {p.category.name}
          </p>
          <h1 className="mt-2 text-4xl font-semibold">{p.name}</h1>
          <p className="mt-3 text-amber-600">
            ★ {p.rating.toFixed(1)}{" "}
            <span className="text-stone-500">· {p.reviewCount} reviews</span>
          </p>
          <p className="mt-5 text-3xl font-semibold text-cta">{p.productType === "paid" ? `$${p.price.toFixed(2)} ${p.currency ?? "USD"}` : p.productType === "free" ? "Free" : `${p.rewardPoints} points`}</p>
          <p className="my-6 text-lg leading-7 text-foreground-secondary">{p.shortDescription ?? p.description}</p>
          <div className="mb-7 grid grid-cols-2 gap-3 rounded-2xl bg-secondary p-5 text-sm sm:grid-cols-3">
            <span><b className="block text-lg">{p.colors ?? p.colorCount}</b> Colors</span>
            <span><b className="block text-lg">{p.colorChanges ?? p.colorCount}</b> Color changes</span>
            <span><b className="block text-lg">{p.sizes?.length ?? p.hoopSizes.length}</b> Sizes</span>
            <span><b className="block text-lg">{p.formats.length}</b> Formats</span>
            <span><b className="block text-lg">{p.difficulty}</b> Difficulty</span>
          </div>
          <ProductActions product={p} />
        </div>
      </div>
      <ProductDetailSections product={p} />
      <section className="py-16">
        <p className="mb-2 font-semibold text-primary">Continue creating</p>
        <h2 className="mb-6 text-3xl font-semibold">{p.productType === "paid" ? "You may also like" : "Premium designs you may love"}</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((x) => (
            <ProductCard key={x.id} product={x} />
          ))}
        </div>
      </section>
    </main>
  );
}
