import type { ProductSummary } from '@/domain/products';
import { ViewTransition } from 'react';
import { ProductCard } from '../product-card';
import styles from './product-list.module.css';

interface ProductListProps {
  products: Array<ProductSummary>;
}

export function ProductList({ products }: ProductListProps) {
  return (
    <ul className={styles.list}>
      {products.map((product) => (
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
