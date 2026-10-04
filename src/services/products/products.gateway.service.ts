import type { ProductBase, ProductDetail, ProductsRequest, ProductSummary } from '@/domain/products';
import process from 'node:process';
import { addParamsToUrl } from '@maxigarcia/js-utils';
import { mapHttpError } from '@/adapters/http-error';

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

  try {
    const response = await fetch(url, PRODUCTS_OPTIONS);

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
