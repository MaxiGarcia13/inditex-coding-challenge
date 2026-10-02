import type { ImgHTMLAttributes } from 'react';
import { ViewTransition } from 'react';

interface ProductImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  productId: string;
}

export function ProductImage({ productId, ...props }: ProductImageProps) {
  return (
    <ViewTransition name={`product-${productId}-image`}>
      <img {...props} />
    </ViewTransition>
  );
}
