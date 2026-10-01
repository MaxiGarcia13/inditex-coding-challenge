'use client';

import { ViewTransition } from 'react';
import { useProducts } from '@/hooks/use-products';
import { ProductCard } from '../product-card';
import styles from './product-list.module.css';

export function ProductList() {
  const { data } = useProducts();

  return (
    <ul className={styles.list}>
      {data.map((product) => (
        <ViewTransition
          key={product.id}
          name={`product-${product.id}`}
        >
          <ProductCard product={product} />
        </ViewTransition>
      ))}
    </ul>
  );
}
