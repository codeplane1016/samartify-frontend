export type ProductType = "paid" | "free" | "reward";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type CatalogType = "shop" | "free" | "reward";
export interface Category {
  id: string;
  slug: string;
  name: string;
  catalogType: CatalogType;
  parentId?: string;
  description?: string;
  productCount?: number;
  accent?: string;
  children?: Category[];
}
export interface LicenseOption {
  id: string;
  name: string;
  description: string;
  priceMultiplier: number;
}
export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  salePrice?: number;
  rewardPoints?: number;
  image: string;
  description: string;
  shortDescription?: string;
  sku?: string;
  currency?: string;
  images?: string[];
  productType: ProductType;
  category: Category;
  categoryId: string;
  categorySlug: string;
  formats: string[];
  hoopSizes: string[];
  stitchCount: number;
  colorCount: number;
  colors?: number;
  colorChanges?: number;
  width: number;
  height: number;
  difficulty: Difficulty;
  fabric: string;
  stabilizer: string;
  recommendedFabric?: string;
  recommendedStabilizer?: string;
  recommendedThread?: string;
  sizes?: Array<{ width: number; height: number; unit: "mm" | "in"; stitches: number }>;
  machineCompatibility?: Array<{ brand: string; formats: string[] }>;
  tags?: string[];
  includedFiles?: string[];
  colorChart?: { available: boolean; pdfUrl?: string };
  deliveryType?: "digital";
  instantDownload?: boolean;
  downloadableAfterPurchase?: boolean;
  allowRedownload?: boolean;
  licenses: LicenseOption[];
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}
export interface CartItem {
  id: number;
  slug?: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  hoopSize?: string;
  license?: string;
}
export interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: CartItem[];
}
