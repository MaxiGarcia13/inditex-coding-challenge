'use client';

import { useState } from 'react';
import { BagIcon, FilledBagIcon } from '@/components/icons';
import styles from './cart-trigger.module.css';

export function CartTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = 0;
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
