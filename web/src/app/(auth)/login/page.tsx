'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Card from '@/components/common/Card';
import { validateLoginForm } from '@/lib/validation/auth';
import styles from './page.module.css';

export default function LoginPage() {
    const router = useRouter();
    const { t } = useLanguage();
    const { login, isLoading } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const credentials = { email, password };
        const validationErrors = validateLoginForm(credentials);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await login(credentials);
            router.push('/');
        } catch (error) {
            setErrors({ general: 'Login failed. Please check your credentials.' });
        }
    };

    return (
        <div className={styles.container}>
            <Card className={styles.card} padding="large" shadow="large">
                <div className={styles.header}>
                    <h1 className={styles.title}>{t.welcomeBack}</h1>
                    <p className={styles.subtitle}>Sign in to your account</p>
                </div>

                {errors.general && (
                    <div className={styles.errorBanner}>{errors.general}</div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input
                        label={t.emailPlaceholder}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors.email}
                        fullWidth
                        placeholder="you@example.com"
                    />

                    <Input
                        label={t.passwordPlaceholder}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={errors.password}
                        fullWidth
                        placeholder="••••••••"
                    />

                    <Link href="/forgot-password" className={styles.forgotLink}>
                        {t.forgotPassword}
                    </Link>

                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        fullWidth
                        loading={isLoading}
                    >
                        {t.login}
                    </Button>
                </form>

                <div className={styles.footer}>
                    <p className={styles.footerText}>
                        {t.noAccount}
                        <Link href="/signup" className={styles.link}>
                            {t.signUp}
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}
