import type { HtmlHTMLAttributes } from 'react';
import type { ProductCart } from '@/domain/products';
import { cn } from '@maxigarcia/js-utils';
import { Button } from '@/components/button';
import { ProductImage } from '@/components/products/product-image';
import styles from './cart-list.module.css';

interface ProductCardProps extends HtmlHTMLAttributes<HTMLLIElement> {
  product: ProductCart;
  onRemove: () => void;
}

export function ProductCard({ product, onRemove, className, ...props }: ProductCardProps) {
  return (
    <li className={cn(styles.cart__list__item, className)} {...props}>
      <div className={styles.cart__list__item__image__container}>
        <ProductImage
          className={styles.cart__list__item__image}
          productId={product.id}
          src={product.colorOption.imageUrl}
          alt={product.name}
          width={262}
          height={324}
        />
      </div>
      <div className={styles.cart__list__item__info}>
        <div className={styles.cart__list__item__info__content}>
          <header className={styles.cart__list__item__info__header}>
            <h3 className={styles.cart__list__item__info__text}>{product.name}</h3>
            <p className={styles.cart__list__item__info__text}>
              {`${product.storageOption.capacity} | ${product.colorOption.name}`}
            </p>
          </header>

          <p className={styles.cart__list__item__info__text}>
            {`$${product.storageOption.price} EUR`}
          </p>
        </div>

        <Button
          variant="ghost"
          className={styles.card_list__item__button}
          onClick={onRemove}
        >
          Remove
        </Button>
      </div>
    </li>
  );
}
