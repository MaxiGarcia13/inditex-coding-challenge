import type { ProductDetail } from '@/domain/products';
import { OptionSelector } from '@/components/option-selector';
import styles from './color-selector.module.css';

type ColorOption = ProductDetail['colorOptions'][number];

interface ColorSelectorProps {
  options: ColorOption[];
  value?: ColorOption;
  onChange?: (value: ColorOption) => void;
}

export function ColorSelector({ options, value, onChange }: ColorSelectorProps) {
  return (
    <div className={styles.color}>
      <OptionSelector
        aria-label="Color"
        className={styles.color__selector}
        optionClassName={styles.color__option}
        name="color"
        value={value.name}
        onChange={(value) => onChange?.(options.find((option) => option.name === value))}
        options={options.map((option) => ({
          value: option.name,
          label: option.name,
          hexCode: option.hexCode,
        }))}
        renderOption={(option) => (
          <span
            className={styles.color__swatch}
            style={{ backgroundColor: option.hexCode }}
            aria-hidden
          />
        )}
      />
      <span className={styles.color__label}>{value?.name}</span>
    </div>
  );
}
