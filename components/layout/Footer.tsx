import Link from "next/link";
import Image from "next/image";

const groups = {
  Shop: [
    ["/shop", "All Designs"],
    ["/free-designs", "Free Designs"],
    ["/bundles", "Bundles"],
    ["/rewards", "Rewards"],
  ],
  Support: [
    ["/faq", "FAQ"],
    ["/contact", "Contact"],
    ["/account/downloads", "Download Help"],
  ],
  Company: [
    ["/about", "About"],
    ["/blog", "Journal"],
  ],
  Legal: [
    ["/terms", "Terms"],
    ["/privacy-policy", "Privacy"],
    ["/refund-policy", "Refund Policy"],
  ],
};
export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-accent-soft text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-6">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="inline-flex rounded-2xl bg-transparent p-3 text-2xl font-semibold"
            >
              <Image
                src="/images/samartify-logo.png"
                alt="SamArtify E.Lab"
                width={160}
                height={58}
                priority
                className="h-auto w-[130px] sm:w-[145px] lg:w-[160px]"
              />
            </Link>
            <p className="mt-3 max-w-sm text-sm">
              Beautiful machine embroidery designs, digitized for makers and
              delivered instantly.
            </p>
            <form className="mt-6 flex overflow-hidden rounded-full border border-border bg-white shadow-sm">
              <input
                aria-label="Newsletter email"
                type="email"
                placeholder="Your email"
                className="min-w-0 flex-1 border-0 bg-white px-4 py-3 text-foreground"
              />
              <button className="bg-cta px-5 font-semibold text-white transition hover:bg-cta-hover">
                Join
              </button>
            </form>
          </div>
          {Object.entries(groups).map(([title, links]) => (
            <div key={title}>
              <h2 className="font-semibold text-foreground">{title}</h2>
              <nav className="mt-4 space-y-3 text-sm">
                {links.map(([h, l]) => (
                  <Link
                    className="block transition hover:text-primary"
                    key={h}
                    href={h}
                  >
                    {l}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-border pt-7 text-xs text-foreground-secondary">
          <span>© 2026 SamArtify. Demo storefront.</span>
          <span>Visa · Mastercard · PayPal · Apple Pay</span>
        </div>
      </div>
    </footer>
  );
}
