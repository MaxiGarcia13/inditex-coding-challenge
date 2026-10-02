import type { ProductsRequest, ProductsResponse } from '@/domain/products';
import { mapHttpError } from '@/adapters/http-error';
import { mapProductsResponse } from '@/adapters/products';
import { buildUrl } from '@/utils/url';
import { PRODUCTS_API_ENDPOINT } from './consts';

export async function getProducts(
  params: ProductsRequest = {},
): Promise<ProductsResponse> {
  try {
    const url = buildUrl(PRODUCTS_API_ENDPOINT, { ...params });

    const response = await fetch(url);

    return mapProductsResponse(await response.json());
  } catch (error) {
    throw mapHttpError(error);
  }
}
