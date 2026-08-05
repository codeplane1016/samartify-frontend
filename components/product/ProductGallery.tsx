"use client";

import ProductImageZoom from "@/components/product/ProductImageZoom";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({
  images,
  name,
}: ProductGalleryProps) {
  const uniqueImages = Array.from(new Set(images));
  const selectedImage = uniqueImages[0];

  return (
    <div>
      <ProductImageZoom
        src={selectedImage}
        alt={`${name} stitch-out preview`}
      />
    </div>
  );
}
