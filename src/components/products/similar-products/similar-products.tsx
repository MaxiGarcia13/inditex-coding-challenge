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
    <section className={cn('page-section', styles.list)}>
      <h2 className={styles.list__title}>Similar Products</h2>

      <div className={styles.list__container}>
        <ProductList
          products={product.similarProducts}
          variant="carousel"
        />
      </div>
    </section>
  );
}
