import type { Product } from '@/domain/products';
import styles from './product-card.module.css';

interface ProductCardProps extends React.HTMLAttributes<HTMLLIElement> {
  product: Product;
}

export function ProductCard({ product, ...props }: ProductCardProps) {
  return (
    <li className={styles.item} {...props}>
      <div className={styles.item__image_container}>
        <img
          className={styles.item__image}
          src={product.imageUrl}
          alt={product.name}
          width={312}
          height={257}
        />
      </div>

      <footer className={styles.item__info}>
        <span className={styles.item__info__brand}>{product.brand}</span>

        <div className={styles.item__info__details}>
          <span className={styles.item__info__details__name}>{product.name}</span>
          <span className={styles.item__info__details__price}>{product.basePrice}</span>
        </div>
      </footer>
    </li>
  );
}
