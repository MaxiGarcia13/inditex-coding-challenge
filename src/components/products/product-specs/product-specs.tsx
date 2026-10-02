import type { ProductDetail } from '@/domain/products';
import { cn } from '@maxigarcia/js-utils';
import styles from './product-specs.module.css';

interface ProductSpecificationsProps {
  product: ProductDetail;
}

type TranslationKey = keyof ProductDetail['specs'];

export function ProductSpecs({ product }: ProductSpecificationsProps) {
  const getKeyTranslation = (key: string) => {
    const translations: Partial<Record<TranslationKey, string>> = {
      screenRefreshRate: 'Screen Refresh Rate',
      mainCamera: 'Main Camera',
      selfieCamera: 'Selfie Camera',
    };

    return translations[key as keyof typeof translations] || key;
  };

  return (
    <section className={cn('page-section', styles.specs)}>
      <h2 className={styles.specs__title}>Specifications</h2>

      <ul className={styles.specs__list}>
        {
          Object.entries(product.specs).map(([key, value]) => (
            <li key={key} className={styles.specs__list__item}>
              <span className={styles.specs__list__item__key}>{getKeyTranslation(key)}</span>
              <span className={styles.specs__list__item__value}>{value}</span>
            </li>
          ))
        }
      </ul>
    </section>
  );
}
