'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Card from '@/components/common/Card';
import { validateEmail } from '@/lib/validation/auth';
import styles from './page.module.css';

export default function ForgotPasswordPage() {
    const { t } = useLanguage();

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailError = validateEmail(email);
        if (emailError) {
            setError(emailError);
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // TODO: Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsSuccess(true);
        } catch (err) {
            setError('Failed to send reset link. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className={styles.container}>
                <Card className={styles.card} padding="large" shadow="large">
                    <div className={styles.successIcon}>✅</div>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Check Your Email</h1>
                        <p className={styles.subtitle}>
                            We've sent a password reset link to <strong>{email}</strong>
                        </p>
                    </div>
                    <Link href="/login">
                        <Button variant="primary" size="large" fullWidth>
                            {t.backToLogin}
                        </Button>
                    </Link>
                </Card>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Card className={styles.card} padding="large" shadow="large">
                <div className={styles.header}>
                    <h1 className={styles.title}>{t.forgotPassword}</h1>
                    <p className={styles.subtitle}>
                        Enter your email and we'll send you a link to reset your password
                    </p>
                </div>

                {error && (
                    <div className={styles.errorBanner}>{error}</div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input
                        label={t.emailPlaceholder}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        placeholder="you@example.com"
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        fullWidth
                        loading={isLoading}
                    >
                        Send Reset Link
                    </Button>
                </form>

                <div className={styles.footer}>
                    <Link href="/login" className={styles.backLink}>
                        ← {t.backToLogin}
                    </Link>
                </div>
            </Card>
        </div>
    );
}
