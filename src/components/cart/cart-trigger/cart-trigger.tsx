'use client';

import Link from 'next/link';
import { BagIcon, FilledBagIcon } from '@/components/icons';
import { useProductCart } from '@/stores/product-cart';
import styles from './cart-trigger.module.css';

export function CartTrigger() {
  const { products } = useProductCart();

  const cartItems = products.length;

  return (
    <Link href="/cart" className={styles.link}>
      {
        cartItems > 0
          ? <FilledBagIcon />
          : <BagIcon />
      }

      <span className={styles.link__counter}>{cartItems}</span>
    </Link>
  );
}
