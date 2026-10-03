import type { ProductDetail, ProductSummary } from '@/domain/products';
import { describe, expect, it } from 'vitest';
import { mapProductDetailResponse } from './product-detail.adapter';

const similarProduct: ProductSummary = {
  id: '2',
  brand: 'Brand 2',
  name: 'Similar Product',
  basePrice: 200,
  imageUrl: 'http://via.placeholder.com/200',
};

const productDetail: ProductDetail = {
  id: '1',
  brand: 'Brand 1',
  name: 'Product 1',
  basePrice: 100,
  description: 'A great product',
  rating: 4.5,
  specs: {
    screen: '6.1"',
    resolution: '1170x2532',
    processor: 'A15',
    mainCamera: '12MP',
    selfieCamera: '12MP',
    battery: '3095mAh',
    os: 'iOS',
    screenRefreshRate: '60Hz',
  },
  colorOptions: [
    { name: 'Black', hexCode: '#000000', imageUrl: 'http://via.placeholder.com/black' },
    { name: 'White', hexCode: '#FFFFFF', imageUrl: 'https://via.placeholder.com/white' },
  ],
  storageOptions: [{ capacity: '128GB', price: 100 }],
  similarProducts: [similarProduct, { ...similarProduct, name: 'Duplicate Similar' }],
};

describe('mapProductDetailResponse', () => {
  it('should upgrade color option image urls to https', () => {
    const result = mapProductDetailResponse(productDetail);

    expect(result.colorOptions).toEqual([
      { name: 'Black', hexCode: '#000000', imageUrl: 'https://via.placeholder.com/black' },
      { name: 'White', hexCode: '#FFFFFF', imageUrl: 'https://via.placeholder.com/white' },
    ]);
  });

  it('should map and deduplicate similar products', () => {
    const result = mapProductDetailResponse(productDetail);

    expect(result.similarProducts).toEqual([
      {
        ...similarProduct,
        imageUrl: 'https://via.placeholder.com/200',
      },
    ]);
  });

  it('should preserve the rest of the product detail fields', () => {
    const result = mapProductDetailResponse(productDetail);

    expect(result).toMatchObject({
      id: productDetail.id,
      brand: productDetail.brand,
      name: productDetail.name,
      basePrice: productDetail.basePrice,
      description: productDetail.description,
      rating: productDetail.rating,
      specs: productDetail.specs,
      storageOptions: productDetail.storageOptions,
    });
  });

  it('should handle a product with no similar products or color options', () => {
    const emptyDetail: ProductDetail = {
      ...productDetail,
      colorOptions: [],
      similarProducts: [],
    };

    const result = mapProductDetailResponse(emptyDetail);

    expect(result.colorOptions).toEqual([]);
    expect(result.similarProducts).toEqual([]);
  });
});
