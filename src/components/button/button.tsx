import { cn } from '@maxigarcia/js-utils';
import styles from './button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={
        cn(
          styles.button,
          className,
          variant && styles[`button--${variant}`],
        )
      }
      {...props}
    />
  );
}
