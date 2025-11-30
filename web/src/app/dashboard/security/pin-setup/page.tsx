'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSecurity } from '@/contexts/SecurityContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import PINInput from '@/components/security/PINInput';
import styles from './page.module.css';

export default function PINSetupPage() {
    const router = useRouter();
    const { setupPIN } = useSecurity();
    const [step, setStep] = useState<'create' | 'confirm' | 'success'>('create');
    const [firstPin, setFirstPin] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreate = (pin: string) => {
        setFirstPin(pin);
        setStep('confirm');
        setError('');
    };

    const handleConfirm = async (pin: string) => {
        if (pin !== firstPin) {
            setError('PINs do not match. Please try again.');
            setFirstPin('');
            setStep('create');
            return;
        }

        setLoading(true);
        try {
            await setupPIN(pin);
            setStep('success');
        } catch (err) {
            setError('Failed to set PIN. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className={styles.container}>
                <Card className={styles.card} padding="large" shadow="large">
                    {step === 'create' && (
                        <div className={styles.step}>
                            <h1 className={styles.title}>Create Transaction PIN</h1>
                            <p className={styles.subtitle}>
                                Set a 4-digit PIN to secure your transactions.
                            </p>
                            <div className={styles.pinWrapper}>
                                <PINInput
                                    length={4}
                                    onComplete={handleCreate}
                                    error={error}
                                />
                            </div>
                        </div>
                    )}

                    {step === 'confirm' && (
                        <div className={styles.step}>
                            <h1 className={styles.title}>Confirm PIN</h1>
                            <p className={styles.subtitle}>
                                Re-enter your 4-digit PIN to confirm.
                            </p>
                            <div className={styles.pinWrapper}>
                                <PINInput
                                    length={4}
                                    onComplete={handleConfirm}
                                    loading={loading}
                                />
                            </div>
                            <Button
                                variant="ghost"
                                onClick={() => setStep('create')}
                                className={styles.backBtn}
                            >
                                Back
                            </Button>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className={styles.success}>
                            <div className={styles.icon}>✅</div>
                            <h1 className={styles.title}>PIN Set Successfully!</h1>
                            <p className={styles.subtitle}>
                                Your account is now secured. You'll use this PIN for all future transactions.
                            </p>
                            <Button
                                variant="primary"
                                size="large"
                                fullWidth
                                onClick={() => router.push('/dashboard')}
                            >
                                Go to Dashboard
                            </Button>
                        </div>
                    )}
                </Card>
            </div>
        </DashboardLayout>
    );
}
