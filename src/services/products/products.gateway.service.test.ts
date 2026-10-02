import type { ProductDetail, ProductSummary } from '@/domain/products';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const API_URL = 'https://api.example.com';
const API_KEY = 'test-api-key';
const PRODUCTS_API_ENDPOINT = `${API_URL}/products`;
const PRODUCTS_OPTIONS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  },
};

const productSummaries: Array<ProductSummary> = [
  {
    id: '1',
    brand: 'Brand 1',
    name: 'Product 1',
    basePrice: 100,
    imageUrl: 'https://via.placeholder.com/150',
  },
];

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
    { name: 'Black', hexCode: '#000000', imageUrl: 'https://via.placeholder.com/150' },
  ],
  storageOptions: [{ capacity: '128GB', price: 100 }],
  similarProducts: [],
};

function mockFetchResponse(jsonData: unknown) {
  return vi.spyOn(globalThis, 'fetch').mockResolvedValue({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: () => Promise.resolve(jsonData),
  } as unknown as Response);
}

describe('products gateway service', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv('PRODUCTS_API_URL', API_URL);
    vi.stubEnv('PRODUCTS_API_KEY', API_KEY);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  async function loadGateway() {
    return import('./products.gateway.service');
  }

  describe('getProductsGateway', () => {
    it('should get products', async () => {
      const fetchSpy = mockFetchResponse(productSummaries);
      const { getProductsGateway } = await loadGateway();

      const products = await getProductsGateway();

      expect(fetchSpy).toHaveBeenCalledWith(PRODUCTS_API_ENDPOINT, PRODUCTS_OPTIONS);
      expect(products).toStrictEqual(productSummaries);
    });

    it('should pass search params in the url', async () => {
      const fetchSpy = mockFetchResponse(productSummaries);
      const { getProductsGateway } = await loadGateway();

      await getProductsGateway({ search: 'iphone', limit: 10, offset: 20 });

      expect(fetchSpy).toHaveBeenCalledWith(
        `${PRODUCTS_API_ENDPOINT}?search=iphone&limit=10&offset=20`,
        PRODUCTS_OPTIONS,
      );
    });

    it('should reject when fetch fails', async () => {
      vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network Error'));
      const { getProductsGateway } = await loadGateway();

      await expect(getProductsGateway()).rejects.toThrow('Network Error');
    });
  });

  describe('getProductGateway', () => {
    it('should get a product by id', async () => {
      const fetchSpy = mockFetchResponse(productDetail);
      const { getProductGateway } = await loadGateway();

      const product = await getProductGateway('1');

      expect(fetchSpy).toHaveBeenCalledWith(
        `${PRODUCTS_API_ENDPOINT}/1`,
        PRODUCTS_OPTIONS,
      );
      expect(product).toStrictEqual(productDetail);
    });

    it('should pass search params in the url', async () => {
      const fetchSpy = mockFetchResponse(productDetail);
      const { getProductGateway } = await loadGateway();

      await getProductGateway('1', { search: 'iphone', limit: 5 });

      expect(fetchSpy).toHaveBeenCalledWith(
        `${PRODUCTS_API_ENDPOINT}/1?search=iphone&limit=5`,
        PRODUCTS_OPTIONS,
      );
    });

    it('should reject when fetch fails', async () => {
      vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network Error'));
      const { getProductGateway } = await loadGateway();

      await expect(getProductGateway('1')).rejects.toThrow('Network Error');
    });
  });
});
