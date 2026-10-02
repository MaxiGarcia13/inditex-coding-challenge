'use client';

import { useState } from 'react';
import { BagIcon, FilledBagIcon } from '@/components/icons';
import { useProductCart } from '@/stores/product-cart';
import styles from './cart-trigger.module.css';

export function CartTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const { products } = useProductCart();

  const cartItems = products.length;

  return (
    <button onClick={() => setIsOpen(!isOpen)} className={styles.button}>
      {
        cartItems > 0
          ? <FilledBagIcon />
          : <BagIcon />
      }

      <span className={styles.counter}>{cartItems}</span>
    </button>
  );
}
