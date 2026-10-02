'use client';

import { useNavigation } from '@/hooks/use-navigation';
import { ChevronLeftIcon } from '../icons/chevron-left';
import styles from './back-button.module.css';

interface BackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export function BackButton({ label = 'Back', ...props }: BackButtonProps) {
  const { goBack } = useNavigation();

  return (
    <div className={styles.container}>
      <button onClick={goBack} {...props} className={styles.button}>
        <ChevronLeftIcon />
        {label}
      </button>
    </div>
  );
}
