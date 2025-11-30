'use client';

import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import {
    ShieldAlert,
    UserCheck,
    Eye,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Search,
    Filter
} from 'lucide-react';
import styles from './page.module.css';

// Mock KYC Queue
const kycQueue = [
    { id: 'KYC-001', user: 'Alice M.', type: 'ID Card', submitted: '2 hours ago', status: 'pending', risk: 'low' },
    { id: 'KYC-002', user: 'Bob K.', type: 'Passport', submitted: '5 hours ago', status: 'pending', risk: 'medium' },
    { id: 'KYC-003', user: 'Charlie D.', type: 'Selfie', submitted: '1 day ago', status: 'reviewing', risk: 'high' },
];

// Mock Fraud Alerts
const fraudAlerts = [
    { id: 'FRD-991', user: 'USR-882', type: 'Velocity', detail: '5 transactions in 1 minute', risk: 'critical', time: '10 mins ago' },
    { id: 'FRD-992', user: 'USR-110', type: 'Large Amount', detail: 'Transfer > 5M XAF', risk: 'high', time: '1 hour ago' },
    { id: 'FRD-993', user: 'USR-445', type: 'IP Mismatch', detail: 'Login from Nigeria (User in Cameroon)', risk: 'medium', time: '3 hours ago' },
];

export default function AdminSecurityPage() {
    const [activeTab, setActiveTab] = useState<'kyc' | 'fraud'>('kyc');

    return (
        <AdminLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.pageTitle}>Security & Compliance</h1>
                        <p className={styles.pageSubtitle}>Monitor risks, review KYC, and audit system integrity.</p>
                    </div>
                    <div className={styles.tabs}>
                        <button
                            className={`${styles.tab} ${activeTab === 'kyc' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('kyc')}
                        >
                            <UserCheck size={18} /> KYC Review ({kycQueue.length})
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'fraud' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('fraud')}
                        >
                            <ShieldAlert size={18} /> Fraud Monitoring
                        </button>
                    </div>
                </div>

                {activeTab === 'kyc' && (
                    <div className={styles.section}>
                        <div className={styles.filterBar}>
                            <div className={styles.searchBox}>
                                <Search size={16} />
                                <input type="text" placeholder="Search user or ID..." />
                            </div>
                            <Button variant="outline" size="small"><Filter size={16} /> Filter</Button>
                        </div>

                        <div className={styles.grid}>
                            {kycQueue.map((item) => (
                                <Card key={item.id} padding="medium" className={styles.kycCard}>
                                    <div className={styles.kycHeader}>
                                        <div className={styles.userAvatar}>{item.user.charAt(0)}</div>
                                        <div className={styles.kycInfo}>
                                            <span className={styles.kycUser}>{item.user}</span>
                                            <span className={styles.kycType}>{item.type}</span>
                                        </div>
                                        <span className={`${styles.riskBadge} ${styles[item.risk]}`}>{item.risk} Risk</span>
                                    </div>
                                    <div className={styles.kycMeta}>
                                        <span>Submitted: {item.submitted}</span>
                                        <span>Status: {item.status}</span>
                                    </div>
                                    <div className={styles.kycActions}>
                                        <Button variant="outline" size="small" fullWidth>
                                            <Eye size={14} /> Review
                                        </Button>
                                        <div className={styles.actionRow}>
                                            <button className={styles.rejectBtn}><XCircle size={18} /></button>
                                            <button className={styles.approveBtn}><CheckCircle2 size={18} /></button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'fraud' && (
                    <div className={styles.section}>
                        <Card padding="large" className={styles.fraudTableCard}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Alert ID</th>
                                        <th>User</th>
                                        <th>Risk Type</th>
                                        <th>Detail</th>
                                        <th>Time</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fraudAlerts.map((alert) => (
                                        <tr key={alert.id}>
                                            <td className={styles.mono}>{alert.id}</td>
                                            <td className={styles.userCell}>{alert.user}</td>
                                            <td>
                                                <span className={`${styles.riskTag} ${styles[alert.risk]}`}>{alert.type}</span>
                                            </td>
                                            <td className={styles.detailCell}>{alert.detail}</td>
                                            <td className={styles.timeCell}>{alert.time}</td>
                                            <td>
                                                <Button variant="outline" size="small">Investigate</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Card>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
