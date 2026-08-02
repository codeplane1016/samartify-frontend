export const productImages = [
  "/images/products/41eabc6829b8b0eb06abb63dce2abcda_f1022846.jpg",
  "/images/products/533da9b338e94efe2cd81cd6696b84cd_f290051.jpg",
  "/images/products/6c26ac0dc812b17ae54008b642fffe65_f1109665.jpg",
  "/images/products/89c54046a21ceacc443b33ef6c327a97_f1526484.jpg",
  "/images/products/95aa7d80e891706856f127f1aacd0c32_f161768.jpg",
  "/images/products/a44eb7fdc2192503424a2a42c7d05548_f956568.jpg",
  "/images/products/a5ce820151a059cb06e39b7fb40386b6_f360924.jpg",
  "/images/products/b4cc702fe83d4253e3af4935bca868f7_f1286744.jpg",
  "/images/products/b745bb46c5a07169a8aaf67340d2190c_f1020920.jpg",
  "/images/products/c326baece1c17292a43ca93daeca3fbe_f780666.jpg",
  "/images/products/d5319875d74f5d4f1f7f699bfcf33a59_f987310.jpg",
  "/images/products/r5319875d74f5d4f1f7f699bfcf33a59_f987313.png",
] as const;

export const getStableProductImage = (productId: number) =>
  productImages[((productId - 1) * 7 + 3) % productImages.length];
