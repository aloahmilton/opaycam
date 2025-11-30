'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Link from 'next/link';
import { mockDashboardStats, mockTransactions, formatCurrency, formatDate, getStatusColor } from '@/lib/mockData';
import {
    Eye,
    Send,
    Smartphone,
    PiggyBank,
    BarChart3,
    ArrowUpRight,
    ArrowDownLeft,
    Clock,
    Zap,
    CreditCard,
    Landmark
} from 'lucide-react';
import styles from './page.module.css';

export default function DashboardPage() {
    const router = useRouter();
    const { isAuthenticated, user, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading || !isAuthenticated) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading your dashboard...</p>
            </div>
        );
    }

    const stats = mockDashboardStats;
    const recentTransactions = mockTransactions.slice(0, 5);

    const getIconForTransaction = (type: string) => {
        switch (type) {
            case 'send': return <ArrowUpRight size={20} />;
            case 'receive': return <ArrowDownLeft size={20} />;
            case 'bill': return <Zap size={20} />;
            case 'airtime': return <Smartphone size={20} />;
            case 'savings': return <PiggyBank size={20} />;
            default: return <CreditCard size={20} />;
        }
    };

    return (
        <DashboardLayout>
            <div className={styles.dashboard}>
                {/* Header */}
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Welcome back, {user?.fullName?.split(' ')[0]}!</h1>
                        <p className={styles.subtitle}>Here's what's happening with your money today</p>
                    </div>
                </div>

                {/* Balance Card */}
                <Card className={styles.balanceCard} padding="large" shadow="large">
                    <div className={styles.balanceHeader}>
                        <div className={styles.balanceLabel}>Available Balance</div>
                        <button className={styles.eyeBtn}><Eye size={20} /></button>
                    </div>
                    <div className={styles.balanceAmount}>
                        {formatCurrency(stats.balance)}
                    </div>
                    <div className={styles.balanceFooter}>
                        <div className={styles.balanceStat}>
                            <span className={styles.balanceStatLabel}>Total Received</span>
                            <span className={styles.balanceStatValue}>{formatCurrency(stats.totalReceived)}</span>
                        </div>
                        <div className={styles.balanceStat}>
                            <span className={styles.balanceStatLabel}>Total Sent</span>
                            <span className={styles.balanceStatValue}>{formatCurrency(stats.totalSent)}</span>
                        </div>
                    </div>
                </Card>

                {/* Quick Actions */}
                <div className={styles.quickActions}>
                    <h2 className={styles.sectionTitle}>Quick Actions</h2>
                    <div className={styles.actionsGrid}>
                        <Link href="/dashboard/send">
                            <Card className={styles.actionCard} padding="large" hover>
                                <div className={styles.actionIcon}><Send size={24} /></div>
                                <div className={styles.actionLabel}>Send Money</div>
                            </Card>
                        </Link>
                        <Link href="/dashboard/bills">
                            <Card className={styles.actionCard} padding="large" hover>
                                <div className={styles.actionIcon}><Smartphone size={24} /></div>
                                <div className={styles.actionLabel}>Pay Bills</div>
                            </Card>
                        </Link>
                        <Link href="/dashboard/savings">
                            <Card className={styles.actionCard} padding="large" hover>
                                <div className={styles.actionIcon}><PiggyBank size={24} /></div>
                                <div className={styles.actionLabel}>Save Money</div>
                            </Card>
                        </Link>
                        <Link href="/dashboard/transactions">
                            <Card className={styles.actionCard} padding="large" hover>
                                <div className={styles.actionIcon}><BarChart3 size={24} /></div>
                                <div className={styles.actionLabel}>View All</div>
                            </Card>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className={styles.statsGrid}>
                    <Card padding="large" shadow="medium">
                        <div className={styles.statCard}>
                            <div className={`${styles.statIcon} ${styles.iconGreen}`}><ArrowDownLeft size={24} /></div>
                            <div className={styles.statInfo}>
                                <div className={styles.statValue}>{formatCurrency(stats.totalReceived)}</div>
                                <div className={styles.statLabel}>Total Received</div>
                            </div>
                        </div>
                    </Card>
                    <Card padding="large" shadow="medium">
                        <div className={styles.statCard}>
                            <div className={`${styles.statIcon} ${styles.iconRed}`}><ArrowUpRight size={24} /></div>
                            <div className={styles.statInfo}>
                                <div className={styles.statValue}>{formatCurrency(stats.totalSent)}</div>
                                <div className={styles.statLabel}>Total Sent</div>
                            </div>
                        </div>
                    </Card>
                    <Card padding="large" shadow="medium">
                        <div className={styles.statCard}>
                            <div className={`${styles.statIcon} ${styles.iconOrange}`}><Clock size={24} /></div>
                            <div className={styles.statInfo}>
                                <div className={styles.statValue}>{stats.pendingTransactions}</div>
                                <div className={styles.statLabel}>Pending</div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Recent Transactions */}
                <div className={styles.transactionsSection}>
                    <div className={styles.transactionsHeader}>
                        <h2 className={styles.sectionTitle}>Recent Transactions</h2>
                        <Link href="/dashboard/transactions">
                            <Button variant="ghost" size="small">View All →</Button>
                        </Link>
                    </div>

                    <Card padding="none" shadow="medium">
                        <div className={styles.transactionsList}>
                            {recentTransactions.map((transaction) => (
                                <div key={transaction.id} className={styles.transaction}>
                                    <div className={styles.transactionIcon}>
                                        {getIconForTransaction(transaction.type)}
                                    </div>
                                    <div className={styles.transactionDetails}>
                                        <div className={styles.transactionTitle}>{transaction.description}</div>
                                        <div className={styles.transactionMeta}>
                                            {transaction.recipient || transaction.sender} • {formatDate(transaction.date)}
                                        </div>
                                    </div>
                                    <div className={styles.transactionRight}>
                                        <div
                                            className={styles.transactionAmount}
                                            style={{ color: transaction.type === 'receive' ? 'var(--color-success)' : 'var(--color-text-primary)' }}
                                        >
                                            {transaction.type === 'receive' ? '+' : '-'}{formatCurrency(transaction.amount)}
                                        </div>
                                        <div
                                            className={styles.transactionStatus}
                                            style={{ color: getStatusColor(transaction.status) }}
                                        >
                                            {transaction.status}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
