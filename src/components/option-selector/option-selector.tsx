import { cn } from '@maxigarcia/js-utils';
import styles from './option-selector.module.css';

export interface OptionSelectorOption<T extends string = string> {
  value: T;
  label: string;
}

export interface OptionSelectorProps<T extends string = string>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'role'> {
  options: OptionSelectorOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  name?: string;
}

export function OptionSelector<T extends string = string>({
  options,
  value,
  onChange,
  className,
  name,
  ...props
}: OptionSelectorProps<T>) {
  return (
    <div
      className={cn(styles.selector, className)}
      role="radiogroup"
      {...props}
    >
      {options.map((option) => {
        const isSelected = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            name={name}
            aria-checked={isSelected}
            className={cn(styles.option, isSelected && styles['option--selected'])}
            onClick={() => onChange?.(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
