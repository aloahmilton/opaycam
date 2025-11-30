'use client';

import AdminLayout from '@/components/layout/AdminLayout';
import Card from '@/components/common/Card';
import { FileText, Download, TrendingUp, DollarSign, Users, Activity } from 'lucide-react';
import { formatCurrency } from '@/lib/mockData';
import styles from './page.module.css';

export default function ReportsPage() {
    return (
        <AdminLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.pageTitle}>Reports & Analytics</h1>
                        <p className={styles.pageSubtitle}>View and download platform reports</p>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className={styles.statsGrid}>
                    <Card padding="medium">
                        <div className={styles.statCard}>
                            <DollarSign size={24} className={styles.statIcon} />
                            <div>
                                <div className={styles.statValue}>{formatCurrency(125000000)}</div>
                                <div className={styles.statLabel}>Total Volume (30d)</div>
                            </div>
                        </div>
                    </Card>
                    <Card padding="medium">
                        <div className={styles.statCard}>
                            <Users size={24} className={styles.statIcon} />
                            <div>
                                <div className={styles.statValue}>45,231</div>
                                <div className={styles.statLabel}>Active Users</div>
                            </div>
                        </div>
                    </Card>
                    <Card padding="medium">
                        <div className={styles.statCard}>
                            <Activity size={24} className={styles.statIcon} />
                            <div>
                                <div className={styles.statValue}>125,789</div>
                                <div className={styles.statLabel}>Transactions (30d)</div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Report Categories */}
                <div className={styles.reportsGrid}>
                    {[
                        { title: 'Financial Report', desc: 'Monthly revenue and transaction summary', icon: <TrendingUp size={32} /> },
                        { title: 'User Activity', desc: 'User engagement and retention metrics', icon: <Users size={32} /> },
                        { title: 'Transaction Logs', desc: 'Complete transaction history export', icon: <Activity size={32} /> },
                        { title: 'Compliance Report', desc: 'KYC and regulatory compliance data', icon: <FileText size={32} /> },
                    ].map((report, idx) => (
                        <Card key={idx} padding="large" className={styles.reportCard} hover>
                            <div className={styles.reportIcon}>{report.icon}</div>
                            <h3 className={styles.reportTitle}>{report.title}</h3>
                            <p className={styles.reportDesc}>{report.desc}</p>
                            <button className={styles.downloadBtn}>
                                <Download size={16} /> Download PDF
                            </button>
                        </Card>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
