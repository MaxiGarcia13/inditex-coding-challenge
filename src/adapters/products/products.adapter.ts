import type { ProductsResponse } from '@/domain/products';

export function mapProductsResponse(response: ProductsResponse): ProductsResponse['data'] {
  return response.data;
}
