'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import AdminLayout from '@/components/layout/AdminLayout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { User, Activity, MapPin, FileText, Lock, Flag, Send, Eye, CheckCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/mockData';
import styles from './page.module.css';

export default function UserDetailPage() {
    const params = useParams();
    const userId = params.id;
    const [activeTab, setActiveTab] = useState<'transactions' | 'logins' | 'kyc'>('transactions');

    // Mock user data
    const user = {
        id: userId,
        name: 'John Doe',
        phone: '6XXXXXXXX',
        email: 'john@example.com',
        balance: 250000,
        status: 'active',
        kycStatus: 'verified',
        joinedDate: '2024-01-15',
    };

    const transactions = [
        { id: 'TXN-001', type: 'Deposit', amount: 50000, status: 'Success', date: '2024-11-29 14:30' },
        { id: 'TXN-002', type: 'Withdraw', amount: -20000, status: 'Success', date: '2024-11-28 10:15' },
        { id: 'TXN-003', type: 'Send Money', amount: -5000, status: 'Success', date: '2024-11-27 16:45' },
    ];

    const logins = [
        { ip: '197.149.XX.XX', device: 'Windows / Chrome', location: 'Douala, Cameroon', time: '2024-11-29 15:00' },
        { ip: '197.149.YY.YY', device: 'Android / App', location: 'Yaoundé, Cameroon', time: '2024-11-28 09:30' },
        { ip: '197.149.ZZ.ZZ', device: 'iOS / Safari', location: 'Buea, Cameroon', time: '2024-11-27 18:20' },
    ];

    return (
        <AdminLayout>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.userInfo}>
                        <div className={styles.avatar}>{user.name.charAt(0)}</div>
                        <div>
                            <h1 className={styles.userName}>{user.name}</h1>
                            <div className={styles.userMeta}>
                                <span>{user.phone}</span>
                                <span>•</span>
                                <span>{user.email}</span>
                                <span>•</span>
                                <span className={styles[user.status]}>{user.status}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.headerActions}>
                        <Button variant="outline" size="small">
                            <Send size={16} /> Message User
                        </Button>
                        <Button variant="outline" size="small">
                            <Lock size={16} /> Hold Funds
                        </Button>
                        <Button variant="outline" size="small">
                            <Flag size={16} /> Flag Account
                        </Button>
                    </div>
                </div>

                {/* Overview Cards */}
                <div className={styles.overviewGrid}>
                    <Card padding="medium">
                        <div className={styles.overviewLabel}>Balance</div>
                        <div className={styles.overviewValue}>{formatCurrency(user.balance)}</div>
                    </Card>
                    <Card padding="medium">
                        <div className={styles.overviewLabel}>KYC Status</div>
                        <div className={`${styles.overviewValue} ${styles.success}`}>{user.kycStatus}</div>
                    </Card>
                    <Card padding="medium">
                        <div className={styles.overviewLabel}>Member Since</div>
                        <div className={styles.overviewValue}>{user.joinedDate}</div>
                    </Card>
                </div>

                {/* Tabs */}
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'transactions' ? styles.active : ''}`}
                        onClick={() => setActiveTab('transactions')}
                    >
                        <Activity size={16} /> Transactions
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'logins' ? styles.active : ''}`}
                        onClick={() => setActiveTab('logins')}
                    >
                        <MapPin size={16} /> Login History
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'kyc' ? styles.active : ''}`}
                        onClick={() => setActiveTab('kyc')}
                    >
                        <FileText size={16} /> KYC Documents
                    </button>
                </div>

                {/* Tab Content */}
                <Card padding="large">
                    {activeTab === 'transactions' && (
                        <div className={styles.tableContainer}>
                            <h3 className={styles.sectionTitle}>Transaction History</h3>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Transaction ID</th>
                                        <th>Type</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((txn) => (
                                        <tr key={txn.id}>
                                            <td>{txn.id}</td>
                                            <td>{txn.type}</td>
                                            <td className={txn.amount > 0 ? styles.positive : styles.negative}>
                                                {formatCurrency(Math.abs(txn.amount))}
                                            </td>
                                            <td><span className={styles.successBadge}>{txn.status}</span></td>
                                            <td>{txn.date}</td>
                                            <td>
                                                <button className={styles.viewBtn}>
                                                    <Eye size={14} /> View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'logins' && (
                        <div className={styles.loginsContainer}>
                            <h3 className={styles.sectionTitle}>Login History</h3>
                            {logins.map((login, idx) => (
                                <div key={idx} className={styles.loginCard}>
                                    <div className={styles.loginInfo}>
                                        <div className={styles.loginDevice}>{login.device}</div>
                                        <div className={styles.loginDetails}>
                                            <span>IP: {login.ip}</span>
                                            <span>•</span>
                                            <span>{login.location}</span>
                                        </div>
                                    </div>
                                    <div className={styles.loginTime}>{login.time}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'kyc' && (
                        <div className={styles.kycContainer}>
                            <h3 className={styles.sectionTitle}>KYC Documents</h3>
                            <div className={styles.kycStatus}>
                                <CheckCircle size={48} className={styles.kycIcon} />
                                <h4>Verified User</h4>
                                <p>All KYC documents have been reviewed and approved</p>
                            </div>
                            <div className={styles.documentsGrid}>
                                <div className={styles.docCard}>
                                    <FileText size={32} />
                                    <span>National ID</span>
                                    <Button variant="outline" size="small">View Document</Button>
                                </div>
                                <div className={styles.docCard}>
                                    <FileText size={32} />
                                    <span>Proof of Address</span>
                                    <Button variant="outline" size="small">View Document</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </AdminLayout>
    );
}
