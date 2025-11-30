import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    fullWidth?: boolean;
    icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, fullWidth, icon, className = '', ...props }, ref) => {
        const containerClasses = [
            styles.container,
            fullWidth ? styles.fullWidth : '',
        ]
            .filter(Boolean)
            .join(' ');

        const inputClasses = [
            styles.input,
            error ? styles.error : '',
            icon ? styles.withIcon : '',
            className,
        ]
            .filter(Boolean)
            .join(' ');

        return (
            <div className={containerClasses}>
                {label && (
                    <label className={styles.label}>
                        {label}
                    </label>
                )}
                <div className={styles.inputWrapper}>
                    {icon && <div className={styles.icon}>{icon}</div>}
                    <input
                        ref={ref}
                        className={inputClasses}
                        {...props}
                    />
                </div>
                {error && <span className={styles.errorText}>{error}</span>}
                {!error && helperText && (
                    <span className={styles.helperText}>{helperText}</span>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
