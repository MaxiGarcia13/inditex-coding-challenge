'use client';

import type { ProductDetail as ProductDetailType } from '@/domain/products';
import { useState } from 'react';
import { OptionSelector } from '@/components/option-selector';
import styles from './product-detail.module.css';

interface ProductDetailProps {
  product: ProductDetailType;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const options = product?.colorOptions ?? [];
  const [selectedOption] = useState<ProductDetailType['colorOptions'][number]>(options[0]);
  const storageOptions = product?.storageOptions ?? [];

  return (
    <div className={styles.detail}>
      <div className={styles.detail__imageContainer}>
        <img
          className={styles.detail__image}
          src={selectedOption?.imageUrl}
          alt={selectedOption?.name}
          height={630}
          width={510}
        />
      </div>

      <div>
        <div className={styles.detail__content}>
          <header className={styles.detail__content__header}>
            <h1 className={styles.detail__content__header__title}>{product.name}</h1>

            <p className={styles.detail__content__header__price}>
              From
              {' '}
              {product.basePrice}
              {' EUR'}
            </p>
          </header>

          <div className={styles.detail__content__storage}>
            <h2 className={styles.detail__content__title}>
              Storage: How much space do you need?
            </h2>

            <OptionSelector
              options={storageOptions.map((option) => ({
                value: option.capacity,
                label: option.capacity,
              }))}
            />
          </div>

          <div className={styles.detail__content__color}>
            <h2 className={styles.detail__content__title}>
              Color. Pick your favourite.
            </h2>

          </div>

        </div>
      </div>
    </div>
  );
}
