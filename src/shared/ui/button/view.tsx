import { forwardRef } from 'react';
import styles from './button.module.css';
import { cn } from '@/shared/lib/cn';

export const Button = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    return <button ref={ref} className={cn(styles.button, className)} {...props} />;
  },
);
