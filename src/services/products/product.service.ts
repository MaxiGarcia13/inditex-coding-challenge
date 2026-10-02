import type { Product } from '@/domain/products';
import { mapHttpError } from '@/adapters/http-error';
import { mapProductResponse } from '@/adapters/products';
import { PRODUCTS_API_ENDPOINT } from './consts';

export async function getProduct(
  id: string,
): Promise<Product> {
  try {
    const response = await fetch(`${PRODUCTS_API_ENDPOINT}/${id}`);

    return mapProductResponse(await response.json());
  } catch (error) {
    throw mapHttpError(error);
  }
}
