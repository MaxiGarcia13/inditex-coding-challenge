import type { ProductColorOption, ProductStorageOption } from './products.types';
import { describe, expect, it } from 'vitest';
import { canBeAddedToCart } from './products';

const storage: ProductStorageOption = { capacity: '128GB', price: 100 };
const color: ProductColorOption = { name: 'Red', hexCode: '#FF0000', imageUrl: 'https://example.com/red.jpg' };

describe('products', () => {
  it('should return true if the product can be added to the cart', () => {
    expect(canBeAddedToCart({ storage, color })).toBe(true);
  });

  it('should return false if the product cannot be added to the cart', () => {
    expect(canBeAddedToCart({ storage: null, color: undefined })).toBe(false);
    expect(canBeAddedToCart({ storage: undefined, color: null })).toBe(false);
    expect(canBeAddedToCart({ storage: null, color })).toBe(false);
    expect(canBeAddedToCart({ storage, color: undefined })).toBe(false);
  });
});
