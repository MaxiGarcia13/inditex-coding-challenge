import type { ProductSummariesResponse, ProductSummary } from '@/domain/products';
import { uniqueBy } from '@maxigarcia/js-utils';
import { mapProductImage } from './product-image.adapter';

export function mapProductSummariesResponse(data: ProductSummary[]): ProductSummariesResponse {
  const mappedData = mapPorductsSummaries(data);

  return {
    data: mappedData,
    total: mappedData.length,
  };
}

export function mapPorductsSummaries(data: ProductSummary[]): ProductSummary[] {
  const uniqueData = uniqueBy(data, 'id');
  return uniqueData.map(mapProductSummary);
}

function mapProductSummary(data: ProductSummary): ProductSummary {
  return {
    ...data,
    imageUrl: mapProductImage(data.imageUrl),
  };
}
