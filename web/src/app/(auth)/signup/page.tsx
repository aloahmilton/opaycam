'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Card from '@/components/common/Card';
import { validateSignupForm } from '@/lib/validation/auth';
import styles from './page.module.css';

export default function SignupPage() {
    const router = useRouter();
    const { t } = useLanguage();
    const { signup, isLoading } = useAuth();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = { fullName, email, phone, password, confirmPassword };
        const validationErrors = validateSignupForm(data);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await signup(data);
            router.push('/');
        } catch (error) {
            setErrors({ general: 'Signup failed. Please try again.' });
        }
    };

    return (
        <div className={styles.container}>
            <Card className={styles.card} padding="large" shadow="large">
                <div className={styles.header}>
                    <h1 className={styles.title}>{t.createAccount}</h1>
                    <p className={styles.subtitle}>Join OpayCam today</p>
                </div>

                {errors.general && (
                    <div className={styles.errorBanner}>{errors.general}</div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input
                        label={t.fullNamePlaceholder}
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        error={errors.fullName}
                        fullWidth
                        placeholder="John Doe"
                    />

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
                        label={t.phonePlaceholder}
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        error={errors.phone}
                        fullWidth
                        placeholder="+237 6XX XXX XXX"
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

                    <Input
                        label={t.confirmPasswordPlaceholder}
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={errors.confirmPassword}
                        fullWidth
                        placeholder="••••••••"
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        fullWidth
                        loading={isLoading}
                    >
                        {t.signUp}
                    </Button>
                </form>

                <div className={styles.footer}>
                    <p className={styles.footerText}>
                        {t.hasAccount}
                        <Link href="/login" className={styles.link}>
                            {t.login}
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}
