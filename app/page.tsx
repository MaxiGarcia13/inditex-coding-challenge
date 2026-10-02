import type { Metadata } from 'next';
import { ProductSearchBox, ProductSearchResults } from '@/components/products';
import { APP_METADATA } from '@/constants/metadata';

export default function Page() {
  return (
    <>
      <ProductSearchBox />
      <ProductSearchResults />
    </>
  );
}

export const metadata: Metadata = APP_METADATA;
