import { PRODUCTS_API_ENDPOINT } from './consts';

export function getProductsUrl(baseUrl?: string) {
  if (!baseUrl) {
    return PRODUCTS_API_ENDPOINT;
  }

  return `${baseUrl}${PRODUCTS_API_ENDPOINT}`;
}
