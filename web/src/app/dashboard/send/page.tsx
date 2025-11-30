'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useSecurity } from '@/contexts/SecurityContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import PINInput from '@/components/security/PINInput';
import OTPInput from '@/components/security/OTPInput';
import { assessTransactionRisk, checkTransactionLimits, DEFAULT_LIMITS } from '@/lib/security';
import { formatCurrency } from '@/lib/mockData';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';
import styles from './page.module.css';

type Step = 'details' | 'confirm' | 'pin' | 'otp' | 'success';

export default function SendMoneyPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { isPinSet, verifyTransactionPIN, initiate2FA, verify2FA } = useSecurity();

    const [step, setStep] = useState<Step>('details');
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [note, setNote] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [riskLevel, setRiskLevel] = useState<string>('low');

    // Check if PIN is set on mount
    if (!isPinSet && step !== 'details') {
        return (
            <DashboardLayout>
                <Card padding="large" className={styles.centerCard}>
                    <h2>Security Alert 🔒</h2>
                    <p>You need to set up a Transaction PIN before sending money.</p>
                    <Button onClick={() => router.push('/dashboard/security/pin-setup')}>
                        Set Up PIN
                    </Button>
                </Card>
            </DashboardLayout>
        );
    }

    const handleDetailsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            setError('Please enter a valid amount');
            return;
        }

        if (!recipient) {
            setError('Please enter a recipient');
            return;
        }

        // Check limits
        const limits = user?.isVerified ? DEFAULT_LIMITS.verified : DEFAULT_LIMITS.unverified;
        const limitCheck = checkTransactionLimits(numAmount, 0, 0, 0, limits); // Mock totals for now

        if (!limitCheck.allowed) {
            setError(limitCheck.reason || 'Transaction limit exceeded');
            return;
        }

        // Assess risk
        const assessment = assessTransactionRisk(numAmount, !!user?.isVerified);
        setRiskLevel(assessment.level);

        setStep('confirm');
    };

    const handleConfirm = async () => {
        setStep('pin');
    };

    const handlePinVerify = async (pin: string) => {
        setLoading(true);
        try {
            const isValid = await verifyTransactionPIN(pin);
            if (isValid) {
                // If high risk, require OTP
                if (riskLevel === 'high' || riskLevel === 'critical') {
                    await initiate2FA('sms');
                    setStep('otp');
                } else {
                    processTransaction();
                }
            } else {
                setError('Incorrect PIN');
            }
        } catch (err) {
            setError('Verification failed');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpVerify = async (code: string) => {
        const isValid = await verify2FA(code);
        if (isValid) {
            processTransaction();
            return true;
        }
        return false;
    };

    const processTransaction = async () => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStep('success');
        setLoading(false);
    };

    return (
        <DashboardLayout>
            <div className={styles.container}>
                <h1 className={styles.pageTitle}>Send Money</h1>

                <Card className={styles.card} padding="large">
                    {step === 'details' && (
                        <form onSubmit={handleDetailsSubmit} className={styles.form}>
                            <Input
                                label="Recipient (Phone or Email)"
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                                placeholder="e.g. +237 6XX XXX XXX"
                                required
                            />
                            <Input
                                label="Amount (XAF)"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                required
                            />
                            <Input
                                label="Note (Optional)"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="What's this for?"
                            />
                            {error && <div className={styles.error}>{error}</div>}
                            <Button type="submit" variant="primary" fullWidth>
                                Continue
                            </Button>
                        </form>
                    )}

                    {step === 'confirm' && (
                        <div className={styles.confirmStep}>
                            <h2 className={styles.stepTitle}>Confirm Transaction</h2>
                            <div className={styles.summary}>
                                <div className={styles.summaryRow}>
                                    <span>To</span>
                                    <span className={styles.summaryValue}>{recipient}</span>
                                </div>
                                <div className={styles.summaryRow}>
                                    <span>Amount</span>
                                    <span className={styles.summaryAmount}>{formatCurrency(parseFloat(amount))}</span>
                                </div>
                                <div className={styles.summaryRow}>
                                    <span>Fee</span>
                                    <span className={styles.summaryValue}>0 XAF</span>
                                </div>
                                <div className={styles.summaryTotal}>
                                    <span>Total</span>
                                    <span>{formatCurrency(parseFloat(amount))}</span>
                                </div>
                            </div>
                            <div className={styles.actions}>
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useSecurity } from '@/contexts/SecurityContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import PINInput from '@/components/security/PINInput';
import OTPInput from '@/components/security/OTPInput';
import { assessTransactionRisk, checkTransactionLimits, DEFAULT_LIMITS } from '@/lib/security';
import { formatCurrency } from '@/lib/mockData';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';
import styles from './page.module.css';

type Step = 'details' | 'confirm' | 'pin' | 'otp' | 'success';

export default function SendMoneyPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { isPinSet, verifyTransactionPIN, initiate2FA, verify2FA } = useSecurity();

    const [step, setStep] = useState<Step>('details');
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [note, setNote] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [riskLevel, setRiskLevel] = useState<string>('low');

    // Check if PIN is set on mount
    if (!isPinSet && step !== 'details') {
        return (
            <DashboardLayout>
                <Card padding="large" className={styles.centerCard}>
                    <h2>Security Alert 🔒</h2>
                    <p>You need to set up a Transaction PIN before sending money.</p>
                    <Button onClick={() => router.push('/dashboard/security/pin-setup')}>
                        Set Up PIN
                    </Button>
                </Card>
            </DashboardLayout>
        );
    }

    const handleDetailsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            setError('Please enter a valid amount');
            return;
        }

        if (!recipient) {
            setError('Please enter a recipient');
            return;
        }

        // Check limits
        const limits = user?.isVerified ? DEFAULT_LIMITS.verified : DEFAULT_LIMITS.unverified;
        const limitCheck = checkTransactionLimits(numAmount, 0, 0, 0, limits); // Mock totals for now

        if (!limitCheck.allowed) {
            setError(limitCheck.reason || 'Transaction limit exceeded');
            return;
        }

        // Assess risk
        const assessment = assessTransactionRisk(numAmount, !!user?.isVerified);
        setRiskLevel(assessment.level);

        setStep('confirm');
    };

    const handleConfirm = async () => {
        setStep('pin');
    };

    const handlePinVerify = async (pin: string) => {
        setLoading(true);
        try {
            const isValid = await verifyTransactionPIN(pin);
            if (isValid) {
                // If high risk, require OTP
                if (riskLevel === 'high' || riskLevel === 'critical') {
                    await initiate2FA('sms');
                    setStep('otp');
                } else {
                    processTransaction();
                }
            } else {
                setError('Incorrect PIN');
            }
        } catch (err) {
            setError('Verification failed');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpVerify = async (code: string) => {
        const isValid = await verify2FA(code);
        if (isValid) {
            processTransaction();
            return true;
        }
        return false;
    };

    const processTransaction = async () => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStep('success');
        setLoading(false);
    };

    return (
        <DashboardLayout>
            <div className={styles.container}>
                <h1 className={styles.pageTitle}>Send Money</h1>

                <Card className={styles.card} padding="large">
                    {step === 'details' && (
                        <form onSubmit={handleDetailsSubmit} className={styles.form}>
                            <Input
                                label="Recipient (Phone or Email)"
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                                placeholder="e.g. +237 6XX XXX XXX"
                                required
                            />
                            <Input
                                label="Amount (XAF)"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                required
                            />
                            <Input
                                label="Note (Optional)"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="What's this for?"
                            />
                            {error && <div className={styles.error}>{error}</div>}
                            <Button type="submit" variant="primary" fullWidth>
                                Continue
                            </Button>
                        </form>
                    )}

                    {step === 'confirm' && (
                        <div className={styles.confirmStep}>
                            <h2 className={styles.stepTitle}>Confirm Transaction</h2>
                            <div className={styles.summary}>
                                <div className={styles.summaryRow}>
                                    <span>To</span>
                                    <span className={styles.summaryValue}>{recipient}</span>
                                </div>
                                <div className={styles.summaryRow}>
                                    <span>Amount</span>
                                    <span className={styles.summaryAmount}>{formatCurrency(parseFloat(amount))}</span>
                                </div>
                                <div className={styles.summaryRow}>
                                    <span>Fee</span>
                                    <span className={styles.summaryValue}>0 XAF</span>
                                </div>
                                <div className={styles.summaryTotal}>
                                    <span>Total</span>
                                    <span>{formatCurrency(parseFloat(amount))}</span>
                                </div>
                            </div>
                            <div className={styles.actions}>
                                <Button variant="ghost" onClick={() => setStep('details')}>Back</Button>
                                <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
                            </div>
                        </div>
                    )}

                    {step === 'pin' && (
                        <div className={styles.securityStep}>
                            <h2 className={styles.stepTitle}>Enter Transaction PIN</h2>
                            <p className={styles.stepSubtitle}>Please enter your 4-digit PIN to authorize this payment.</p>
                            <PINInput
                                length={4}
                                onComplete={handlePinVerify}
                                error={error}
                                loading={loading}
                            />
                        </div>
                    )}

                    {step === 'success' && (
                        <div className={styles.successStep}>
                            <div className={styles.successIcon}>
                                <CheckCircle2 size={64} color="var(--color-success)" />
                            </div>
                            <h2 className={styles.successTitle}>Transfer Successful!</h2>
                            <p className={styles.successText}>
                                You successfully sent <strong>{formatCurrency(parseFloat(amount))}</strong> to <strong>{recipient}</strong>.
                            </p>
                            <div className={styles.actions}>
                                <Button variant="outline" onClick={() => router.push('/dashboard')}>
                                    Back to Dashboard
                                </Button>
                                <Button variant="primary" onClick={() => {
                                    setStep('details');
                                    setAmount('');
                                    setRecipient('');
                                    setNote('');
                                }}>
                                    Send Another
                                </Button>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </DashboardLayout>
    );
}
