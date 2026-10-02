import type { HttpError } from '@/domain/http';
import type { ProductSummariesResponse } from '@/domain/products';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PRODUCTS_API_ENDPOINT } from './consts';
import { getProductSummaries } from './product-summary.service';

const data: ProductSummariesResponse['data'] = [
  {
    id: '1',
    brand: 'Brand 1',
    name: 'Product 1',
    basePrice: 100,
    imageUrl: 'https://via.placeholder.com/150',
  },
];

const successResponse: ProductSummariesResponse = {
  data,
  total: data.length,
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

describe('getProductSummaries', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should get product summaries', async () => {
    const fetchSpy = mockFetchResponse({ jsonData: successResponse });

    const products = await getProductSummaries();

    expect(fetchSpy).toHaveBeenCalledWith(PRODUCTS_API_ENDPOINT);
    expect(products).toStrictEqual(successResponse);
  });

  it('should pass search params in the url', async () => {
    const fetchSpy = mockFetchResponse({ jsonData: successResponse });

    await getProductSummaries({ search: 'iphone', limit: 10, offset: 20 });

    expect(fetchSpy).toHaveBeenCalledWith(
      `${PRODUCTS_API_ENDPOINT}?search=iphone&limit=10&offset=20`,
    );
  });

  it('should throw an HttpError when the response is not ok', async () => {
    mockFetchResponse({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(getProductSummaries()).rejects.toMatchObject({
      status: 500,
      message: 'Internal Server Error',
    } satisfies Partial<HttpError>);
  });

  it('should throw an HttpError when fetch rejects with a network error', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network Error'));

    await expect(getProductSummaries()).rejects.toEqual({
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

    await expect(getProductSummaries()).rejects.toEqual(error);
  });
});
