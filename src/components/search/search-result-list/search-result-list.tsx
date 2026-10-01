'use client';

import type { SearchResult } from '@/modules/search';
import { SearchResultListItem } from '../search-result-list-item';
import styles from './search-result-list.module.css';

const FAKE_SEARCH_RESULTS: SearchResult[] = [
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

export function SearchResultList() {
  return (
    <ul className={styles.list}>
      {FAKE_SEARCH_RESULTS.map((result) => (
        <SearchResultListItem key={result.id} result={result} />
      ))}
    </ul>
  );
}
