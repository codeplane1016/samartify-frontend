import Link from "next/link";
export default function Page() {
  return (
    <main className="bg-[#f5f3ff] px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <p className="font-semibold text-purple">Community</p>
        <h1 className="mt-3 text-5xl font-semibold">
          Made by the SamArtify community
        </h1>
        <p className="mt-5 text-lg text-foreground-secondary">
          Discover stitching inspiration, practical guides and ideas shared by
          fellow makers.
        </p>
        <div className="mt-9 flex gap-3">
          <Link
            href="/blog"
            className="rounded-full bg-purple px-6 py-3 text-white transition hover:opacity-90"
          >
            Read the journal
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-purple bg-white px-6 py-3 text-purple"
          >
            Share your make
          </Link>
        </div>
      </div>
    </main>
  );
}
