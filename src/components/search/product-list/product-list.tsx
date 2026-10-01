'use client';

import type { Product } from '@/domain/products';
import { ProductCard } from '../product-card';
import styles from './product-list.module.css';

const FAKE_PRODUCTS: Product[] = [
  {
    id: '1',
    brand: 'Apple',
    name: 'iPhone 12',
    basePrice: 909,
    imageUrl: 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020_big.jpg.large.jpg',
  },
  {
    id: '2',
    brand: 'Apple',
    name: 'iPhone 12',
    basePrice: 909,
    imageUrl: 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020_big.jpg.large.jpg',
  },
  {
    id: '3',
    brand: 'Apple',
    name: 'iPhone 12',
    basePrice: 909,
    imageUrl: 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020_big.jpg.large.jpg',
  },
  {
    id: '4',
    brand: 'Apple',
    name: 'iPhone 12',
    basePrice: 909,
    imageUrl: 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020_big.jpg.large.jpg',
  },
  {
    id: '5',
    brand: 'Apple',
    name: 'iPhone 12',
    basePrice: 909,
    imageUrl: 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020_big.jpg.large.jpg',
  },
];

export function ProductList() {
  return (
    <ul className={styles.list}>
      {FAKE_PRODUCTS.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
}
