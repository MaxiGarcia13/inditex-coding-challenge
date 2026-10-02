import type { ProductCart } from './products.types';

export function canBeAddedToCart({ storageOption, colorOption }: Pick<ProductCart, 'storageOption' | 'colorOption'>) {
  return storageOption != null && colorOption != null;
}

export function createProductKey(product: Pick<ProductCart, 'id' | 'storageOption' | 'colorOption'>) {
  return `${product.id}-${product.storageOption.capacity}-${product.colorOption.name}`;
}
