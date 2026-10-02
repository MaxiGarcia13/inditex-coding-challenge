import type { Metadata } from 'next';
import { CartList } from '@/components/cart/cart-list';
import { APP_METADATA } from '@/constants/metadata';

export default function CartPage() {
  return (
    <>
      <CartList />
    </>
  );
}

const title = `Cart - ${APP_METADATA.title}`;
const description = 'Your shopping cart';

export const metadata: Metadata = {
  ...APP_METADATA,
  title,
  description,
  openGraph: {
    ...APP_METADATA.openGraph,
    title,
    description,
  },
  twitter: {
    ...APP_METADATA.twitter,
    title,
    description,
  },
};
