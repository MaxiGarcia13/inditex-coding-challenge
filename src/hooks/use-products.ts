import type { ProductsResponse } from '@/domain/products';
import { useQuery } from '@tanstack/react-query';
import { useDeferredValue } from 'react';
import { getProducts } from '@/services/products';
import { useNavigation } from './use-navigation';

export function useProducts() {
  const { getSearchParam } = useNavigation();

  const search = getSearchParam('q') ?? '';

  const {
    data: results = { data: [], total: 0 },
    isLoading,
    error,
  } = useQuery<ProductsResponse>({
    queryKey: ['products', search],
    queryFn: () => getProducts({
      limit: 20,
      offset: 0,
      search,
    }),
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes,
    placeholderData: (previousData) => previousData,
  });

  const { data, total } = useDeferredValue(results);

  return {
    data,
    total,
    isLoading,
    error,
  };
}
