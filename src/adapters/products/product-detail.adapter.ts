import type { ProductColorOption, ProductDetail } from '@/domain/products';
import { mapProductImage } from './product-image.adapter';
import { mapPorductsSummaries } from './product-summary.adapter';

export function mapProductDetailResponse(response: ProductDetail): ProductDetail {
  return {
    ...response,
    similarProducts: mapPorductsSummaries(response.similarProducts),
    colorOptions: response.colorOptions.map(mapProductColorOption),
  };
}

function mapProductColorOption(colorOption: ProductColorOption): ProductColorOption {
  return {
    ...colorOption,
    imageUrl: mapProductImage(colorOption.imageUrl),
  };
}
