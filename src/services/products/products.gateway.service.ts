import type { ProductBase, ProductDetail, ProductsRequest, ProductSummary } from '@/domain/products';
import process from 'node:process';
import { addParamsToUrl } from '@maxigarcia/js-utils';

type ProductsParams = Partial<ProductsRequest & Pick<ProductBase, 'id'>>;

const PRODUCTS_API_ENDPOINT = `${process.env.PRODUCTS_API_URL}/products`;
const PRODUCTS_OPTIONS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.PRODUCTS_API_KEY!,
  },
};

export async function getProductsGateway(params: ProductsParams = {}): Promise<Array<ProductSummary>> {
  const url = addParamsToUrl(`${PRODUCTS_API_ENDPOINT}`, { ...params });

  return fetch(url, PRODUCTS_OPTIONS).then((response) => response.json());
}

export async function getProductGateway(
  id: string,
  params: ProductsParams = {},
): Promise<ProductDetail> {
  const url = addParamsToUrl(`${PRODUCTS_API_ENDPOINT}/${id}`, { ...params });

  return fetch(url, PRODUCTS_OPTIONS).then((response) => response.json());
}
