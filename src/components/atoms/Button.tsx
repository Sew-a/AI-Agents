'use client';

import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'default';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  'data-copy-text'?: string;
}

export function Button({
  children,
  variant = 'default',
  onClick,
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  const classNames = [
    styles.btn,
    variant === 'primary' ? styles.primary : '',
    variant === 'ghost' ? styles.ghost : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classNames} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}