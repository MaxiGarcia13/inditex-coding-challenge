'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type SearchParamKey = 'q';

export function useSearchParam() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setSearchParam = (key: SearchParamKey, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const deleteSearchParam = (key: SearchParamKey) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const getSearchParam = (key: SearchParamKey) => {
    return searchParams.get(key);
  };

  return {
    getSearchParam,
    setSearchParam,
    deleteSearchParam,
  };
}
