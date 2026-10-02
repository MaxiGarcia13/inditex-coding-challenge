'use client';

import { cn } from '@maxigarcia/js-utils';
import { useNavigation } from '@/hooks/use-navigation';
import { useProductCart } from '@/stores/product-cart';
import { Button } from '../button';
import { CartList } from './cart-list';
import styles from './cart.module.css';

export function Cart() {
  const products = useProductCart((state) => state.products);
  const { goBack } = useNavigation();

  return (
    <section className={cn('page-section', styles.cart)}>
      <div className={styles.cart__content}>
        <h1 className={styles.cart__title}>{`Cart (${products.length})`}</h1>

        <CartList products={products} />
      </div>

      <footer className={styles.cart__footer}>
        <Button
          variant="secondary"
          className={styles.cart__footer__button__back}
          onClick={() => goBack()}
        >
          Continue shopping
        </Button>

        <Button
          variant="primary"
          className={styles.cart__footer__button__pay}
        >
          Pay
        </Button>
      </footer>
    </section>
  );
}
