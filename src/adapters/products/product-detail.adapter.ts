import type { ProductDetail } from '@/domain/products';
import { uniqueBy } from '@maxigarcia/js-utils';

export function mapProductDetailResponse(response: ProductDetail): ProductDetail {
  return {
    ...response,
    similarProducts: uniqueBy(response.similarProducts, 'id'),
  };
}
