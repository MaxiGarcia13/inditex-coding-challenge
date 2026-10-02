import type { ProductSummary } from '@/domain/products';
import { cn } from '@maxigarcia/js-utils';
import { ViewTransition } from 'react';
import { useNavigation } from '@/hooks/use-navigation';
import { ProductImage } from '../product-image';
import styles from './product-card.module.css';

interface ProductCardProps extends React.HTMLAttributes<HTMLLIElement> {
  product: ProductSummary;
  variant?: 'grid' | 'carousel';
}

export function ProductCard({
  product,
  variant = 'grid',
  className,
  ...props
}: ProductCardProps) {
  const { navigateTo } = useNavigation();

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    navigateTo(`/products/${product.id}`);

    event.stopPropagation();
  };

  return (
    <li
      className={
        cn(
          styles.card,
          styles[`card--${variant}`],
          className,
        )
      }
      {...props}
      onClick={handleClick}
    >
      <ViewTransition name={`product-${product.id}`}>
        <div className={styles.card__inner}>
          <div className={styles.card__image_container}>
            <ProductImage
              productId={product.id}
              className={styles.card__image}
              src={product.imageUrl}
              alt={product.name}
              width={312}
              height={230}
            />
          </div>

          <footer className={styles.card__info}>
            <span className={styles.card__info__brand}>{product.brand}</span>

            <div className={styles.card__info__details}>
              <span className={styles.card__info__details__name}>{product.name}</span>
              <span className={styles.card__info__details__price}>{`${product.basePrice} EUR`}</span>
            </div>
          </footer>
        </div>
      </ViewTransition>
    </li>
  );
}
