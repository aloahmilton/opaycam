'use client';

import AdminLayout from '@/components/layout/AdminLayout';
import Card from '@/components/common/Card';
import { formatCurrency } from '@/lib/mockData';
import styles from './page.module.css';

// Mock Admin Transactions Data
const mockAdminTransactions = [
    { id: 'TXN-8821', user: 'John Doe', type: 'Transfer', amount: 50000, recipient: 'Jane Smith', status: 'Completed', date: '2024-03-15 14:30', risk: 'Low' },
    { id: 'TXN-8822', user: 'Mike Ross', type: 'Bill Pay', amount: 15000, recipient: 'ENEO', status: 'Failed', date: '2024-03-15 14:25', risk: 'Medium' },
    { id: 'TXN-8823', user: 'Sarah Connor', type: 'Withdrawal', amount: 200000, recipient: 'Bank Account', status: 'Pending', date: '2024-03-15 14:10', risk: 'High' },
    { id: 'TXN-8824', user: 'Bruce Wayne', type: 'Transfer', amount: 5000000, recipient: 'Alfred P.', status: 'Completed', date: '2024-03-15 13:45', risk: 'Low' },
    { id: 'TXN-8825', user: 'Jane Smith', type: 'Airtime', amount: 1000, recipient: 'MTN', status: 'Completed', date: '2024-03-15 13:30', risk: 'Low' },
];

export default function AdminTransactionsPage() {
    return (
        <AdminLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.pageTitle}>Transaction Monitoring</h1>
                    <div className={styles.headerStats}>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Today's Volume</span>
                            <span className={styles.statValue}>{formatCurrency(12500000)}</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Pending</span>
                            <span className={styles.statValue}>15</span>
                        </div>
                    </div>
                </div>

                <Card padding="medium" className={styles.controlsCard}>
                    <div className={styles.controls}>
                        <input type="text" placeholder="Search by ID, User..." className={styles.searchInput} />
                        <select className={styles.filterSelect}>
                            <option>All Types</option>
                            <option>Transfer</option>
                            <option>Bill Pay</option>
                            <option>Withdrawal</option>
                        </select>
                        <select className={styles.filterSelect}>
                            <option>All Status</option>
                            <option>Completed</option>
                            <option>Pending</option>
                            <option>Failed</option>
                        </select>
                        <button className={styles.exportBtn}>⬇ Export CSV</button>
                    </div>
                </Card>

                <Card padding="none" className={styles.tableCard}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Recipient</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Risk</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockAdminTransactions.map((txn) => (
                                <tr key={txn.id}>
                                    <td className={styles.txnId}>{txn.id}</td>
                                    <td className={styles.user}>{txn.user}</td>
                                    <td>{txn.type}</td>
                                    <td className={styles.amount}>{formatCurrency(txn.amount)}</td>
                                    <td>{txn.recipient}</td>
                                    <td className={styles.date}>{txn.date}</td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${styles[txn.status.toLowerCase()]}`}>
                                            {txn.status}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`${styles.riskBadge} ${styles[txn.risk.toLowerCase()]}`}>
                                            {txn.risk}
                                        </span>
                                    </td>
                                    <td>
                                        <button className={styles.actionBtn}>⋮</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </AdminLayout>
    );
}
