"use client";
import Link from "next/link";
import {
  ChevronDown,
  Gift,
  Headphones,
  Layers,
  LayoutGrid,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { primaryLinks, utilityLinks } from "./nav-data";
import {
  freeCategories,
  getCategoryHref,
  rewardCategories,
  shopCategories,
} from "@/lib/categories";

const CatalogIcon = ({ label }: { label: string }) => {
  if (label === "Free Designs")
    return <Gift className="h-4 w-4 text-success" />;
  if (label === "Reward Designs")
    return <Trophy className="h-4 w-4 text-accent" />;
  if (label === "New Arrivals") return <Sparkles className="h-4 w-4" />;
  if (label === "Bundles") return <Layers className="h-4 w-4" />;
  return <LayoutGrid className="h-4 w-4" />;
};

const UtilityIcon = ({ label }: { label: string }) => {
  if (label === "Support") return <Headphones className="h-4 w-4" />;
  if (label === "Community") return <Users className="h-4 w-4" />;
  return <Sparkles className="h-4 w-4" />;
};

export default function BottomNavbar() {
  const [shop, setShop] = useState(false);
  const [designMenu, setDesignMenu] = useState<string | null>(null);
  const path = usePathname();
  return (
    <div
      className="bottom-navbar hidden h-14 text-white shadow-sm md:block"
      onMouseLeave={() => {
        setShop(false);
        setDesignMenu(null);
      }}
    >
      <nav
        aria-label="Store navigation"
        className="store-navigation mx-auto flex h-full max-w-7xl items-center px-4 text-sm font-semibold"
      >
        <div className="relative h-full">
          <button
            onClick={() => {
              setDesignMenu(null);
              setShop(!shop);
            }}
            onMouseEnter={() => {
              setDesignMenu(null);
              setShop(true);
            }}
            aria-expanded={shop}
            className={
              "flex h-full items-center gap-2 px-5 transition " +
              (shop || path === "/shop" || path.startsWith("/category/")
                ? "bg-slate-hover text-accent"
                : "hover:bg-slate-hover")
            }
          >
            <LayoutGrid className="h-4 w-4" />
            Shop
            <ChevronDown className="h-4 w-4" />
          </button>
          {shop && (
            <div
              onMouseLeave={() => setShop(false)}
              className="absolute left-0 top-14 z-50 grid w-[min(92vw,900px)] grid-cols-3 gap-4 rounded-b-2xl border bg-white p-5 text-stone-800 shadow-2xl"
            >
              {shopCategories.map((category) => (
                <div
                  key={category.id}
                  className="rounded-xl p-2 hover:bg-stone-50"
                >
                  <Link
                    onClick={() => setShop(false)}
                    className={
                      "rounded-md px-1 font-bold text-rose-700 hover:underline " +
                      (path === getCategoryHref(category) ? "bg-rose-100" : "")
                    }
                    href={getCategoryHref(category)}
                  >
                    {category.name}
                  </Link>
                  <div className="mt-1 flex flex-wrap gap-x-2 text-xs font-normal text-stone-500">
                    {category.children?.slice(0, 4).map((child) => (
                      <Link
                        key={child.id}
                        href={getCategoryHref(child)}
                        onClick={() => setShop(false)}
                        className={
                          "rounded px-1 py-0.5 hover:text-rose-700 " +
                          (path === getCategoryHref(child)
                            ? "bg-rose-100 font-semibold text-rose-700"
                            : "")
                        }
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {primaryLinks.map((item) =>
          item.label === "Free Designs" || item.label === "Reward Designs" ? (
            <div className="relative h-full" key={item.href}>
              <button
                type="button"
                onMouseEnter={() => {
                  setShop(false);
                  setDesignMenu(item.label);
                }}
                onClick={() =>
                  setDesignMenu(designMenu === item.label ? null : item.label)
                }
                aria-expanded={designMenu === item.label}
                className={
                  "flex h-full items-center gap-2 px-3 transition xl:px-4 " +
                  (designMenu === item.label ||
                  (item.label === "Free Designs" &&
                    path.startsWith("/free-designs")) ||
                  (item.label === "Reward Designs" &&
                    path.startsWith("/rewards"))
                    ? "bg-slate-hover text-accent"
                    : "hover:bg-slate-hover")
                }
              >
                <CatalogIcon label={item.label} />
                <span>{item.label}</span>
                <ChevronDown className="h-4 w-4 transition-transform" />
              </button>
              {designMenu === item.label && (
                <div
                  className={
                    "absolute top-14 z-50 w-[min(92vw,900px)] overflow-hidden rounded-b-2xl border bg-white text-stone-800 shadow-2xl " +
                    (item.label === "Reward Designs"
                      ? "right-[-19rem] lg:right-[-32rem]"
                      : "left-0")
                  }
                >
                  <div className="border-b bg-rose-50 px-6 py-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-rose-700">
                      Explore {item.label}
                    </p>
                    <div className="mt-1 flex items-center justify-between gap-4">
                      <h2 className="text-xl font-semibold">
                        Browse by category
                      </h2>
                      <Link
                        href={item.href}
                        onClick={() => setDesignMenu(null)}
                        className="shrink-0 rounded-full bg-rose-700 px-4 py-2 text-sm text-white hover:bg-rose-800"
                      >
                        View all
                      </Link>
                    </div>
                  </div>
                  <div
                    className={
                      "grid max-h-[58vh] gap-2 overflow-y-auto p-5 " +
                      (item.label === "Free Designs"
                        ? "grid-cols-3 lg:grid-cols-4"
                        : "grid-cols-3")
                    }
                  >
                    {(item.label === "Free Designs"
                      ? freeCategories
                      : rewardCategories
                    ).map((category) => (
                      <Link
                        key={category.id}
                        href={getCategoryHref(category)}
                        onClick={() => setDesignMenu(null)}
                        className={
                          "flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-rose-50 hover:text-rose-700 " +
                          (path === getCategoryHref(category)
                            ? "bg-rose-100 font-semibold text-rose-800"
                            : "")
                        }
                      >
                        <CatalogIcon label={item.label} />
                        <span>{category.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              className={
                "flex h-full items-center gap-2 px-3 transition xl:px-4 " +
                (path === item.href
                  ? "bg-slate-hover text-accent"
                  : "hover:bg-slate-hover")
              }
              href={item.href}
              key={item.href}
            >
              <CatalogIcon label={item.label} />
              <span>{item.label}</span>
            </Link>
          ),
        )}
        <i className="mx-2 h-6 w-px bg-white/30 xl:mx-4" />
        {utilityLinks.map((item) => (
          <Link
            className="flex h-10 items-center gap-2 rounded-lg px-2 transition hover:bg-white/15 xl:px-3"
            href={item.href}
            key={item.href}
          >
            <UtilityIcon label={item.label} />
            <span className="hidden lg:inline">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
