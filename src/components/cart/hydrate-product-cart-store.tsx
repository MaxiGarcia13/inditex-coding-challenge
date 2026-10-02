'use client';

import { useEffect } from 'react';
import { useProductCart } from '@/stores/product-cart';

export function HydrateProductCartStore() {
  const { hydrate } = useProductCart();

  useEffect(() => {
    hydrate();
  }, []);

  return null;
}
