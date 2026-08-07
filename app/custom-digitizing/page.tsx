import Link from "next/link";
export default function Page() {
  return (
    <main className="bg-[#fff4ee] px-4 py-20 text-center">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-widest text-coral">
          Made for your idea
        </p>
        <h1 className="mt-3 text-5xl font-semibold">Customer digitizing</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-foreground-secondary">
          Turn artwork into a clean, machine-ready embroidery file. Send us your
          project details and we will help plan the next step.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-full bg-cta px-6 py-3 text-white hover:bg-cta-hover"
        >
          Request a quote
        </Link>
      </div>
    </main>
  );
}
