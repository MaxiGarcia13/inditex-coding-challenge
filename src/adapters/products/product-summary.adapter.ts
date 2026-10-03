import type { ProductSummariesResponse, ProductSummary } from '@/domain/products';
import { uniqueBy } from '@maxigarcia/js-utils';

export function mapProductSummariesResponse(data: ProductSummary[]): ProductSummariesResponse {
  const uniqueData = uniqueBy(data, 'id');

  return {
    data: uniqueData,
    total: uniqueData.length,
  };
}
