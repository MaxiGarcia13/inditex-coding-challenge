'use client';

import Link from 'next/link';
import { BagIcon, FilledBagIcon } from '@/components/icons';
import { useProductCart } from '@/stores/product-cart';
import styles from './cart-trigger.module.css';

export function CartTrigger() {
  const totalQuantity = useProductCart((state) => state.totalQuantity);

  return (
    <Link href="/cart" className={styles.trigger}>
      {
        totalQuantity > 0
          ? <FilledBagIcon />
          : <BagIcon />
      }

      <span className={styles.trigger__counter}>{totalQuantity}</span>
    </Link>
  );
}
