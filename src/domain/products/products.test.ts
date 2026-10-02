import type { ProductColorOption, ProductStorageOption } from './products.types';
import { describe, expect, it } from 'vitest';
import { canBeAddedToCart } from './products';

const storageOption: ProductStorageOption = { capacity: '128GB', price: 100 };
const colorOption: ProductColorOption = { name: 'Red', hexCode: '#FF0000', imageUrl: 'https://example.com/red.jpg' };

describe('products', () => {
  it('should return true if the product can be added to the cart', () => {
    expect(canBeAddedToCart({ storageOption, colorOption })).toBe(true);
  });

  it('should return false if the product cannot be added to the cart', () => {
    expect(canBeAddedToCart({ storageOption: null, colorOption: undefined })).toBe(false);
    expect(canBeAddedToCart({ storageOption: undefined, colorOption: null })).toBe(false);
    expect(canBeAddedToCart({ storageOption: null, colorOption })).toBe(false);
    expect(canBeAddedToCart({ storageOption, colorOption: undefined })).toBe(false);
  });
});
