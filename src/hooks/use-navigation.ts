import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type SearchParamKey = 'q';
interface NavigateToOptions {
  keepSearchParams?: boolean;
}

export function useNavigation() {
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

  const navigateTo = (path: string, { keepSearchParams = false }: NavigateToOptions = {}) => {
    let destination = path;

    if (keepSearchParams) {
      destination = `${path}?${searchParams.toString()}`;
    }

    router.push(destination);
  };

  const navigateBack = () => {
    router.back();
  };

  return {
    navigateTo,
    navigateBack,
    getSearchParam,
    setSearchParam,
    deleteSearchParam,
  };
}
