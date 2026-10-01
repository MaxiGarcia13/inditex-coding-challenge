import type { HttpError } from '@/domain/http';
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

describe('products service', () => {
  it('should get products', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          data,
        }),
      } as unknown as Response),
    );

    const products = await getProducts();

    expect(products).toStrictEqual(data);
  });

  it('should throw an error if the request fails', async () => {
    const error: HttpError = {
      status: 500,
      error: 'server error',
    };

    vi.spyOn(globalThis, 'fetch').mockImplementation(() =>
      Promise.reject(error),
    );

    await expect(getProducts()).rejects.toThrow(error);
  });
});
