import Link from "next/link";
import { bundles } from "@/lib/catalog";
export default function Bundles() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-4xl font-semibold">Embroidery bundles</h1>
      <p className="mt-3 text-stone-600">
        Coordinated collections with more designs and more value.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {bundles.map((b) => (
          <article className="rounded-3xl bg-stone-100 p-8" key={b.slug}>
            <p className="text-5xl">✿</p>
            <h2 className="mt-8 text-2xl font-semibold">{b.name}</h2>
            <p className="mt-2">{b.count} included designs</p>
            <p className="mt-5 text-xl">
              <s className="text-stone-400">${b.original}</s> <b>${b.price}</b>
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-block rounded-full bg-stone-900 px-5 py-3 text-white"
            >
              Explore collection
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
