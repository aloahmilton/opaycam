'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { Smartphone, Lightbulb, Tv, Droplets, Wifi, ArrowRight, CheckCircle2 } from 'lucide-react';
import styles from './page.module.css';

const billDetails = {
    airtime: { title: 'Buy Airtime', icon: Smartphone, label: 'Phone Number', placeholder: '6XX XXX XXX', color: 'orange' },
    data: { title: 'Buy Data Bundle', icon: Wifi, label: 'Phone Number', placeholder: '6XX XXX XXX', color: 'blue' },
    electricity: { title: 'Pay Electricity', icon: Lightbulb, label: 'Meter Number', placeholder: '1442 221...', color: 'yellow' },
    water: { title: 'Pay Water Bill', icon: Droplets, label: 'Subscription Number', placeholder: '0012...', color: 'cyan' },
    tv: { title: 'TV Subscription', icon: Tv, label: 'Decoder Number', placeholder: '1234567890', color: 'purple' },
};

export default function BillPaymentPage() {
    const params = useParams();
    const router = useRouter();
    const category = params.category as keyof typeof billDetails;
    const details = billDetails[category];

    const [step, setStep] = useState<'input' | 'confirm' | 'success'>('input');
    const [identifier, setIdentifier] = useState('');
    const [amount, setAmount] = useState('');
    const [provider, setProvider] = useState('');

    if (!details) {
        return (
            <DashboardLayout>
                <div className={styles.container}>
                    <h1>Category not found</h1>
                    <Button onClick={() => router.push('/dashboard/bills')}>Go Back</Button>
                </div>
            </DashboardLayout>
        );
    }

    const Icon = details.icon;

    const handleContinue = () => {
        setStep('confirm');
    };

    const handlePay = () => {
        setTimeout(() => {
            setStep('success');
        }, 1500);
    };

    return (
        <DashboardLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={`${styles.iconBox} ${styles[details.color]}`}>
                        <Icon size={32} />
                    </div>
                    <h1 className={styles.pageTitle}>{details.title}</h1>
                </div>

                <div className={styles.content}>
                    {step === 'input' && (
                        <Card className={styles.formCard} padding="large">
                            <button className={styles.backBtn} onClick={() => router.push('/dashboard/bills')}>← Back to Categories</button>

                            {(category === 'airtime' || category === 'data') && (
                                <div className={styles.formGroup}>
                                    <label>Select Provider</label>
                                    <div className={styles.providerGrid}>
                                        {['MTN', 'Orange', 'Camtel'].map(p => (
                                            <div
                                                key={p}
                                                className={`${styles.providerCard} ${provider === p ? styles.active : ''}`}
                                                onClick={() => setProvider(p)}
                                            >
                                                {p}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className={styles.formGroup}>
                                <label>{details.label}</label>
                                <Input
                                    type="text"
                                    placeholder={details.placeholder}
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Amount (XAF)</label>
                                <Input
                                    type="number"
                                    placeholder="e.g. 1000"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>

                            <Button
                                variant="primary"
                                fullWidth
                                onClick={handleContinue}
                                disabled={!identifier || !amount || ((category === 'airtime' || category === 'data') && !provider)}
                            >
                                Continue <ArrowRight size={16} />
                            </Button>
                        </Card>
                    )}

                    {step === 'confirm' && (
                        <Card className={styles.formCard} padding="large">
                            <button className={styles.backBtn} onClick={() => setStep('input')}>← Back</button>
                            <h2 className={styles.stepTitle}>Confirm Payment</h2>

                            <div className={styles.summary}>
                                <div className={styles.summaryRow}>
                                    <span>Service</span>
                                    <span className={styles.value}>{details.title}</span>
                                </div>
                                <div className={styles.summaryRow}>
                                    <span>{details.label}</span>
                                    <span className={styles.value}>{identifier}</span>
                                </div>
                                {(category === 'airtime' || category === 'data') && (
                                    <div className={styles.summaryRow}>
                                        <span>Provider</span>
                                        <span className={styles.value}>{provider}</span>
                                    </div>
                                )}
                                <div className={styles.divider}></div>
                                <div className={styles.summaryRow}>
                                    <span>Total Amount</span>
                                    <span className={styles.total}>{parseInt(amount).toLocaleString()} XAF</span>
                                </div>
                            </div>

                            <Button variant="primary" fullWidth onClick={handlePay}>
                                Pay Now
                            </Button>
                        </Card>
                    )}

                    {step === 'success' && (
                        <Card className={styles.successCard} padding="large">
                            <div className={styles.successIcon}>
                                <CheckCircle2 size={48} />
                            </div>
                            <h2 className={styles.successTitle}>Payment Successful!</h2>
                            <p className={styles.successDesc}>
                                You have successfully paid <strong>{parseInt(amount).toLocaleString()} XAF</strong> for {details.title.toLowerCase()}.
                            </p>
                            <Button variant="primary" onClick={() => router.push('/dashboard')}>
                                Back to Dashboard
                            </Button>
                        </Card>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
