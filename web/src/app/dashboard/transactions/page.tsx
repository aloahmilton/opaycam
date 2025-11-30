'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/common/Card';
import { mockTransactions, formatCurrency, getTransactionIcon, getStatusColor, formatDate } from '@/lib/mockData';
import styles from './page.module.css';

export default function TransactionsPage() {
    return (
        <DashboardLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.pageTitle}>Transaction History</h1>
                        <p className={styles.pageSubtitle}>View and manage your payments</p>
                    </div>
                    <div className={styles.filters}>
                        <select className={styles.select}>
                            <option>All Types</option>
                            <option>Sent</option>
                            <option>Received</option>
                            <option>Bills</option>
                        </select>
                        <select className={styles.select}>
                            <option>Last 30 Days</option>
                            <option>Last 3 Months</option>
                            <option>This Year</option>
                        </select>
                    </div>
                </div>

                <Card padding="none" className={styles.listCard}>
                    <div className={styles.list}>
                        {mockTransactions.map((transaction) => (
                            <div key={transaction.id} className={styles.item}>
                                <div className={styles.itemLeft}>
                                    <div className={styles.icon}>{getTransactionIcon(transaction.type)}</div>
                                    <div>
                                        <div className={styles.desc}>{transaction.description}</div>
                                        <div className={styles.meta}>
                                            {formatDate(transaction.date)} • {transaction.reference}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.itemRight}>
                                    <div
                                        className={styles.amount}
                                        style={{ color: transaction.type === 'receive' ? 'var(--color-success)' : 'var(--color-text-primary)' }}
                                    >
                                        {transaction.type === 'receive' ? '+' : '-'}{formatCurrency(transaction.amount)}
                                    </div>
                                    <div
                                        className={styles.status}
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
        </DashboardLayout>
    );
}
