import { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
    children: ReactNode;
    className?: string;
    padding?: 'none' | 'small' | 'medium' | 'large';
    shadow?: 'none' | 'small' | 'medium' | 'large';
    hover?: boolean;
    onClick?: () => void;
}

export default function Card({
    children,
    className = '',
    padding = 'medium',
    shadow = 'small',
    hover = false,
    onClick,
}: CardProps) {
    const classes = [
        styles.card,
        styles[`padding-${padding}`],
        styles[`shadow-${shadow}`],
        hover ? styles.hover : '',
        onClick ? styles.clickable : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={classes} onClick={onClick}>
            {children}
        </div>
    );
}
