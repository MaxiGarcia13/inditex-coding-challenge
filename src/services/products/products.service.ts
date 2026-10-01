import type { HttpError } from '@/domain/http';
import type { ProductsRequest, ProductsResponse } from '@/domain/products';
import { mapHttpError } from '@/adapters/http-error';
import { mapProductsResponse } from '@/adapters/products';
import { buildUrl } from '@/utils/url';

export async function getProducts(
  params: ProductsRequest = {},
): Promise<ProductsResponse['data'] | HttpError | Error> {
  try {
    const url = buildUrl('/api/v1/products', { ...params });

    const response = await fetch(url);

    return mapProductsResponse(await response.json());
  } catch (error) {
    throw mapHttpError(error);
  }
}
