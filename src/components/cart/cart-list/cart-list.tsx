'use client';

import { cn } from '@maxigarcia/js-utils';
import { useProductCart } from '@/stores/product-cart';
import styles from './cart-list.module.css';
import { ProductCard } from './product-card';

export function CartList() {
  const { products, removeProduct } = useProductCart();

  return (
    <section className={cn('page-section', styles.cart)}>
      <h1 className={styles.cart__title}>{`Cart (${products.length})`}</h1>

      <ul className={styles.cart__list}>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} onRemove={() => removeProduct(product)} />
          </li>
        ))}
      </ul>
    </section>
  );
}
