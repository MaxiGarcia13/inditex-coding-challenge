import type { ProductDetail } from '@/domain/products';
import { mapHttpError } from '@/adapters/http-error';
import { PRODUCTS_API_ENDPOINT } from './consts';

interface GetProductOptions {
  baseUrl?: string;
}

export async function getProductDetail(
  id: string,
  options: GetProductOptions = {},
): Promise<ProductDetail> {
  try {
    const url = getUrl(options);
    const response = await fetch(`${url}/${id}`);

    if (!response.ok) {
      throw mapHttpError({
        status: response.status,
        message: response.statusText,
      });
    }

    return await response.json();
  } catch (error) {
    throw mapHttpError(error);
  }
}

function getUrl(options?: GetProductOptions) {
  if (!options?.baseUrl) {
    return PRODUCTS_API_ENDPOINT;
  }

  return `${options.baseUrl}/${PRODUCTS_API_ENDPOINT}`;
}
