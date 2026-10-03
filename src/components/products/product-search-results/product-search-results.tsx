'use client';

import { ErrorState } from '@/components/error-state';
import { useProducts } from '@/hooks/use-products';
import { isHttpError } from '@/utils/http';
import { ProductList } from '../product-list';
import styles from './product-search-results.module.css';

export function ProductSearchResults() {
  const { data, error } = useProducts();

  if (error) {
    return (
      <ErrorState
        title="Unable to load products"
        description={
          isHttpError(error) && error.message
            ? error.message
            : 'Something went wrong while loading smartphones. Please try again.'
        }
      />
    );
  }

  return (
    <ProductList products={data} className={styles.list} />
  );
}
