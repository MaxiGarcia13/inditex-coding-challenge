import type { ChangeEvent, InputHTMLAttributes } from 'react';
import { cn, debounce } from '@maxigarcia/js-utils';
import { useRef, useState } from 'react';
import styles from './search-input.module.css';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch: (search: string) => void;
  debounceTime?: number;
  initialValue?: string;
}

const DEBOUNCE_TIME = 500;

export function SearchInput({
  className,
  debounceTime = DEBOUNCE_TIME,
  onSearch,
  initialValue,
  ...props
}: SearchInputProps) {
  const debouncedSearchRef = useRef(debounce(onSearch, debounceTime));
  const [search, setSearch] = useState(initialValue);

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
