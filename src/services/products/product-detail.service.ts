import type { ProductDetail } from '@/domain/products';
import { mapHttpError } from '@/adapters/http-error';
import { getProductsUrl } from './products-url.utils';

interface GetProductOptions extends RequestInit {
  baseUrl?: string;
}

export async function getProductDetail(
  id: string,
  { baseUrl, ...fetchOptions }: GetProductOptions = {},
): Promise<ProductDetail> {
  try {
    const url = getProductsUrl(baseUrl);
    const response = await fetch(`${url}/${id}`, fetchOptions);

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
