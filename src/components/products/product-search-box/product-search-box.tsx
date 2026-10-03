'use client';

import { SearchInput } from '@/components/search-input';
import { useProducts } from '@/hooks/use-products';
import { useSearchParam } from '@/hooks/use-search-param';
import styles from './product-search-box.module.css';

export function ProductSearchBox() {
  const { setSearchParam, deleteSearchParam, getSearchParam } = useSearchParam();
  const { total } = useProducts();

  const handleSearch = (search: string) => {
    const value = search.trim();

    if (value) {
      setSearchParam('q', value);
    } else {
      deleteSearchParam('q');
    }
  };

  return (
    <div className={styles.search}>
      <SearchInput
        placeholder="Search for a smartphone..."
        aria-label="Search for a smartphone"
        onSearch={handleSearch}
        initialValue={getSearchParam('q') ?? ''}
      />
      <span className={styles.search__results} aria-label={`${total} results`}>
        {total}
        {' '}
        results
      </span>
    </div>
  );
}
