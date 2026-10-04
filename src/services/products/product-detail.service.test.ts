import type { HttpError } from '@/domain/http';
import type { ProductDetail } from '@/domain/products';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PRODUCTS_API_ENDPOINT } from './consts';
import { getProductDetail } from './product-detail.service';

const productId = '1';

const successResponse: ProductDetail = {
  id: productId,
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

function mockFetchResponse(partial: Partial<Response> & { jsonData?: unknown }) {
  const { jsonData, ...response } = partial;

  return vi.spyOn(globalThis, 'fetch').mockResolvedValue({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: () => Promise.resolve(jsonData),
    ...response,
  } as unknown as Response);
}

describe('getProductDetail', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should get a product detail', async () => {
    const fetchSpy = mockFetchResponse({ jsonData: successResponse });

    const product = await getProductDetail(productId);

    expect(fetchSpy).toHaveBeenCalledWith(
      `${PRODUCTS_API_ENDPOINT}/${productId}`,
      {},
    );
    expect(product).toStrictEqual(successResponse);
  });

  it('should use baseUrl when provided', async () => {
    const baseUrl = 'http://localhost:3000';
    const fetchSpy = mockFetchResponse({ jsonData: successResponse });

    await getProductDetail(productId, { baseUrl });

    expect(fetchSpy).toHaveBeenCalledWith(
      `${baseUrl}${PRODUCTS_API_ENDPOINT}/${productId}`,
      {},
    );
  });

  it('should forward fetch options', async () => {
    const fetchSpy = mockFetchResponse({ jsonData: successResponse });
    const headers = { Cookie: 'app_access_token=test-token' };

    await getProductDetail(productId, { headers });

    expect(fetchSpy).toHaveBeenCalledWith(
      `${PRODUCTS_API_ENDPOINT}/${productId}`,
      { headers },
    );
  });

  it('should throw an HttpError when the response is not ok', async () => {
    mockFetchResponse({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(getProductDetail(productId)).rejects.toMatchObject({
      status: 404,
      message: 'Not Found',
    } satisfies Partial<HttpError>);
  });

  it('should throw an HttpError when fetch rejects with a network error', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network Error'));

    await expect(getProductDetail(productId)).rejects.toEqual({
      error: 'unknown',
      message: 'Network Error',
    } satisfies HttpError);
  });

  it('should rethrow an HttpError when fetch rejects with one', async () => {
    const error: HttpError = {
      status: 503,
      error: 'service unavailable',
      message: 'Service Unavailable',
    };

    vi.spyOn(globalThis, 'fetch').mockRejectedValue(error);

    await expect(getProductDetail(productId)).rejects.toEqual(error);
  });
});
