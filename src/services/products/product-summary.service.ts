import type { ProductsRequest, ProductSummariesResponse } from '@/domain/products';
import { mapHttpError } from '@/adapters/http-error';
import { buildUrl } from '@/utils/url';
import { PRODUCTS_API_ENDPOINT } from './consts';

export async function getProductSummaries(
  params: ProductsRequest = {},
): Promise<ProductSummariesResponse> {
  try {
    const url = buildUrl(PRODUCTS_API_ENDPOINT, { ...params });

    const response = await fetch(url);

    return response.json();
  } catch (error) {
    throw mapHttpError(error);
  }
}
