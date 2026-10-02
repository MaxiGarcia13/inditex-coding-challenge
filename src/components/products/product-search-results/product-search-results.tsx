'use client';

import { useProducts } from '@/hooks/use-products';
import { ProductList } from '../product-list';
import styles from './product-search-results.module.css';

export function ProductSearchResults() {
  const { data } = useProducts();

  return (
    <ProductList products={data} className={styles.list} />
  );
}
