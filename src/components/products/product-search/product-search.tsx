'use client';

import { SearchInput } from '@/components/search-input';
import { useNavigation } from '@/hooks/use-navigation';
import { useProducts } from '@/hooks/use-products';
import styles from './product-search.module.css';

export function ProductSearch() {
  const { setSearchParam, deleteSearchParam, getSearchParam } = useNavigation();
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
    <div className={styles.container}>
      <SearchInput
        placeholder="Search for a smartphone..."
        aria-label="Search for a smartphone"
        onSearch={handleSearch}
        initialValue={getSearchParam('q') ?? ''}
      />
      <span className={styles.results} aria-label={`${total} results`}>
        {total}
        {' '}
        results
      </span>
    </div>
  );
}
