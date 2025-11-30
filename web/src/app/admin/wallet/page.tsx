'use client';

import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { Wallet, TrendingUp, Send, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '@/lib/mockData';
import styles from './page.module.css';

type ActionType = 'withdraw' | 'send' | 'hold' | null;

export default function AdminWalletPage() {
    const [action, setAction] = useState<ActionType>(null);
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [reason, setReason] = useState('');
    const [success, setSuccess] = useState(false);

    const platformBalance = 45000000; // Mock total platform funds
    const userLiabilities = 38000000; // Mock total user balances
    const netPosition = platformBalance - userLiabilities;

    const handleAction = () => {
        // Simulate action
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            setAction(null);
            setAmount('');
            setRecipient('');
            setReason('');
        }, 2000);
    };

    return (
        <AdminLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.pageTitle}>Wallet Management</h1>
                    <p className={styles.pageSubtitle}>Manage platform funds and admin operations</p>
                </div>

                {/* Overview Cards */}
                <div className={styles.metricsGrid}>
                    <Card padding="medium" className={styles.metricCard}>
                        <div className={styles.metricIcon}>
                            <Wallet size={24} />
                        </div>
                        <div className={styles.metricContent}>
                            <span className={styles.metricLabel}>Platform Balance</span>
                            <span className={styles.metricValue}>{formatCurrency(platformBalance)}</span>
                        </div>
                    </Card>

                    <Card padding="medium" className={styles.metricCard}>
                        <div className={`${styles.metricIcon} ${styles.warning}`}>
                            <AlertCircle size={24} />
                        </div>
                        <div className={styles.metricContent}>
                            <span className={styles.metricLabel}>User Liabilities</span>
                            <span className={styles.metricValue}>{formatCurrency(userLiabilities)}</span>
                        </div>
                    </Card>

                    <Card padding="medium" className={styles.metricCard}>
                        <div className={`${styles.metricIcon} ${styles.success}`}>
                            <TrendingUp size={24} />
                        </div>
                        <div className={styles.metricContent}>
                            <span className={styles.metricLabel}>Net Position</span>
                            <span className={styles.metricValue}>{formatCurrency(netPosition)}</span>
                        </div>
                    </Card>
                </div>

                {/* Action Buttons */}
                <Card padding="large" className={styles.actionsCard}>
                    <h2 className={styles.sectionTitle}>Admin Actions</h2>
                    <div className={styles.actionsGrid}>
                        <Button
                            variant="primary"
                            onClick={() => setAction('withdraw')}
                            className={styles.actionBtn}
                        >
                            <TrendingUp size={18} /> Withdraw Funds
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => setAction('send')}
                            className={styles.actionBtn}
                        >
                            <Send size={18} /> Send to User
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setAction('hold')}
                            className={styles.actionBtn}
                        >
                            <Lock size={18} /> Hold Funds
                        </Button>
                    </div>
                </Card>

                {/* Action Forms */}
                {action && !success && (
                    <Card padding="large" className={styles.formCard}>
                        <h3 className={styles.formTitle}>
                            {action === 'withdraw' && 'Withdraw Platform Funds'}
                            {action === 'send' && 'Send Money to User'}
                            {action === 'hold' && 'Hold User Funds'}
                        </h3>

                        <div className={styles.formGroup}>
                            <label>Amount (XAF)</label>
                            <Input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount"
                            />
                        </div>

                        {action === 'send' && (
                            <div className={styles.formGroup}>
                                <label>Recipient User ID or Phone</label>
                                <Input
                                    value={recipient}
                                    onChange={(e) => setRecipient(e.target.value)}
                                    placeholder="e.g. USER123 or 6XXXXXXXX"
                                />
                            </div>
                        )}

                        {action === 'hold' && (
                            <div className={styles.formGroup}>
                                <label>User ID or Phone</label>
                                <Input
                                    value={recipient}
                                    onChange={(e) => setRecipient(e.target.value)}
                                    placeholder="e.g. USER123 or 6XXXXXXXX"
                                />
                            </div>
                        )}

                        <div className={styles.formGroup}>
                            <label>Reason / Note</label>
                            <Input
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="Explain the reason for this action"
                            />
                        </div>

                        <div className={styles.formActions}>
                            <Button variant="outline" onClick={() => setAction(null)}>
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleAction}
                                disabled={!amount || (action !== 'withdraw' && !recipient) || !reason}
                            >
                                Confirm Action
                            </Button>
                        </div>
                    </Card>
                )}

                {/* Success Message */}
                {success && (
                    <Card padding="large" className={styles.successCard}>
                        <CheckCircle2 size={48} className={styles.successIcon} />
                        <h3 className={styles.successTitle}>Action Completed!</h3>
                        <p className={styles.successText}>
                            The {action} operation was successful.
                        </p>
                    </Card>
                )}

                {/* Recent Activity */}
                <Card padding="large">
                    <h2 className={styles.sectionTitle}>Recent Admin Actions</h2>
                    <div className={styles.activityList}>
                        {[
                            { type: 'Withdrawal', amount: 500000, time: '2 hours ago', admin: 'Super Admin' },
                            { type: 'Send to User', amount: 50000, time: '5 hours ago', admin: 'Admin Sarah' },
                            { type: 'Hold Funds', amount: 200000, time: '1 day ago', admin: 'Super Admin' },
                        ].map((item, idx) => (
                            <div key={idx} className={styles.activityItem}>
                                <div className={styles.activityInfo}>
                                    <span className={styles.activityType}>{item.type}</span>
                                    <span className={styles.activityAmount}>{formatCurrency(item.amount)}</span>
                                </div>
                                <div className={styles.activityMeta}>
                                    <span className={styles.activityAdmin}>{item.admin}</span>
                                    <span className={styles.activityTime}>{item.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </AdminLayout>
    );
}
