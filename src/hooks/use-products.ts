import type { ProductSummariesResponse } from '@/domain/products';
import { useQuery } from '@tanstack/react-query';
import { useDeferredValue } from 'react';
import { getProductSummaries } from '@/services/products';
import { useSearchParam } from './use-search-param';

export function useProducts() {
  const { getSearchParam } = useSearchParam();

  const search = getSearchParam('q') ?? '';

  const {
    data: results = { data: [], total: 0 },
    isLoading,
    error,
  } = useQuery<ProductSummariesResponse>({
    queryKey: ['products', search],
    queryFn: () => getProductSummaries({
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
