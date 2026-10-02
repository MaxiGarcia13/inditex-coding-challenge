import type { ProductDetail } from './products.types';

interface CanBeAddedToCartProps {
  storage: ProductDetail['storageOptions'][number];
  color: ProductDetail['colorOptions'][number];
}

export function canBeAddedToCart({ storage, color }: CanBeAddedToCartProps) {
  return storage != null && color != null;
}
