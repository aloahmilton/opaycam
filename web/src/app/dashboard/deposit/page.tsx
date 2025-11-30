'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { CreditCard, Smartphone, Wallet, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { collect, MeSoMbService, MeSoMbCountry } from '@/lib/payment-gateway';
import styles from './page.module.css';

type DepositMethod = 'card' | 'momo';
type Step = 'select' | 'amount' | 'confirm' | 'processing' | 'success';

export default function DepositPage() {
    const [method, setMethod] = useState<DepositMethod | null>(null);
    const [step, setStep] = useState<Step>('select');
    const [amount, setAmount] = useState('');
    const [phone, setPhone] = useState('');
    const [service, setService] = useState<MeSoMbService>('MTN');
    const [country, setCountry] = useState<MeSoMbCountry>('CM');
    const [error, setError] = useState('');

    const handleMethodSelect = (selected: DepositMethod) => {
        setMethod(selected);
        setStep('amount');
        setError('');
    };

    const handleAmountSubmit = () => {
        if (!amount || parseFloat(amount) < 100) {
            setError('Minimum deposit is 100 XAF');
            return;
        }
        if (method === 'momo' && !phone) {
            setError('Please enter a valid phone number');
            return;
        }
        setStep('confirm');
    };

    const handleConfirm = async () => {
        if (method === 'momo') {
            setStep('processing');
            try {
                const response = await collect({
                    amount: parseFloat(amount),
                    service,
                    payer: phone,
                    country,
                });

                if (response.success) {
                    setStep('success');
                } else {
                    setError(response.message);
                    setStep('amount');
                }
            } catch (err) {
                setError('Transaction failed. Please try again.');
                setStep('amount');
            }
        } else {
            // Card simulation
            setStep('processing');
            setTimeout(() => {
                setStep('success');
            }, 2000);
        }
    };

    return (
        <DashboardLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.pageTitle}>Deposit Money</h1>
                    <p className={styles.pageSubtitle}>Add funds to your OpayCam wallet securely.</p>
                </div>

                <div className={styles.content}>
                    {step === 'select' && (
                        <div className={styles.methodsGrid}>
                            <Card
                                className={styles.methodCard}
                                padding="large"
                                onClick={() => handleMethodSelect('momo')}
                                hover
                            >
                                <div className={`${styles.iconBox} ${styles.orange}`}>
                                    <Smartphone size={32} />
                                </div>
                                <h3 className={styles.methodTitle}>Mobile Money</h3>
                                <p className={styles.methodDesc}>Instant deposit via MTN or Orange Money.</p>
                                <span className={styles.badge}>Most Popular</span>
                            </Card>

                            <Card
                                className={styles.methodCard}
                                padding="large"
                                onClick={() => handleMethodSelect('card')}
                                hover
                            >
                                <div className={`${styles.iconBox} ${styles.blue}`}>
                                    <CreditCard size={32} />
                                </div>
                                <h3 className={styles.methodTitle}>Bank Card</h3>
                                <p className={styles.methodDesc}>Top up using your Visa or Mastercard.</p>
                            </Card>
                        </div>
                    )}

                    {step === 'amount' && (
                        <Card className={styles.formCard} padding="large">
                            <button className={styles.backBtn} onClick={() => setStep('select')}>← Back</button>
                            <h2 className={styles.stepTitle}>
                                {method === 'momo' ? 'Mobile Money Deposit' : 'Card Deposit'}
                            </h2>

                            <div className={styles.formGroup}>
                                <label>Amount (XAF)</label>
                                <Input
                                    type="number"
                                    placeholder="e.g. 5000"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>

                            {method === 'momo' && (
                                <>
                                    <div className={styles.formGroup}>
                                        <label>Country</label>
                                        <div className={styles.serviceGrid}>
                                            <button
                                                className={`${styles.serviceBtn} ${country === 'CM' ? styles.active : ''}`}
                                                onClick={() => setCountry('CM')}
                                            >
                                                🇨🇲 Cameroon
                                            </button>
                                            <button
                                                className={`${styles.serviceBtn} ${country === 'NE' ? styles.active : ''}`}
                                                onClick={() => setCountry('NE')}
                                            >
                                                🇳🇪 Niger
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Service Provider</label>
                                        <div className={styles.serviceGrid}>
                                            <button
                                                className={`${styles.serviceBtn} ${service === 'MTN' ? styles.active : ''}`}
                                                onClick={() => setService('MTN')}
                                            >
                                                MTN Mobile Money
                                            </button>
                                            <button
                                                className={`${styles.serviceBtn} ${service === 'ORANGE' ? styles.active : ''}`}
                                                onClick={() => setService('ORANGE')}
                                            >
                                                Orange Money
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Phone Number</label>
                                        <Input
                                            type="tel"
                                            placeholder="6XX XXX XXX"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                </>
                            )}

                            {error && <div className={styles.error}>{error}</div>}

                            <Button
                                variant="primary"
                                fullWidth
                                onClick={handleAmountSubmit}
                            >
                                Continue <ArrowRight size={16} />
                            </Button>
                        </Card>
                    )}

                    {step === 'confirm' && (
                        <Card className={styles.formCard} padding="large">
                            <button className={styles.backBtn} onClick={() => setStep('amount')}>← Back</button>
                            <h2 className={styles.stepTitle}>Confirm Deposit</h2>

                            <div className={styles.summary}>
                                <div className={styles.summaryRow}>
                                    <span>Amount</span>
                                    <span className={styles.amount}>{parseInt(amount).toLocaleString()} XAF</span>
                                </div>
                                {method === 'momo' && (
                                    <div className={styles.summaryRow}>
                                        <span>Service</span>
                                        <span className={styles.value}>{service} ({phone})</span>
                                    </div>
                                )}
                                <div className={styles.summaryRow}>
                                    <span>Fee</span>
                                    <span>0 XAF</span>
                                </div>
                                <div className={styles.divider}></div>
                                <div className={styles.summaryRow}>
                                    <span>Total to Pay</span>
                                    <span className={styles.total}>{parseInt(amount).toLocaleString()} XAF</span>
                                </div>
                            </div>

                            <div className={styles.infoBox}>
                                <Wallet size={16} />
                                <p>Funds will be added to your Main Wallet immediately after payment.</p>
                            </div>

                            <Button variant="primary" fullWidth onClick={handleConfirm}>
                                Pay Now
                            </Button>
                        </Card>
                    )}

                    {step === 'processing' && (
                        <Card className={styles.centerCard} padding="large">
                            <Loader2 size={48} className={styles.spinner} />
                            <h2 className={styles.processingTitle}>Processing Payment...</h2>
                            <p className={styles.processingDesc}>
                                {method === 'momo'
                                    ? `Please check your phone (${phone}) to approve the transaction.`
                                    : 'Connecting to secure payment gateway...'}
                            </p>
                        </Card>
                    )}

                    {step === 'success' && (
                        <Card className={styles.successCard} padding="large">
                            <div className={styles.successIcon}>
                                <CheckCircle2 size={48} />
                            </div>
                            <h2 className={styles.successTitle}>Deposit Successful!</h2>
                            <p className={styles.successDesc}>
                                Your wallet has been funded with <strong>{parseInt(amount).toLocaleString()} XAF</strong>.
                            </p>
                            <Button variant="primary" onClick={() => window.location.href = '/dashboard'}>
                                Go to Dashboard
                            </Button>
                        </Card>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
