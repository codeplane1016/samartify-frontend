import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/home/ProductCard";
import { getCategoryProductCount, shopCategories } from "@/lib/categories";
import { products, bundles } from "@/lib/catalog";
const Section = ({
  title,
  items,
}: {
  title: string;
  items: typeof products;
}) => (
  <section className="mx-auto max-w-7xl px-4 py-14 lg:py-16">
    <div className="mb-8 flex items-end justify-between gap-5">
      <h2 className="text-3xl font-semibold">{title}</h2>
      <Link href="/shop" className="text-sm text-rose-700">
        View all →
      </Link>
    </div>
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {items.slice(0, 3).map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  </section>
);
export default function Home() {
  return (
    <>
      <section className="bg-[#f3e8df] px-4 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[.2em] text-rose-800">
              Made for makers
            </p>
            <h1 className="text-5xl font-semibold leading-tight lg:text-6xl">
              Beautiful stitches, ready when inspiration strikes.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-stone-700">
              Premium machine embroidery files, carefully digitized and
              delivered instantly in every popular format.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="rounded-full bg-stone-900 px-6 py-3 text-white"
              >
                Shop designs
              </Link>
              <Link
                href="/free-designs"
                className="rounded-full border border-stone-900 px-6 py-3"
              >
                Browse free designs
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[3rem] shadow-xl">
            <Image
              src="/images/ads.png"
              alt="SamArtify embroidery designs"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 620px"
              priority
            />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-14 lg:py-16">
        <h2 className="mb-8 text-3xl font-semibold">Shop by category</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shopCategories.slice(0, 8).map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="rounded-2xl border border-border/70 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-info/60 hover:shadow-md"
            >
              <span className="text-2xl">✦</span>
              <h3 className="mt-5 text-xl font-medium">{c.name}</h3>
              <p className="mt-1 text-stone-500">
                {getCategoryProductCount(products, c)} designs
              </p>
            </Link>
          ))}
        </div>
      </section>
      <Section
        title="Featured designs"
        items={products.filter((p) => p.isFeatured)}
      />
      <Section title="New arrivals" items={products.filter((p) => p.isNew)} />
      <Section
        title="Free to stitch"
        items={products.filter((p) => p.productType === "free")}
      />
      <section className="bg-stone-900 py-14 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-semibold">Curated bundles</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {bundles.map((b) => (
              <Link
                href="/bundles"
                key={b.slug}
                className="rounded-2xl bg-white/10 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
              >
                <h3 className="text-xl">{b.name}</h3>
                <p className="mt-2 text-stone-300">
                  {b.count} designs · <s>${b.original}</s> ${b.price}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-14 text-center">
        <h2 className="text-3xl font-semibold">Why SamArtify?</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-5">
          {[
            "Instant download",
            "6 machine formats",
            "Test-stitched quality",
            "Flexible licensing",
            "Secure checkout",
          ].map((x) => (
            <div className="rounded-xl bg-stone-100 p-5" key={x}>
              {x}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
