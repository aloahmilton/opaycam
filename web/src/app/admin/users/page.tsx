'use client';

import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { CheckCircle2, Edit2, Ban, Eye } from 'lucide-react';
import styles from './page.module.css';

// Mock Admin Users Data
const mockUsers = [
    { id: 'USR001', name: 'John Doe', email: 'john@example.com', phone: '+237 677 123 456', status: 'Active', joined: '2024-01-15', balance: 45000, verified: true },
    { id: 'USR002', name: 'Jane Smith', email: 'jane@example.com', phone: '+237 699 888 777', status: 'Active', joined: '2024-02-01', balance: 12500, verified: true },
    { id: 'USR003', name: 'Mike Ross', email: 'mike@example.com', phone: '+237 655 444 333', status: 'Blocked', joined: '2024-03-10', balance: 0, verified: false },
    { id: 'USR004', name: 'Sarah Connor', email: 'sarah@example.com', phone: '+237 670 000 111', status: 'Active', joined: '2024-03-12', balance: 150000, verified: true },
    { id: 'USR005', name: 'Bruce Wayne', email: 'bruce@example.com', phone: '+237 688 999 000', status: 'Suspended', joined: '2024-01-20', balance: 10000000, verified: true },
];

export default function AdminUsersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [showTransactions, setShowTransactions] = useState(false);

    const filteredUsers = mockUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'All' || user.status === filter;
        return matchesSearch && matchesFilter;
    });

    // Mock Transactions for a user
    const mockTransactions = [
        { id: 'TXN001', type: 'Deposit', amount: 50000, date: '2024-03-15 10:30', status: 'Completed' },
        { id: 'TXN002', type: 'Transfer', amount: -12000, date: '2024-03-14 14:20', status: 'Completed' },
        { id: 'TXN003', type: 'Bill Pay', amount: -5000, date: '2024-03-12 09:15', status: 'Completed' },
        { id: 'TXN004', type: 'Withdrawal', amount: -20000, date: '2024-03-10 16:45', status: 'Pending' },
    ];

    const handleViewTransactions = (user: any) => {
        setSelectedUser(user);
        setShowTransactions(true);
    };

    return (
        <AdminLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.pageTitle}>User Management</h1>
                    <Button variant="primary" size="small">+ Add User</Button>
                </div>

                <Card padding="medium" className={styles.controlsCard}>
                    <div className={styles.controls}>
                        <input
                            type="text"
                            placeholder="Search users..."
                            className={styles.searchInput}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select
                            className={styles.filterSelect}
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Blocked">Blocked</option>
                            <option value="Suspended">Suspended</option>
                        </select>
                    </div>
                </Card>

                <Card padding="none" className={styles.tableCard}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Contact</th>
                                <th>Status</th>
                                <th>Balance</th>
                                <th>Joined</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <div className={styles.userInfo}>
                                            <div className={styles.avatar}>{user.name.charAt(0)}</div>
                                            <div>
                                                <div className={styles.userName}>
                                                    {user.name}
                                                    {user.verified && <CheckCircle2 size={16} className={styles.verifiedBadge} />}
                                                </div>
                                                <div className={styles.userId}>{user.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.contactInfo}>
                                            <div>{user.email}</div>
                                            <div className={styles.phone}>{user.phone}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${styles[user.status.toLowerCase()]}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className={styles.balance}>{user.balance.toLocaleString()} XAF</td>
                                    <td className={styles.date}>{user.joined}</td>
                                    <td>
                                        <div className={styles.actions}>
                                            <button className={styles.actionBtn} title="Edit"><Edit2 size={18} /></button>
                                            <button className={styles.actionBtn} title="Block"><Ban size={18} /></button>
                                            <button
                                                className={styles.actionBtn}
                                                title="View Transactions"
                                                onClick={() => handleViewTransactions(user)}
                                            >
                                                <Eye size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>

                {/* Transactions Modal */}
                {showTransactions && selectedUser && (
                    <div className={styles.modalOverlay} onClick={() => setShowTransactions(false)}>
                        <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                            <div className={styles.modalHeader}>
                                <h2>Transaction Logs: {selectedUser.name}</h2>
                                <button className={styles.closeBtn} onClick={() => setShowTransactions(false)}>×</button>
                            </div>
                            <div className={styles.modalBody}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Type</th>
                                            <th>Amount</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mockTransactions.map(txn => (
                                            <tr key={txn.id}>
                                                <td>{txn.id}</td>
                                                <td>{txn.type}</td>
                                                <td style={{ color: txn.amount > 0 ? 'green' : 'red' }}>
                                                    {txn.amount > 0 ? '+' : ''}{txn.amount.toLocaleString()} XAF
                                                </td>
                                                <td>{txn.date}</td>
                                                <td>
                                                    <span className={`${styles.statusBadge} ${styles[txn.status.toLowerCase()]}`}>
                                                        {txn.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
