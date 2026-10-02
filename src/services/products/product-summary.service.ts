import type { ProductsRequest, ProductSummariesResponse } from '@/domain/products';
import { addParamsToUrl } from '@maxigarcia/js-utils';
import { mapHttpError } from '@/adapters/http-error';

import { PRODUCTS_API_ENDPOINT } from './consts';

export async function getProductSummaries(
  params: ProductsRequest = {},
): Promise<ProductSummariesResponse> {
  try {
    const url = addParamsToUrl(PRODUCTS_API_ENDPOINT, { ...params });

    const response = await fetch(url);

    if (!response.ok) {
      throw mapHttpError({
        status: response.status,
        message: response.statusText,
      });
    }

    return response.json();
  } catch (error) {
    throw mapHttpError(error);
  }
}
