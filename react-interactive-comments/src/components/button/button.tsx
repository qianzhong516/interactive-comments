import React from 'react';
import styles from './button.module.css';
import classnames from 'classnames';

type ButtonProps = {
  disabled?: boolean;
  variant: 'primary' | 'secondary' | 'caution';
  onClick?(): void;
  className?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
};

export const Button = ({
  disabled,
  variant,
  onClick,
  className,
  icon,
  children,
}: ButtonProps) => (
  <button
    className={classnames(
      styles.button,
      { [styles.primary]: variant === 'primary' },
      { [styles.secondary]: variant === 'secondary' },
      { [styles.disabled]: disabled },
      { [styles.caution]: variant === 'caution' },
      className
    )}
    onClick={onClick}
    disabled={disabled}
  >
    {icon && <div className={styles.icon}>{icon}</div>}
    {children}
  </button>
);
