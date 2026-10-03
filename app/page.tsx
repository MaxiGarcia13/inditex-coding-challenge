import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ProductSearchBox, ProductSearchResults } from '@/components/products';
import { APP_METADATA } from '@/constants/metadata';

export default function Page() {
  return (
    <Suspense>
      <ProductSearchBox />
      <ProductSearchResults />
    </Suspense>
  );
}

export const metadata: Metadata = APP_METADATA;
