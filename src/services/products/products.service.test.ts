import type { ProductsResponse } from '@/domain/products';
import { describe, expect, it, vi } from 'vitest';
import { getProducts } from './products.service';

const data: ProductsResponse['data'] = [
  {
    id: '1',
    brand: 'Brand 1',
    name: 'Product 1',
    basePrice: 100,
    imageUrl: 'https://via.placeholder.com/150',
  },
];

vi.spyOn(globalThis, 'fetch').mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      ok: true,
      data,
    }),
  } as unknown as Response),
);

describe('products service', () => {
  it('should get products', async () => {
    const products = await getProducts();

    expect(products).toStrictEqual(data);
  });
});
