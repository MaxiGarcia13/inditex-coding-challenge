'use client';

import type { ProductDetail } from '@/domain/products';
import { cn } from '@maxigarcia/js-utils';
import { useState } from 'react';
import { Button } from '@/components/button';
import { canBeAddedToCart } from '@/domain/products';
import { ProductImage } from '../product-image';
import { ColorSelector } from './color-selector';
import styles from './product-form.module.css';
import { StorageSelector } from './storage-selector';

interface ProductFormProps {
  product: ProductDetail;
}

export function ProductForm({ product }: ProductFormProps) {
  const [selectedColor, setSelectedColor] = useState(product.colorOptions[0]);
  const [selectedStorage, setSelectedStorage] = useState(null);

  const isFormValid = canBeAddedToCart({ storage: selectedStorage, color: selectedColor });

  return (
    <div className={cn('page-section', styles.form)}>
      <div className={styles['form__image-Container']}>
        <ProductImage
          productId={product.id}
          className={styles.form__image}
          src={selectedColor?.imageUrl}
          alt={selectedColor?.name}
          height={630}
          width={510}
        />

      </div>

      <div>
        <div className={styles.form__content}>
          <header className={styles.form__content__header}>
            <h1 className={styles.form__content__header__title}>{product.name}</h1>

            <p className={styles.form__content__header__price}>
              {
                selectedStorage
                  ? `${selectedStorage.price} EUR`
                  : `From ${product.basePrice} EUR`
              }
            </p>
          </header>

          <div className={styles.form__content__storage}>
            <h2 className={styles.form__content__title}>
              Storage: How much space do you need?
            </h2>

            <StorageSelector
              value={selectedStorage}
              options={product.storageOptions}
              onChange={setSelectedStorage}
            />
          </div>

          <div className={styles.form__content__color}>
            <h2 className={styles.form__content__title}>
              Color. Pick your favourite.
            </h2>

            <ColorSelector
              value={selectedColor}
              options={product.colorOptions}
              onChange={setSelectedColor}
            />
          </div>

          <Button variant="primary" disabled={!isFormValid}>Add to cart</Button>
        </div>
      </div>
    </div>
  );
}
