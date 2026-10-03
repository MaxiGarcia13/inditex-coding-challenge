import type { ProductSummary } from '@/domain/products';
import { describe, expect, it } from 'vitest';
import { mapPorductsSummaries, mapProductSummariesResponse } from './product-summary.adapter';

const productA: ProductSummary = {
  id: '1',
  brand: 'Brand 1',
  name: 'Product 1',
  basePrice: 100,
  imageUrl: 'http://via.placeholder.com/150',
};

const productB: ProductSummary = {
  id: '2',
  brand: 'Brand 2',
  name: 'Product 2',
  basePrice: 200,
  imageUrl: 'https://via.placeholder.com/200',
};

describe('mapPorductsSummaries', () => {
  it('should upgrade http image urls to https', () => {
    const result = mapPorductsSummaries([productA]);

    expect(result).toEqual([
      {
        ...productA,
        imageUrl: 'https://via.placeholder.com/150',
      },
    ]);
  });

  it('should leave https image urls unchanged', () => {
    const result = mapPorductsSummaries([productB]);

    expect(result).toEqual([productB]);
  });

  it('should remove duplicate products by id', () => {
    const duplicate: ProductSummary = {
      ...productA,
      name: 'Duplicate Product 1',
      imageUrl: 'https://via.placeholder.com/999',
    };

    const result = mapPorductsSummaries([productA, productB, duplicate]);

    expect(result).toEqual([
      {
        ...productA,
        imageUrl: 'https://via.placeholder.com/150',
      },
      productB,
    ]);
  });

  it('should return an empty array when given no products', () => {
    expect(mapPorductsSummaries([])).toEqual([]);
  });
});

describe('mapProductSummariesResponse', () => {
  it('should map products and expose the total count', () => {
    const result = mapProductSummariesResponse([productA, productB]);

    expect(result).toEqual({
      data: [
        {
          ...productA,
          imageUrl: 'https://via.placeholder.com/150',
        },
        productB,
      ],
      total: 2,
    });
  });

  it('should count unique products after deduplication', () => {
    const result = mapProductSummariesResponse([productA, productA]);

    expect(result.total).toBe(1);
    expect(result.data).toHaveLength(1);
  });
});
