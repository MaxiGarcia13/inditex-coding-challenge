'use client';

import { cn } from '@maxigarcia/js-utils';
import { useNavigation } from '@/hooks/use-navigation';
import { ChevronLeftIcon } from '../icons/chevron-left';
import styles from './back-button.module.css';

interface BackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export function BackButton({ label = 'Back', ...props }: BackButtonProps) {
  const { goBack } = useNavigation();

  return (
    <div className={styles.back}>
      <button
        onClick={goBack}
        className={cn(props.className, styles.back__button)}
        data-test-id="back-button"
        {...props}
      >
        <ChevronLeftIcon />
        {label}
      </button>
    </div>
  );
}
