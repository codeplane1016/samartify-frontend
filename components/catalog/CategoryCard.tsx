import Link from "next/link";
import { Shapes } from "lucide-react";
import { getCategoryHref } from "@/lib/categories";
import { Category } from "@/types/product";

const accents: Record<string, string> = {
  mint: "bg-emerald-50 text-emerald-700",
  coral: "bg-orange-50 text-orange-700",
  purple: "bg-purple-50 text-purple-700",
  blue: "bg-blue-50 text-blue-700",
  sky: "bg-sky-50 text-sky-700",
  slate: "bg-slate-50 text-slate-700",
  rose: "bg-rose-50 text-rose-700",
  peach: "bg-orange-50 text-orange-700",
  lilac: "bg-violet-50 text-violet-700",
  cream: "bg-amber-50 text-amber-700",
};

export default function CategoryCard({
  category,
  count,
}: {
  category: Category;
  count?: number;
}) {
  return (
    <Link
      href={getCategoryHref(category)}
      className="group rounded-2xl border bg-white p-5 transition hover:-translate-y-0.5 hover:border-info hover:shadow-lg"
    >
      <span
        className={
          "inline-flex rounded-xl p-3 " +
          (accents[category.accent || ""] || "bg-rose-50 text-rose-700")
        }
      >
        <Shapes className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-lg font-semibold group-hover:text-info">
        {category.name}
      </h3>
      {category.description && (
        <p className="mt-1 line-clamp-2 text-sm text-stone-500">
          {category.description}
        </p>
      )}
      {count !== undefined && (
        <p className="mt-3 text-sm font-medium text-stone-500">
          {count} designs
        </p>
      )}
    </Link>
  );
}
