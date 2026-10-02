import type { ProductBase } from '@/domain/products';
import process from 'node:process';
import { BackButton } from '@/components/back-button';
import { ProductForm } from '@/components/products';
import { getProductDetail } from '@/services/products';
import { isHttpError } from '@/utils/http';

interface PageProps {
  params: Promise<Pick<ProductBase, 'id'>>;
}
export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const product = await getProductDetail(id, { baseUrl: process.env.API_URL! });

  if (isHttpError(product)) {
    return null;
  }

  return (
    <>
      <BackButton />
      <ProductForm product={product} />
    </>
  );
}
