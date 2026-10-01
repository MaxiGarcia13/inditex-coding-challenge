import type { ProductsRequest, ProductsResponse } from '@/domain/products';
import { buildUrl } from '@/utils/url';

export async function getProducts(request: ProductsRequest): Promise<ProductsResponse> {
  const url = buildUrl('/api/v1/products', {
    search: request.search,
    limit: request.limit,
    offset: request.offset,
  });

  const response = await fetch(url);

  return response.json();
}
