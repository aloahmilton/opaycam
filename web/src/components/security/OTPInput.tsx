'use client';

import { useState, useEffect } from 'react';
import Button from '../common/Button';
import styles from './OTPInput.module.css';

interface OTPInputProps {
    length?: number;
    onVerify: (otp: string) => Promise<boolean>;
    onResend: () => Promise<boolean>;
    expirySeconds?: number;
}

export default function OTPInput({
    length = 6,
    onVerify,
    onResend,
    expirySeconds = 300 // 5 minutes
}: OTPInputProps) {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(expirySeconds);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [timeLeft]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, length);
        setOtp(value);
        setError('');

        // Auto-submit when complete
        if (value.length === length) {
            handleSubmit(value);
        }
    };

    const handleSubmit = async (code: string = otp) => {
        if (code.length !== length) {
            setError(`Please enter all ${length} digits`);
            return;
        }

        setLoading(true);
        setError('');

        try {
            const valid = await onVerify(code);
            if (!valid) {
                setError('Invalid OTP code. Please try again.');
                setOtp('');
            }
        } catch (err) {
            setError('Verification failed. Please try again.');
            setOtp('');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setLoading(true);
        setError('');
        try {
            await onResend();
            setTimeLeft(expirySeconds);
            setCanResend(false);
            setOtp('');
        } catch (err) {
            setError('Failed to resend OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className={styles.container}>
            <div className={styles.otpInputWrapper}>
                <input
                    type="text"
                    inputMode="numeric"
                    value={otp}
                    onChange={handleChange}
                    maxLength={length}
                    placeholder={`Enter ${length}-digit code`}
                    className={`${styles.otpInput} ${error ? styles.error : ''}`}
                    disabled={loading}
                    autoFocus
                />
            </div>

            {error && <div className={styles.errorText}>{error}</div>}

            <div className={styles.footer}>
                {timeLeft > 0 ? (
                    <div className={styles.timer}>
                        Code expires in: <span className={styles.timeValue}>{formatTime(timeLeft)}</span>
                    </div>
                ) : (
                    <div className={styles.expired}>Code has expired</div>
                )}

                {canResend && (
                    <Button
                        variant="ghost"
                        size="small"
                        onClick={handleResend}
                        loading={loading}
                    >
                        Resend Code
                    </Button>
                )}
            </div>
        </div>
    );
}
