import type { ProductsRequest, ProductSummariesResponse } from '@/domain/products';
import { addParamsToUrl } from '@maxigarcia/js-utils';
import { mapHttpError } from '@/adapters/http-error';
import { getProductsUrl } from './products-url.utils';

interface GetProductSummariesOptions extends RequestInit {
  baseUrl?: string;
}

export async function getProductSummaries(
  params: ProductsRequest = {},
  { baseUrl, ...fetchOptions }: GetProductSummariesOptions = {},
): Promise<ProductSummariesResponse> {
  try {
    const url = addParamsToUrl(getProductsUrl(baseUrl), { ...params });

    const response = await fetch(url, fetchOptions);

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
