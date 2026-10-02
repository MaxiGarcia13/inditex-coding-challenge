import type { ProductsResponse } from '@/domain/products';
import { mapProductResponse } from './product.adapter';

export function mapProductsResponse(response: ProductsResponse): ProductsResponse {
  return {
    ...response,
    data: response.data.map(mapProductResponse),
  };
}
