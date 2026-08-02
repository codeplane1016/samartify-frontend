import { Category, LicenseOption, Product } from "@/types/product";
import {
  freeCategories,
  rewardCategories,
  shopCategories,
} from "@/lib/categories";
import { getStableProductImage } from "@/lib/product-images";
export const categories: Category[] = shopCategories;
const licenses: LicenseOption[] = [
  {
    id: "personal",
    name: "Personal",
    priceMultiplier: 1,
    description: "Personal projects.",
  },
  {
    id: "small",
    name: "Small Business",
    priceMultiplier: 1.8,
    description: "Small-business physical items.",
  },
  {
    id: "commercial",
    name: "Commercial",
    priceMultiplier: 3,
    description: "Higher-volume demo terms.",
  },
];
const themes = [
  "Wildflower",
  "Heirloom",
  "Woodland",
  "Autumn",
  "Bohemian",
  "Little Dreamer",
];
const forms = ["Wreath", "Monogram", "Fox", "Trio", "Mandala"];
export const products: Product[] = [];
for (let i = 0; i < 30; i++) {
  const productType = i % 6 === 0 ? "free" : i % 6 === 5 ? "reward" : "paid";
  const paidCategories = shopCategories.flatMap(
    (parent) => parent.children || [],
  );
  const category =
    productType === "free"
      ? freeCategories[Math.floor(i / 6) % freeCategories.length]
      : productType === "reward"
        ? rewardCategories[Math.floor(i / 6) % rewardCategories.length]
        : paidCategories[i % paidCategories.length];
  const name = `${themes[i % 6]} ${forms[Math.floor(i / 6)]}`;
  products.push({
    id: i + 1,
    slug: name.toLowerCase().replaceAll(" ", "-"),
    name,
    price: productType === "paid" ? 4.49 + (i % 5) : 0,
    rewardPoints: productType === "reward" ? 250 : undefined,
    image: getStableProductImage(i + 1),
    images: [getStableProductImage(i + 1), getStableProductImage(i + 7), getStableProductImage(i + 13)],
    sku: `SAM-EMB-${String(i + 1).padStart(3, "0")}`,
    currency: "USD",
    description: `A clean, carefully digitized ${category.name} design.`,
    shortDescription: `A carefully digitized ${category.name.toLowerCase()} machine embroidery design with multiple sizes and popular machine formats included.`,
    productType,
    category,
    categoryId: category.id,
    categorySlug: category.slug,
    formats: ["DST", "PES", "JEF", "EXP", "VP3", "XXX"],
    hoopSizes: ["4×4", "5×7"],
    stitchCount: 7200 + i * 417,
    colorCount: 4 + (i % 7),
    colors: 4 + (i % 7),
    colorChanges: 7 + (i % 9),
    width: 90,
    height: 96,
    difficulty: i % 5 ? "Beginner" : "Intermediate",
    fabric: "Cotton, linen or canvas",
    stabilizer: "Medium cut-away",
    recommendedFabric: "Medium-weight cotton, linen and similar stable fabrics",
    recommendedStabilizer: "Medium-weight tear-away or cut-away stabilizer depending on fabric",
    recommendedThread: "40 wt machine embroidery thread",
    sizes: Array.from({ length: 5 }, (_, sizeIndex) => ({ width: 90 + sizeIndex * 15, height: 96 + sizeIndex * 20, unit: "mm" as const, stitches: 7200 + i * 417 + sizeIndex * 2350 })),
    machineCompatibility: [
      { brand: "Brother / Baby Lock", formats: ["PES"] },
      { brand: "Janome", formats: ["JEF"] },
      { brand: "Bernina / Melco", formats: ["EXP"] },
      { brand: "Husqvarna / Viking / Pfaff", formats: ["VP3"] },
      { brand: "Singer", formats: ["XXX"] },
      { brand: "Tajima", formats: ["DST"] },
    ],
    tags: [category.name.toLowerCase(), themes[i % 6].toLowerCase(), forms[Math.floor(i / 6)].toLowerCase(), "machine embroidery"],
    includedFiles: ["Embroidery design files", "All listed size variants", "Multiple machine embroidery formats", "Thread color chart", "Design information sheet", "License information"],
    colorChart: { available: true },
    deliveryType: "digital",
    instantDownload: true,
    downloadableAfterPurchase: true,
    allowRedownload: true,
    licenses,
    rating: 4.6 + (i % 4) / 10,
    reviewCount: 18 + i * 3,
    isFeatured: i < 8,
    isNew: i > 21,
    isBestseller: i % 5 === 0,
  });
}
export const findProduct = (slug: string) =>
  products.find((p) => p.slug === slug || String(p.id) === slug);
export const bundles = ["Floral", "Christmas", "Woodland", "Baby"].map(
  (name, i) => ({
    slug: name.toLowerCase(),
    name: `${name} Bundle`,
    count: 8 + i * 2,
    original: 49 + i * 5,
    price: 24 + i * 3,
  }),
);
