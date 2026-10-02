'use client';

import { useProduct } from '@/hooks/use-product';
import styles from './product-detaul.module.css';

export function ProductDetail({ id }: { id: string }) {
  const { data } = useProduct(id);

  return (
    <div className={styles.detail}>
      <img
        className={styles.detail__image}
        src={data?.imageUrl}
        alt={data?.name}
        height={630}
        width={510}
      />

      <div className={styles.content}>
        <h1>{data?.name}</h1>
      </div>
    </div>
  );
}
