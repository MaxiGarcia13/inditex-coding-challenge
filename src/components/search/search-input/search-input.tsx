import type { ChangeEvent, InputHTMLAttributes } from 'react';
import { cn, debounce } from '@maxigarcia/js-utils';
import { useRef, useState } from 'react';
import styles from './search-input.module.css';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch: (search: string) => void;
}

const DEBOUNCE_TIME = 800;

export function SearchInput({ className, onSearch, ...props }: SearchInputProps) {
  const debouncedSearchRef = useRef(debounce(onSearch, DEBOUNCE_TIME));
  const [search, setSearch] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearchRef.current(e.target.value);
  };

  return (
    <input
      role="search"
      className={cn(styles.input, className)}
      value={search}
      onChange={handleChange}
      type="search"
      {...props}
    />
  );
}
