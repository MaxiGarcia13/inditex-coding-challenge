import type { ProductBase, ProductsRequest } from '@/domain/products';
import process from 'node:process';
import { buildUrl } from '@/utils/url';

type ProductsParams = Partial<ProductsRequest & Pick<ProductBase, 'id'>>;

export async function getProductsGateway(params: ProductsParams) {
  const url = getUrl(params);

  return await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.PRODUCTS_API_KEY!,
    },
  });
}

function getUrl(params: ProductsParams) {
  const baseUrl = `${process.env.PRODUCTS_API_URL}/products`;

  if (params.id) {
    const { id, ...rest } = params;
    return buildUrl(`${baseUrl}/${id}`, { ...rest });
  }

  return buildUrl(baseUrl, { ...params });
}
