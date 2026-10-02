import type { ProductSummary } from '@/domain/products';
import { cn } from '@maxigarcia/js-utils';
import { ProductCard } from '../product-card';
import styles from './product-list.module.css';

interface ProductListProps extends React.HTMLAttributes<HTMLUListElement> {
  products: Array<ProductSummary>;
  direction?: 'vertical' | 'horizontal';
}

export function ProductList({ products, className, direction = 'vertical', ...props }: ProductListProps) {
  return (
    <ul className={cn(styles.list, styles[`list--${direction}`], className)} {...props}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </ul>
  );
}
