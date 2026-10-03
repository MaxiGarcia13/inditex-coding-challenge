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
    <li className={cn(styles.item, className)} {...props}>
      <div className={styles.item__media}>
        <ProductImage
          className={styles.item__image}
          productId={product.id}
          src={product.colorOption.imageUrl}
          alt={product.name}
        />
      </div>
      <div className={styles.item__body}>
        <div className={styles.item__details}>
          <header className={styles.item__header}>
            <h3 className={styles.item__text}>{product.name}</h3>
            <p className={styles.item__text}>
              {`${product.storageOption.capacity} | ${product.colorOption.name}`}
            </p>
          </header>

          <p className={styles.item__text}>
            {`${product.storageOption.price} EUR`}
          </p>

          {
            product.quantity > 1 && (
              <p className={styles.item__text}>
                {`Quantity ${product.quantity}`}
              </p>
            )
          }
        </div>

        <Button
          variant="ghost"
          className={styles.item__remove}
          onClick={onRemove}
          aria-label={`Remove ${product.name} from cart`}
        >
          Remove
        </Button>

      </div>
    </li>
  );
}
