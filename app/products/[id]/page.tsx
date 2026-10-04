import type { Metadata } from 'next';
import type { ProductBase } from '@/domain/products';
import { cache } from 'react';
import { mapProductDetailResponse } from '@/adapters/products';
import { BackButton } from '@/components/back-button';
import { ErrorState } from '@/components/error-state';
import { ProductForm, ProductSpecs, SimilarProducts } from '@/components/products';
import { APP_METADATA } from '@/constants/metadata';
import { getProductGateway } from '@/services/products/products.gateway.service';
import { isHttpError } from '@/utils/http';

interface PageProps {
  params: Promise<Pick<ProductBase, 'id'>>;
}

const loadProduct = cache(async (id: string) =>
  getProductGateway(id).then(mapProductDetailResponse),
);

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const product = await loadProduct(id);

  if (isHttpError(product)) {
    return (
      <>
        <BackButton />
        <ErrorState
          title="Product not found"
          description={
            product.message
            ?? 'The smartphone you are looking for does not exist or is no longer available.'
          }
        />
      </>
    );
  }

  return (
    <>
      <BackButton />
      <ProductForm product={product} />
      <ProductSpecs product={product} />
      <SimilarProducts product={product} />
    </>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  const product = await loadProduct(id);

  if (isHttpError(product)) {
    return { title: 'Product not found' };
  }

  const image = product.colorOptions[0]?.imageUrl;
  const title = `${product.name} - ${APP_METADATA.title}`;

  return {
    title,
    description: product.description,
    openGraph: {
      title,
      description: product.description,
      images: image ? [image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: product.description,
      images: image ? [image] : [],
    },
  };
}
