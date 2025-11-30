'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { Building2, MapPin, ArrowRight, CheckCircle2, AlertCircle, Smartphone, Loader2 } from 'lucide-react';
import { deposit, MeSoMbService, MeSoMbCountry } from '@/lib/payment-gateway';
import styles from './page.module.css';

type WithdrawMethod = 'bank' | 'agent' | 'momo';
type Step = 'select' | 'details' | 'confirm' | 'processing' | 'success';

export default function WithdrawPage() {
    const [method, setMethod] = useState<WithdrawMethod | null>(null);
    const [step, setStep] = useState<Step>('select');
    const [amount, setAmount] = useState('');
    const [account, setAccount] = useState('');
    const [phone, setPhone] = useState('');
    const [service, setService] = useState<MeSoMbService>('MTN');
    const [country, setCountry] = useState<MeSoMbCountry>('CM');
    const [error, setError] = useState('');

    const handleMethodSelect = (selected: WithdrawMethod) => {
        setMethod(selected);
        setStep('details');
        setError('');
    };

    const handleDetailsSubmit = () => {
        if (!amount || parseFloat(amount) < 500) {
            setError('Minimum withdrawal is 500 XAF');
            return;
        }
        if (method === 'bank' && !account) {
            setError('Please enter your bank account');
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
                const response = await deposit({
                    amount: parseFloat(amount),
                    service,
                    payer: phone,
                });

                if (response.success) {
                    setStep('success');
                } else {
                    setError(response.message);
                    setStep('details');
                }
            } catch (err) {
                setError('Transaction failed. Please try again.');
                setStep('details');
            }
        } else {
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
                    <h1 className={styles.pageTitle}>Withdraw Funds</h1>
                    <p className={styles.pageSubtitle}>Transfer money to your bank or pick up cash.</p>
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
                                <div className={`${styles.iconBox} ${styles.green}`}>
                                    <Smartphone size={32} />
                                </div>
                                <h3 className={styles.methodTitle}>Mobile Money</h3>
                                <p className={styles.methodDesc}>Send to MTN or Orange Money instantly.</p>
                                <span className={styles.badge}>Fast</span>
                            </Card>

                            <Card
                                className={styles.methodCard}
                                padding="large"
                                onClick={() => handleMethodSelect('agent')}
                                hover
                            >
                                <div className={`${styles.iconBox} ${styles.purple}`}>
                                    <MapPin size={32} />
                                </div>
                                <h3 className={styles.methodTitle}>Cash Pick-up</h3>
                                <p className={styles.methodDesc}>Generate a code and withdraw at any Opay Agent.</p>
                                <span className={styles.badge}>Instant</span>
                            </Card>

                            <Card
                                className={styles.methodCard}
                                padding="large"
                                onClick={() => handleMethodSelect('bank')}
                                hover
                            >
                                <div className={`${styles.iconBox} ${styles.indigo}`}>
                                    <Building2 size={32} />
                                </div>
                                <h3 className={styles.methodTitle}>Bank Transfer</h3>
                                <p className={styles.methodDesc}>Send funds directly to your local bank account.</p>
                            </Card>
                        </div>
                    )}

                    {step === 'details' && (
                        <Card className={styles.formCard} padding="large">
                            <button className={styles.backBtn} onClick={() => setStep('select')}>← Back</button>
                            <h2 className={styles.stepTitle}>
                                {method === 'agent' ? 'Agent Withdrawal' : method === 'momo' ? 'Mobile Money Withdrawal' : 'Bank Transfer'}
                            </h2>

                            <div className={styles.formGroup}>
                                <label>Amount (XAF)</label>
                                <Input
                                    type="number"
                                    placeholder="e.g. 10000"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>

                            {method === 'bank' && (
                                <div className={styles.formGroup}>
                                    <label>Account Number / IBAN</label>
                                    <Input
                                        type="text"
                                        placeholder="CM21 1000..."
                                        value={account}
                                        onChange={(e) => setAccount(e.target.value)}
                                    />
                                </div>
                            )}

                            {method === 'momo' && (
                                <>
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
                                        <label>Receiver Phone Number</label>
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
                                onClick={handleDetailsSubmit}
                            >
                                Continue <ArrowRight size={16} />
                            </Button>
                        </Card>
                    )}

                    {step === 'confirm' && (
                        <Card className={styles.formCard} padding="large">
                            <button className={styles.backBtn} onClick={() => setStep('details')}>← Back</button>
                            <h2 className={styles.stepTitle}>Confirm Withdrawal</h2>

                            <div className={styles.summary}>
                                <div className={styles.summaryRow}>
                                    <span>Amount</span>
                                    <span className={styles.amount}>{parseInt(amount).toLocaleString()} XAF</span>
                                </div>
                                <div className={styles.summaryRow}>
                                    <span>Fee</span>
                                    <span>150 XAF</span>
                                </div>
                                <div className={styles.divider}></div>
                                <div className={styles.summaryRow}>
                                    <span>Total Deducted</span>
                                    <span className={styles.total}>{(parseInt(amount) + 150).toLocaleString()} XAF</span>
                                </div>
                            </div>

                            {method === 'agent' && (
                                <div className={styles.infoBox}>
                                    <AlertCircle size={16} />
                                    <p>You will receive a <strong>Withdrawal Code</strong> after confirmation. Show this to the agent.</p>
                                </div>
                            )}

                            {method === 'momo' && (
                                <div className={styles.infoBox}>
                                    <AlertCircle size={16} />
                                    <p>Funds will be sent directly to {service} {phone}. This cannot be reversed.</p>
                                </div>
                            )}

                            <Button variant="primary" fullWidth onClick={handleConfirm}>
                                Confirm & Withdraw
                            </Button>
                        </Card>
                    )}

                    {step === 'processing' && (
                        <Card className={styles.centerCard} padding="large">
                            <Loader2 size={48} className={styles.spinner} />
                            <h2 className={styles.processingTitle}>Processing Withdrawal...</h2>
                            <p className={styles.processingDesc}>
                                {method === 'momo'
                                    ? `Sending ${parseInt(amount).toLocaleString()} XAF to ${phone}...`
                                    : method === 'agent'
                                        ? 'Generating withdrawal code...'
                                        : 'Initiating bank transfer...'}
                            </p>
                        </Card>
                    )}

                    {step === 'success' && (
                        <Card className={styles.successCard} padding="large">
                            <div className={styles.successIcon}>
                                <CheckCircle2 size={48} />
                            </div>
                            <h2 className={styles.successTitle}>Withdrawal Initiated!</h2>

                            {method === 'agent' ? (
                                <div className={styles.codeBox}>
                                    <span className={styles.codeLabel}>YOUR WITHDRAWAL CODE</span>
                                    <span className={styles.codeValue}>882-991-003</span>
                                    <span className={styles.codeExpiry}>Expires in 15 mins</span>
                                </div>
                            ) : (
                                <p className={styles.successDesc}>
                                    Your transfer of <strong>{parseInt(amount).toLocaleString()} XAF</strong> is being processed. Funds typically arrive within 2 hours.
                                </p>
                            )}

                            <Button variant="primary" onClick={() => window.location.href = '/dashboard'}>
                                Back to Dashboard
                            </Button>
                        </Card>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
