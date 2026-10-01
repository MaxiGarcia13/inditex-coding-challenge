'use client';

import { useNavigation } from '@/hooks/use-navigation';
import { useProducts } from '@/hooks/use-products';
import { ProductCard } from '../product-card';
import styles from './product-list.module.css';

export function ProductList() {
  const { getSearchParam } = useNavigation();

  const { data } = useProducts(getSearchParam('q') ?? '');

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
