import type { SearchResult } from '@/domain/search';
import styles from './search-result-list-item.module.css';

interface SearchResultListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  result: SearchResult;
}

export function SearchResultListItem({ result, ...props }: SearchResultListItemProps) {
  return (
    <li className={styles.item} {...props}>
      <img
        className={styles.item__image}
        src={result.imageUrl}
        alt={result.name}
        width={312}
        height={257}
      />

      <footer className={styles.item__info}>
        <span className={styles.item__info__brand}>{result.brand}</span>

        <div className={styles.item__info__details}>
          <span className={styles.item__info__details__name}>{result.name}</span>
          <span className={styles.item__info__details__price}>{result.basePrice}</span>
        </div>
      </footer>
    </li>
  );
}
