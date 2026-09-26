export type ProductType = "google_review" | "direct_link" | "torvya_page";

export const productCatalog: Record<ProductType, {
  name: string;
  activationPath: string;
  enabled: boolean;
}> = {
  google_review: {
    name: "Torvya Review",
    activationPath: "google",
    enabled: true
  },
  direct_link: {
    name: "Torvya Link",
    activationPath: "link",
    enabled: false
  },
  torvya_page: {
    name: "Torvya Page",
    activationPath: "page",
    enabled: false
  }
};

export function activationRoute(productType: ProductType, code: string) {
  const product = productCatalog[productType] ?? productCatalog.google_review;
  return "/activate/" + product.activationPath + "/" + code;
}
