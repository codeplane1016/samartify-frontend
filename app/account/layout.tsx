import Link from "next/link";
const nav = [
  ["/account", "Dashboard"],
  ["/account/profile", "Profile"],
  ["/account/orders", "Orders"],
  ["/account/downloads", "Downloads"],
  ["/account/wishlist", "Wishlist"],
  ["/account/rewards", "Rewards"],
  ["/account/settings", "Settings"],
];
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[220px_1fr] lg:py-14">
      <aside className="h-fit rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">My SamArtify</h2>
        <nav className="flex gap-2 overflow-auto md:flex-col">
          {nav.map(([h, l]) => (
            <Link
              className="whitespace-nowrap rounded-xl px-4 py-3 transition-colors hover:bg-stone-100 hover:text-primary"
              href={h}
              key={h}
            >
              {l}
            </Link>
          ))}
        </nav>
      </aside>
      <main>{children}</main>
    </div>
  );
}
