import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'feature' | 'prompt' | 'info' | 'source';
  className?: string;
  onClick?: () => void;
}

export function Card({ children, variant = 'default', className = '', onClick }: CardProps) {
  const classNames = [
    styles.card,
    variant === 'feature' ? styles.feature : '',
    variant === 'prompt' ? styles.prompt : '',
    variant === 'info' ? styles.info : '',
    variant === 'source' ? styles.source : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={classNames} onClick={onClick}>
      {children}
    </article>
  );
}