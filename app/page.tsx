import type { Metadata } from 'next';
import { ProductSearch, ProductSearchResults } from '@/components/products';
import { APP_METADATA } from '@/constants/metadata';

export default function Page() {
  return (
    <>
      <ProductSearch />
      <ProductSearchResults />
    </>
  );
}

export const metadata: Metadata = APP_METADATA;
