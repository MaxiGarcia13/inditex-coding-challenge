'use client';

import type { ProductDetail } from '@/domain/products';
import { cn } from '@maxigarcia/js-utils';
import { ProductList } from '../product-list';
import styles from './similar-products.module.css';

interface SimilarProductsProps {
  product: ProductDetail;
}

export function SimilarProducts({ product }: SimilarProductsProps) {
  return (
    <section
      className={cn('page-section', styles.similar)}
      data-test-id="similar-products"
    >
      <h2 className={styles.similar__title}>Similar Products</h2>

      <div className={styles.similar__scroller}>
        <ProductList
          products={product.similarProducts}
          variant="carousel"
        />
      </div>
    </section>
  );
}
