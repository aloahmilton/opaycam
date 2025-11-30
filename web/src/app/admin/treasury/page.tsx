'use client';

import AdminLayout from '@/components/layout/AdminLayout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import {
    Wallet,
    TrendingUp,
    TrendingDown,
    RefreshCw,
    AlertTriangle,
    Building2,
    Smartphone,
    ArrowRightLeft,
    PieChart
} from 'lucide-react';
import { formatCurrency } from '@/lib/mockData';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import styles from './page.module.css';

// Mock Treasury Data
const treasuryStats = {
    totalFloat: 45000000, // Real money in banks/mobile money
    userLiabilities: 42500000, // Sum of all user wallets
    netPosition: 2500000, // Surplus/Profit
    lastReconciled: 'Just now'
};

const providerBalances = [
    { name: 'MTN Mobile Money', balance: 15000000, color: '#fbbf24', icon: Smartphone },
    { name: 'Orange Money', balance: 12000000, color: '#f97316', icon: Smartphone },
    { name: 'Ecobank Master', balance: 18000000, color: '#3b82f6', icon: Building2 },
];

const liquidityData = [
    { name: 'MTN MoMo', float: 15000000, liability: 14200000 },
    { name: 'Orange Money', float: 12000000, liability: 11800000 },
    { name: 'Bank Reserve', float: 18000000, liability: 16500000 },
];

export default function TreasuryPage() {
    return (
        <AdminLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.pageTitle}>Treasury & Fund Management</h1>
                        <p className={styles.pageSubtitle}>Monitor system solvency and manage liquidity across providers.</p>
                    </div>
                    <div className={styles.headerActions}>
                        <Button variant="outline" size="small">
                            <RefreshCw size={16} /> Reconcile Now
                        </Button>
                        <Button variant="primary" size="small">
                            <ArrowRightLeft size={16} /> Rebalance Funds
                        </Button>
                    </div>
                </div>

                {/* Solvency Overview */}
                <div className={styles.overviewGrid}>
                    <Card padding="large" className={styles.solvencyCard}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>System Solvency</h3>
                            <span className={`${styles.badge} ${styles.success}`}>Solvent</span>
                        </div>
                        <div className={styles.solvencyMetrics}>
                            <div className={styles.metric}>
                                <span className={styles.metricLabel}>Total Float (Real Money)</span>
                                <span className={styles.metricValue}>{formatCurrency(treasuryStats.totalFloat)}</span>
                                <span className={styles.metricSub}>Across all accounts</span>
                            </div>
                            <div className={styles.divider}></div>
                            <div className={styles.metric}>
                                <span className={styles.metricLabel}>User Liabilities</span>
                                <span className={styles.metricValue}>{formatCurrency(treasuryStats.userLiabilities)}</span>
                                <span className={styles.metricSub}>Sum of user wallets</span>
                            </div>
                            <div className={styles.divider}></div>
                            <div className={styles.metric}>
                                <span className={styles.metricLabel}>Net Position</span>
                                <span className={`${styles.metricValue} ${styles.positive}`}>
                                    +{formatCurrency(treasuryStats.netPosition)}
                                </span>
                                <span className={styles.metricSub}>System Surplus</span>
                            </div>
                        </div>
                    </Card>

                    {/* Provider Breakdown */}
                    <div className={styles.providerGrid}>
                        {providerBalances.map((provider) => (
                            <Card key={provider.name} padding="medium" className={styles.providerCard}>
                                <div className={styles.providerHeader}>
                                    <div className={styles.providerIcon} style={{ background: `${provider.color}20`, color: provider.color }}>
                                        <provider.icon size={20} />
                                    </div>
                                    <span className={styles.providerName}>{provider.name}</span>
                                </div>
                                <div className={styles.providerBalance}>
                                    {formatCurrency(provider.balance)}
                                </div>
                                <div className={styles.providerStatus}>
                                    <div className={styles.progressBar}>
                                        <div className={styles.progressFill} style={{ width: '85%', background: provider.color }}></div>
                                    </div>
                                    <span className={styles.statusText}>Healthy Liquidity</span>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Liquidity Chart */}
                <div className={styles.chartsRow}>
                    <Card padding="large" className={styles.chartCard}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Liquidity vs Liability by Provider</h3>
                        </div>
                        <div className={styles.chartContainer}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={liquidityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="float" name="Real Float" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="liability" name="User Liability" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* Recent Treasury Actions */}
                    <Card padding="large" className={styles.actionsCard}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Recent Treasury Actions</h3>
                        </div>
                        <div className={styles.actionList}>
                            <div className={styles.actionItem}>
                                <div className={`${styles.actionIcon} ${styles.blue}`}>
                                    <ArrowRightLeft size={16} />
                                </div>
                                <div className={styles.actionContent}>
                                    <span className={styles.actionTitle}>Rebalanced MTN Float</span>
                                    <span className={styles.actionTime}>2 hours ago</span>
                                </div>
                                <span className={styles.actionAmount}>+5,000,000</span>
                            </div>
                            <div className={styles.actionItem}>
                                <div className={`${styles.actionIcon} ${styles.green}`}>
                                    <TrendingUp size={16} />
                                </div>
                                <div className={styles.actionContent}>
                                    <span className={styles.actionTitle}>Profit Sweep</span>
                                    <span className={styles.actionTime}>Yesterday</span>
                                </div>
                                <span className={styles.actionAmount}>+250,000</span>
                            </div>
                            <div className={styles.actionItem}>
                                <div className={`${styles.actionIcon} ${styles.orange}`}>
                                    <AlertTriangle size={16} />
                                </div>
                                <div className={styles.actionContent}>
                                    <span className={styles.actionTitle}>Low Liquidity Alert (Orange)</span>
                                    <span className={styles.actionTime}>2 days ago</span>
                                </div>
                                <span className={styles.actionStatus}>Resolved</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
