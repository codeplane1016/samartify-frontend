import { CatalogType, Category, Product } from "@/types/product";

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const children = (
  parentId: string,
  catalogType: CatalogType,
  names: string[],
): Category[] =>
  names.map((name) => ({
    id: catalogType + "-" + parentId + "-" + slugify(name),
    name,
    slug: slugify(name),
    catalogType,
    parentId,
    description: name + " embroidery designs",
  }));

const shopGroup = (
  name: string,
  slug: string,
  names: string[],
  accent: string,
): Category => ({
  id: "shop-" + slug,
  name,
  slug,
  catalogType: "shop",
  description: "Browse " + name.toLowerCase() + " embroidery designs.",
  accent,
  children: children("shop-" + slug, "shop", names),
});

export const shopCategories: Category[] = [
  shopGroup(
    "Animals & Nature",
    "animals-nature",
    [
      "Animals",
      "Birds",
      "Bugs & Insects",
      "Feathers & Wings",
      "Flowers",
      "Sea Life",
      "Seasons",
      "Summer",
      "Winter",
      "Snowflakes",
    ],
    "mint",
  ),
  shopGroup(
    "Characters & Cartoons",
    "characters-cartoons",
    [
      "101 Dalmatians",
      "Alice in Wonderland",
      "Aladdin",
      "Aristocats",
      "Bambi",
      "Blues Clues",
      "Cocomelon",
      "Despicable Me",
      "Dr. Seuss",
      "Dumbo",
      "Finding Nemo",
      "Hello Kitty",
      "Lion King",
      "Looney Tunes",
      "Mickey Mouse",
      "Simpsons",
      "Toy Story",
      "Winnie Pooh",
    ],
    "coral",
  ),
  shopGroup(
    "Games & Gaming",
    "games-gaming",
    [
      "Among Us",
      "Angry Birds",
      "Fortnite",
      "Game Heroes",
      "Games",
      "Pacman",
      "Roblox",
      "Sonic the Hedgehog",
    ],
    "purple",
  ),
  shopGroup(
    "Superheroes & Comics",
    "superheroes-comics",
    [
      "Avengers",
      "Batman",
      "Captain America",
      "Green Lantern",
      "Incredible Hulk",
      "Spiderman",
      "Superhero",
      "Superman",
      "Suicide Squad",
      "The Incredibles",
    ],
    "blue",
  ),
  shopGroup(
    "Sports",
    "sports",
    [
      "American Football",
      "Baseball",
      "Basketball",
      "College & University Sports",
      "Football & Soccer",
      "Golf",
      "Hockey Teams",
      "Rugby",
      "Sports Logos",
    ],
    "sky",
  ),
  shopGroup(
    "Transportation",
    "transportation",
    ["Auto & Moto", "Cars", "Transport", "Aviation & Airlines"],
    "slate",
  ),
  shopGroup(
    "Holidays & Occasions",
    "holidays-occasions",
    [
      "Back to School",
      "Halloween",
      "Holidays",
      "St. Patrick's Day",
      "Valentine's Day",
    ],
    "rose",
  ),
  shopGroup(
    "Travel & Places",
    "travel-places",
    ["Countries & Cities", "Nautical"],
    "sky",
  ),
  shopGroup(
    "Food & Cooking",
    "food-cooking",
    [
      "Fast Food & Markets",
      "Food & Drink",
      "Kitchen & Cooking",
      "Vegetables & Fruits",
    ],
    "peach",
  ),
  shopGroup(
    "People & Family",
    "people-family",
    ["Babies & Mothers", "Girls & Women", "Home & Family", "Princesses"],
    "rose",
  ),
  shopGroup(
    "Fashion & Beauty",
    "fashion-beauty",
    ["Cosmetics & Perfume", "Fashion & Apparel", "Watches & Style"],
    "lilac",
  ),
  shopGroup(
    "Home, Crafts & Decoration",
    "home-crafts-decoration",
    ["Ornaments & Decoration", "Teddy Bears", "Crafts", "Hobbies", "Keys"],
    "cream",
  ),
  shopGroup(
    "Business & Services",
    "business-services",
    [
      "Equipment",
      "Entertainment Industry",
      "Police & Emergency Services",
      "Social Services",
      "Telecommunications",
      "Social Networks & Internet",
    ],
    "blue",
  ),
  shopGroup(
    "Fantasy & Fiction",
    "fantasy-fiction",
    ["Fantasy World", "Game of Thrones", "Harry Potter", "Monsters"],
    "purple",
  ),
  shopGroup(
    "Symbols & Graphics",
    "symbols-graphics",
    ["Logos", "Quotes", "Skulls", "Anchors"],
    "coral",
  ),
];

const flatCatalog = (catalogType: CatalogType, names: string[]): Category[] =>
  names.map((name) => ({
    id: catalogType + "-" + slugify(name),
    name,
    slug: slugify(name),
    catalogType,
    description: name + " embroidery designs",
  }));

export const freeCategories = flatCatalog("free", [
  "Activities",
  "Animals",
  "Applique",
  "Babies & Children",
  "Birds",
  "Business Symbols",
  "Butterflies & Dragonflies",
  "Cartoons",
  "Cats",
  "Christmas",
  "Coffee",
  "Creative Designs",
  "Decorative Elements",
  "Easter",
  "Fantasy",
  "Flowers",
  "Halloween",
  "Home & Hobby",
  "Insects",
  "Kitchen & Cooking",
  "Names",
  "Native American",
  "Nautical",
  "Photo Stitch",
  "Phrases & Words",
  "Religion",
  "Reptiles",
  "Seasons",
  "Transportation",
  "Travel & Countries",
  "Tribal",
  "Valentine's Day",
  "Winnie Pooh",
  "Women",
]);

export const rewardCategories = flatCatalog("reward", [
  "Alphabet & Numbers",
  "Angels & Magical Creatures",
  "Animals",
  "Applique",
  "Birds",
  "Cars, Sports & Hobbies",
  "Cartoons",
  "Decoration",
  "Dinosaurs",
  "Flowers",
  "Holidays",
  "Insects",
  "Kitchen",
  "Logos & Symbols",
  "People",
  "Romantic & Love",
  "Sea & Nautical",
  "Toys",
  "Tribal & Ethnic",
  "Travel",
  "Women",
]);

export const getCategories = (catalogType: CatalogType) =>
  catalogType === "shop"
    ? shopCategories
    : catalogType === "free"
      ? freeCategories
      : rewardCategories;

export const allCategories = [
  ...shopCategories.flatMap((category) => [
    category,
    ...(category.children || []),
  ]),
  ...freeCategories,
  ...rewardCategories,
];

export const getCategoryBySlug = (slug: string, catalogType?: CatalogType) =>
  allCategories.find(
    (category) =>
      category.slug === slug &&
      (!catalogType || category.catalogType === catalogType),
  );

export const getCategoryParent = (category: Category) =>
  category.parentId
    ? shopCategories.find((parent) => parent.id === category.parentId)
    : undefined;

export const getCategoryChildren = (slug: string) =>
  shopCategories.find((category) => category.slug === slug)?.children || [];

export const getProductsByCategory = (
  products: Product[],
  slug: string,
  catalogType?: CatalogType,
) => {
  const category = getCategoryBySlug(slug, catalogType);
  if (!category) return [];
  const slugs = new Set([
    category.slug,
    ...(category.children || []).map((child) => child.slug),
  ]);
  return products.filter(
    (product) =>
      slugs.has(product.categorySlug) &&
      (!catalogType ||
        (catalogType === "shop"
          ? product.productType === "paid"
          : product.productType === catalogType)),
  );
};

export const getCategoryProductCount = (
  products: Product[],
  category: Category,
) =>
  getProductsByCategory(products, category.slug, category.catalogType).length;

export const getCategoryHref = (category: Category) =>
  category.catalogType === "shop"
    ? "/category/" + category.slug
    : category.catalogType === "free"
      ? "/free-designs/" + category.slug
      : "/rewards/" + category.slug;
