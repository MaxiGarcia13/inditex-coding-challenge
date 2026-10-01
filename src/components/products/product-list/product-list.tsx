'use client';

import { useProducts } from '@/hooks/use-products';
import { ProductCard } from '../product-card';
import styles from './product-list.module.css';

export function ProductList() {
  const { data } = useProducts('');

  return (
    <ul className={styles.list}>
      {data.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </ul>
  );
}
