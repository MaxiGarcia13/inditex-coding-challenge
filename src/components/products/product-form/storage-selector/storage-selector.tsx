import type { OptionSelectorProps } from '@/components/option-selector';
import type { ProductDetail } from '@/domain/products';
import { OptionSelector } from '@/components/option-selector';
import styles from './storage-selector.module.css';

type StorageOption = ProductDetail['storageOptions'][number];

interface StorageSelectorProps
  extends Omit<OptionSelectorProps, 'options' | 'value' | 'onChange'> {
  options: StorageOption[];
  value?: StorageOption;
  onChange?: (value: StorageOption) => void;
}

export function StorageSelector({ options, value, onChange, ...props }: StorageSelectorProps) {
  return (
    <OptionSelector
      name="storage"
      aria-label="Storage capacity"
      className={styles.selector}
      optionClassName={styles.option}
      value={value?.capacity ?? ''}
      onChange={(value) => {
        onChange?.(options.find((option) => option.capacity === value));
      }}
      options={
        options.map((option) => ({
          value: option.capacity,
          label: option.capacity,
        }))
      }
      {...props}
    />
  );
}
