import type { ReactNode } from 'react';
import { cn } from '@maxigarcia/js-utils';
import styles from './option-selector.module.css';

export interface OptionSelectorOption<T extends string = string> {
  value: T;
  label: string;
}

export interface OptionSelectorProps<
  T extends string = string,
  O extends OptionSelectorOption<T> = OptionSelectorOption<T>,
> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'role'> {
  options: O[];
  value?: T;
  onChange?: (value: T) => void;
  name?: string;
  optionClassName?: string;
  renderOption?: (option: O, isSelected: boolean) => ReactNode;
}

export function OptionSelector<
  T extends string = string,
  O extends OptionSelectorOption<T> = OptionSelectorOption<T>,
>({
  options,
  value,
  onChange,
  className,
  name,
  optionClassName,
  renderOption,
  ...props
}: OptionSelectorProps<T, O>) {
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
            aria-label={option.label}
            className={cn(
              styles.option,
              optionClassName,
              isSelected && styles['option--selected'],
            )}
            onClick={() => onChange?.(option.value)}
          >
            {renderOption ? renderOption(option, isSelected) : option.label}
          </button>
        );
      })}
    </div>
  );
}
