import type { ProductCart } from '@/domain/products';
import { useProductCart } from '@/stores/product-cart';
import styles from './cart-list.module.css';
import { ProductCard } from './product-card';

interface CartListProps {
  products: Array<ProductCart>;
}

export function CartList({ products }: CartListProps) {
  const removeProduct = useProductCart((state) => state.removeProduct);

  return (
    <ul className={styles.cart__list}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onRemove={() => removeProduct(product)}
        />
      ))}
    </ul>
  );
}
