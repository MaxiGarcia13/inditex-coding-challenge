import type { ProductsResponse } from '@/domain/products';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/services/products';
import { useNavigation } from './use-navigation';

export function useProducts() {
  const { getSearchParam } = useNavigation();

  const search = getSearchParam('q') ?? '';

  const {
    data: { data, total } = { data: [], total: 0 },
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
    placeholderData: {
      data: [],
      total: 0,
    },
  });

  return {
    data,
    total,
    isLoading,
    error,
  };
}
