import Link from "next/link";
import { Download, Library, UserRound } from "lucide-react";

const steps = [
  [UserRound, "Create a free account", "Your library stays available whenever you return."],
  [Library, "Add a design", "Save any free design permanently to My Downloads."],
  [Download, "Download and stitch", "Get the included machine formats when you need them."],
] as const;

export default function FreeDesignOverview() {
  return (
    <section className="border-b border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <p className="font-semibold text-success">Free SamArtify designs</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold">Try our digitizing quality before your first purchase</h1>
        <p className="mt-4 max-w-2xl text-lg text-foreground-secondary">Build your embroidery library with a curated selection of free designs, then discover matching premium collections.</p>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {steps.map(([Icon, title, detail]) => <div key={title} className="rounded-2xl border border-border bg-success-soft p-5"><Icon className="h-5 w-5 text-success" /><h2 className="mt-3 font-semibold">{title}</h2><p className="mt-1 text-sm text-foreground-secondary">{detail}</p></div>)}
        </div>
        <Link href="/register?next=%2Ffree-designs" className="mt-7 inline-block rounded-full bg-success px-5 py-3 font-semibold text-white">Create my free account</Link>
      </div>
    </section>
  );
}
