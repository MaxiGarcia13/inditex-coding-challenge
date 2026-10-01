'use client';

import { SearchInput } from '../search-input';
import styles from './product-search.module.css';

export function ProductSearch() {
  const totalResults = 100;

  const handleSearch = (search: string) => {
    console.warn(search);
  };

  return (
    <div className={styles.container}>
      <SearchInput
        placeholder="Search for a smartphone..."
        aria-label="Search for a smartphone"
        onSearch={handleSearch}
      />
      <span className={styles.results} aria-label={`${totalResults} results`}>
        {totalResults}
        {' '}
        results
      </span>
    </div>
  );
}
