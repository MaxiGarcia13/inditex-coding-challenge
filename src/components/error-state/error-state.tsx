import { cn } from '@maxigarcia/js-utils';
import styles from './error-state.module.css';

interface ErrorStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'Please try again or go back to the product list.',
  className,
}: ErrorStateProps) {
  return (
    <section
      className={cn(styles.error, className)}
      role="alert"
      aria-labelledby="error-state-title"
    >
      <h1 id="error-state-title" className={styles.error__title}>
        {title}
      </h1>
      <p className={styles.error__description}>{description}</p>
    </section>
  );
}
