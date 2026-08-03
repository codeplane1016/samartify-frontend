import Link from "next/link";
export default function NotFound() {
  return (
    <main className="px-4 py-24 text-center">
      <p className="text-sm text-rose-700">404</p>
      <h1 className="mt-2 text-5xl font-semibold">This stitch wandered off.</h1>
      <p className="mt-4 text-stone-500">
        The page or design could not be found.
      </p>
      <Link
        href="/shop"
        className="mt-8 inline-block rounded-full bg-stone-900 px-6 py-3 text-white"
      >
        Browse designs
      </Link>
    </main>
  );
}
