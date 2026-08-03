"use client";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, products } from "@/lib/catalog";
import { allCategories, getCategoryHref } from "@/lib/categories";
export default function SearchBox({
  mobile = false,
  onClose,
}: {
  mobile?: boolean;
  onClose?: () => void;
}) {
  const [q, setQ] = useState(""),
    [open, setOpen] = useState(false),
    [category, setCategory] = useState("all"),
    [active, setActive] = useState(-1),
    wrap = useRef<HTMLDivElement>(null),
    router = useRouter(),
    pathname = usePathname();
  const matches = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return products
      .filter(
        (p) =>
          (category === "all" || p.category.slug === category) &&
          p.name.toLowerCase().includes(query),
      )
      .slice(0, 4);
  }, [q, category]);
  const categoryMatches = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return allCategories
      .filter((item) => item.name.toLowerCase().includes(query))
      .slice(0, 5);
  }, [q]);
  const close = useCallback(() => {
    setOpen(false);
    setActive(-1);
    if (onClose) onClose();
  }, [onClose]);
  const navigate = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router],
  );
  const submit = () => navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  useEffect(() => {
    setOpen(false);
    setActive(-1);
  }, [pathname]);
  return (
    <div
      ref={wrap}
      className={`relative ${mobile ? "w-full" : "min-w-0 flex-1"}`}
      onKeyDown={(e) => {
        if (e.key === "Escape") close();
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActive((x) => Math.min(x + 1, matches.length - 1));
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setActive((x) => Math.max(x - 1, 0));
        }
        if (e.key === "Enter") {
          e.preventDefault();
          if (active >= 0) navigate(`/product/${matches[active].slug}`);
          else submit();
        }
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="flex h-13 overflow-hidden rounded-xl border-2 border-stone-200 bg-white shadow-sm transition focus-within:border-rose-700 focus-within:ring-4 focus-within:ring-rose-100"
      >
        <div className="hidden w-44 shrink-0 sm:block">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger
              aria-label="Search category"
              className="h-full rounded-none border-0 border-r bg-stone-50 px-3 shadow-none"
            >
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="max-h-80">
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.slug} value={c.slug}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <input
          autoFocus={mobile}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          aria-label="Search embroidery designs"
          placeholder="Search embroidery designs..."
          className="min-w-0 flex-1 px-4 outline-none"
        />
        {mobile && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="px-3"
          >
            <X />
          </button>
        )}
        <button
          aria-label="Search"
          className="bg-rose-700 px-5 text-white transition hover:bg-rose-800"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>
      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+.5rem)] z-50 rounded-2xl border bg-white p-3 shadow-2xl">
          <div className="flex gap-2 border-b pb-3 text-xs">
            <b>Popular:</b>
            {["flowers", "monogram", "Christmas"].map((x) => (
              <button onClick={() => setQ(x)} className="text-rose-700" key={x}>
                {x}
              </button>
            ))}
          </div>
          <p className="px-2 pt-3 text-xs font-bold uppercase tracking-wider text-stone-400">
            Categories
          </p>
          {categoryMatches.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => navigate(getCategoryHref(item))}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm hover:bg-rose-50"
            >
              <span>{item.name}</span>
              <small className="capitalize text-stone-400">
                {item.catalogType === "free"
                  ? "Free"
                  : item.catalogType === "reward"
                    ? "Rewards"
                    : "Shop"}
              </small>
            </button>
          ))}
          <p className="px-2 pt-3 text-xs font-bold uppercase tracking-wider text-stone-400">
            Suggested products
          </p>
          {matches.map((p, i) => (
            <button
              onClick={() => router.push(`/product/${p.slug}`)}
              className={`flex w-full items-center gap-3 rounded-xl p-2 text-left ${i === active ? "bg-rose-50" : "hover:bg-stone-50"}`}
              key={p.id}
            >
              <Image
                src={p.image}
                alt=""
                width={44}
                height={44}
                className="rounded-lg"
              />
              <span className="flex-1">
                <b className="block text-sm">{p.name}</b>
                <small>{p.category.name}</small>
              </span>
              <strong className="text-sm">
                {p.productType === "free"
                  ? "FREE"
                  : p.productType === "reward"
                    ? `${p.rewardPoints} pts`
                    : `$${p.price.toFixed(2)}`}
              </strong>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
