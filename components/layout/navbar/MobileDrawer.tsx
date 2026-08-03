"use client";
import Link from "next/link";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import {
  freeCategories,
  getCategoryHref,
  rewardCategories,
  shopCategories,
} from "@/lib/categories";
import { primaryLinks, utilityLinks } from "./nav-data";
export default function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  if (!open) return null;
  const LinkRow = ({ href, label }: { href: string; label: string }) => (
    <Link
      onClick={onClose}
      href={href}
      className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-rose-50"
    >
      {label}
      <ChevronRight className="h-4 w-4 text-stone-400" />
    </Link>
  );
  return (
    <div className="fixed inset-0 z-[80] md:hidden">
      <button
        className="absolute inset-0 bg-stone-950/55 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close menu overlay"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="absolute inset-y-0 left-0 w-[min(88vw,390px)] overflow-y-auto bg-white p-5 shadow-2xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <b className="text-xl">
            Sam<span className="text-rose-700">Artify</span>
          </b>
          <button
            onClick={onClose}
            className="rounded-full bg-stone-100 p-2"
            aria-label="Close navigation"
          >
            <X />
          </button>
        </div>
        {[
          { label: "Shop", categories: shopCategories },
          { label: "Free Designs", categories: freeCategories },
          { label: "Reward Designs", categories: rewardCategories },
        ].map((section) => (
          <div key={section.label} className="mb-2">
            <button
              type="button"
              onClick={() =>
                setExpanded(expanded === section.label ? null : section.label)
              }
              aria-expanded={expanded === section.label}
              className="flex w-full items-center justify-between rounded-xl px-3 py-3 font-semibold hover:bg-rose-50"
            >
              {section.label}
              <ChevronDown
                className={
                  "h-4 w-4 transition-transform " +
                  (expanded === section.label ? "rotate-180" : "")
                }
              />
            </button>
            {expanded === section.label && (
              <div className="ml-3 border-l pl-2">
                {section.categories.map((category) => (
                  <div key={category.id}>
                    <Link
                      href={getCategoryHref(category)}
                      onClick={onClose}
                      className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm hover:bg-rose-50"
                    >
                      {category.name}
                    </Link>
                    {category.children?.slice(0, 5).map((child) => (
                      <Link
                        key={child.id}
                        href={getCategoryHref(child)}
                        onClick={onClose}
                        className="ml-3 flex min-h-10 items-center rounded-lg px-3 py-1.5 text-xs text-stone-500 hover:bg-rose-50"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <hr className="my-4" />
        {primaryLinks
          .filter(
            (item) =>
              item.label !== "Free Designs" && item.label !== "Reward Designs",
          )
          .map((x) => (
            <LinkRow {...x} key={x.href} />
          ))}
        <p className="mb-2 mt-6 text-xs font-bold uppercase tracking-wider text-rose-700">
          Help & community
        </p>
        {utilityLinks.map((x) => (
          <LinkRow {...x} key={x.href} />
        ))}
        <hr className="my-5" />
        <div className="grid grid-cols-2 gap-2">
          <Link
            onClick={onClose}
            href="/login"
            className="rounded-xl border p-3 text-center"
          >
            Sign in
          </Link>
          <Link
            onClick={onClose}
            href="/register"
            className="rounded-xl bg-stone-900 p-3 text-center text-white"
          >
            Create account
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <LinkRow href="/account/orders" label="Orders" />
          <LinkRow href="/account/downloads" label="Downloads" />
        </div>
      </aside>
    </div>
  );
}
