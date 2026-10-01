import type { Product } from '@/domain/products';
import { useNavigation } from '@/hooks/use-navigation';
import styles from './product-card.module.css';

interface ProductCardProps extends React.HTMLAttributes<HTMLLIElement> {
  product: Product;
}

export function ProductCard({ product, ...props }: ProductCardProps) {
  const { navigateTo } = useNavigation();

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    navigateTo(`/products/${product.id}`);

    event.stopPropagation();
  };

  return (
    <li className={styles.card} {...props} onClick={handleClick}>
      <div className={styles.card__image_container}>
        <img
          className={styles.card__image}
          src={product.imageUrl}
          alt={product.name}
          width={312}
          height={257}
        />
      </div>

      <footer className={styles.card__info}>
        <span className={styles.card__info__brand}>{product.brand}</span>

        <div className={styles.card__info__details}>
          <span className={styles.card__info__details__name}>{product.name}</span>
          <span className={styles.card__info__details__price}>{product.basePrice}</span>
        </div>
      </footer>
    </li>
  );
}
