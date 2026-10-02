'use client';

import { useProducts } from '@/hooks/use-products';
import { ProductList } from './product-list';

export function ProductSearchResults() {
  const { data } = useProducts();

  return (
    <ProductList products={data} />
  );
}
