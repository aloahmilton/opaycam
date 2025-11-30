'use client';

import { useState } from 'react';
import styles from './PINInput.module.css';

interface PINInputProps {
    length?: number;
    onComplete: (pin: string) => void;
    error?: string;
    loading?: boolean;
}

export default function PINInput({
    length = 4,
    onComplete,
    error,
    loading = false
}: PINInputProps) {
    const [pin, setPin] = useState<string[]>(Array(length).fill(''));
    const [activeIndex, setActiveIndex] = useState(0);

    const handleChange = (index: number, value: string) => {
        // Only allow digits
        if (value && !/^\d$/.test(value)) return;

        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        // Auto-focus next input
        if (value && index < length - 1) {
            setActiveIndex(index + 1);
            const nextInput = document.getElementById(`pin-${index + 1}`);
            nextInput?.focus();
        }

        // Call onComplete when all digits entered
        if (newPin.every(digit => digit !== '') && newPin.join('').length === length) {
            onComplete(newPin.join(''));
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !pin[index] && index > 0) {
            setActiveIndex(index - 1);
            const prevInput = document.getElementById(`pin-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
        const newPin = Array(length).fill('');

        for (let i = 0; i < pastedData.length; i++) {
            newPin[i] = pastedData[i];
        }

        setPin(newPin);

        if (pastedData.length === length) {
            onComplete(pastedData);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.pinInputs}>
                {pin.map((digit, index) => (
                    <input
                        key={index}
                        id={`pin-${index}`}
                        type="password"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        onFocus={() => setActiveIndex(index)}
                        className={`${styles.pinInput} ${error ? styles.error : ''}`}
                        disabled={loading}
                        autoFocus={index === 0}
                    />
                ))}
            </div>
            {error && <div className={styles.errorText}>{error}</div>}
        </div>
    );
}
