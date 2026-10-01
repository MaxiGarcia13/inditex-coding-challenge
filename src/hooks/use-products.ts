import type { ProductsResponse } from '@/domain/products';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/services/products';

export function useProducts(search: string) {
  const { data: { data, total }, isLoading, error } = useQuery<ProductsResponse>({
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
