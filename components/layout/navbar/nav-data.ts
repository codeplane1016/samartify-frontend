import { categories } from "@/lib/catalog";
export const shopLinks = [
  { label: "All Designs", href: "/shop" },
  ...categories.map(({ name, slug }) => ({
    label: name,
    href: `/category/${slug}`,
  })),
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "New Arrivals", href: "/new-arrivals" },
];
export const primaryLinks = [
  { label: "Free Designs", href: "/free-designs" },
  { label: "Reward Designs", href: "/rewards" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "Bundles", href: "/bundles" },
];
export const utilityLinks = [
  { label: "Support", href: "/contact" },
  { label: "Customer Digitizing", href: "/custom-digitizing" },
  { label: "Community", href: "/community" },
];
export const languages = [
  "English",
  "French",
  "German",
  "Italian",
  "Spanish",
  "Portuguese",
  "Russian",
];
