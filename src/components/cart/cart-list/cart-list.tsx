'use client';

import { useProductCart } from '@/stores/product-cart';

export function CartList() {
  const { products } = useProductCart();

  return (
    <section className="page-section">
      <h1>Cart List</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </section>
  );
}
