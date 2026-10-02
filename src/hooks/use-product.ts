import type { Product } from '@/domain/products';
import { useQuery } from '@tanstack/react-query';
import { useDeferredValue } from 'react';
import { getProduct } from '@/services/products/product.service';

export function useProduct(id: string) {
  const {
    data: results = null,
    isLoading,
    error,
  } = useQuery<Product>({
    queryKey: ['products', id],
    queryFn: () => getProduct(id),
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes,
    placeholderData: (previousData) => previousData,
  });

  const data = useDeferredValue(results);

  return {
    data,
    isLoading,
    error,
  };
}
