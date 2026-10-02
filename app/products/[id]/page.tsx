import type { Product } from '@/domain';
import { BackButton } from '@/components/back-button';
import { ProductDetail } from '@/components/products/product-detail';

export default async function Page({ params }: { params: Promise<Pick<Product, 'id'>> }) {
  const { id } = await params;

  return (
    <>
      <BackButton />
      <ProductDetail id={id} />
    </>
  );
}
