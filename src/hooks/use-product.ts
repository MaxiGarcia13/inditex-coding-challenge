import type { ProductDetail } from '@/domain/products';
import { useQuery } from '@tanstack/react-query';
import { useDeferredValue } from 'react';
import { getProduct } from '@/services/products/product.service';

export function useProduct(id: string) {
  const {
    data: results = null,
    isLoading,
    error,
  } = useQuery<ProductDetail>({
    queryKey: ['products', id],
    queryFn: () => getProduct(id),
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes,
    placeholderData: (previousData) => ({ id, colorOptions: [], ...previousData } as ProductDetail),
  });

  const data = useDeferredValue(results);

  return {
    data,
    isLoading,
    error,
  };
}
