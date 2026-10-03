'use client';

import { useRouter } from 'next/navigation';

interface NavigateToOptions {
  keepSearchParams?: boolean;
}

export function useNavigation() {
  const router = useRouter();

  const navigateTo = (path: string, { keepSearchParams = false }: NavigateToOptions = {}) => {
    let destination = path;

    if (keepSearchParams && typeof window !== 'undefined') {
      destination = `${path}${window.location.search}`;
    }

    router.push(destination);
  };

  const goBack = () => {
    router.back();
  };

  return {
    navigateTo,
    goBack,
  };
}
