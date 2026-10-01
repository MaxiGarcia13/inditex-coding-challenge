import { CartTrigger } from '../cart/cart-trigger';
import { LogoIcon } from '../icons';
import styles from './app-header.module.css';

export function AppHeader() {
  return (
    <header className={styles.header}>
      <LogoIcon />
      <CartTrigger />
    </header>
  );
}
