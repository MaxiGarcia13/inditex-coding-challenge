import type { Metadata } from 'next';
import { ProductList, ProductSearch } from '@/components/products';
import { APP_METADATA } from '@/constants/metadata';

export default function Page() {
  return (
    <>
      <ProductSearch />
      <ProductList />
    </>
  );
}

export const metadata: Metadata = APP_METADATA;
