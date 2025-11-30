'use client';

import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { Users, Shield, UserPlus, Edit2, Trash2, Eye } from 'lucide-react';
import styles from './page.module.css';

type AdminRole = 'super_admin' | 'admin' | 'support';

interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: AdminRole;
    status: 'active' | 'inactive';
    lastActive: string;
    permissions: string[];
}

export default function AdminTeamPage() {
    const [showAddAdmin, setShowAddAdmin] = useState(false);

    const mockAdmins: AdminUser[] = [
        {
            id: 'ADM-001',
            name: 'Super Admin',
            email: 'superadmin@opaycam.com',
            role: 'super_admin',
            status: 'active',
            lastActive: '5 minutes ago',
            permissions: ['all'],
        },
        {
            id: 'ADM-002',
            name: 'Sarah Johnson',
            email: 'sarah@opaycam.com',
            role: 'admin',
            status: 'active',
            lastActive: '2 hours ago',
            permissions: ['users', 'transactions', 'support'],
        },
        {
            id: 'ADM-003',
            name: 'Mike Chen',
            email: 'mike@opaycam.com',
            role: 'support',
            status: 'active',
            lastActive: '1 day ago',
            permissions: ['support', 'view_users'],
        },
    ];

    const roleColors = {
        super_admin: styles.superAdmin,
        admin: styles.adminRole,
        support: styles.supportRole,
    };

    return (
        <AdminLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.pageTitle}>Team Management</h1>
                        <p className={styles.pageSubtitle}>Manage admin users, roles, and permissions</p>
                    </div>
                    <Button variant="primary" onClick={() => setShowAddAdmin(true)}>
                        <UserPlus size={18} /> Add Admin
                    </Button>
                </div>

                {/* Stats */}
                <div className={styles.statsGrid}>
                    <Card padding="medium" className={styles.statCard}>
                        <Users size={24} className={styles.statIcon} />
                        <div>
                            <div className={styles.statValue}>{mockAdmins.length}</div>
                            <div className={styles.statLabel}>Total Admins</div>
                        </div>
                    </Card>
                    <Card padding="medium" className={styles.statCard}>
                        <Shield size={24} className={styles.statIcon} />
                        <div>
                            <div className={styles.statValue}>
                                {mockAdmins.filter(a => a.status === 'active').length}
                            </div>
                            <div className={styles.statLabel}>Active Now</div>
                        </div>
                    </Card>
                </div>

                {/* Admin List */}
                <Card padding="large">
                    <h2 className={styles.sectionTitle}>Admin Users</h2>
                    <div className={styles.adminList}>
                        {mockAdmins.map((admin) => (
                            <div key={admin.id} className={styles.adminCard}>
                                <div className={styles.adminInfo}>
                                    <div className={styles.adminAvatar}>
                                        {admin.name.charAt(0)}
                                    </div>
                                    <div className={styles.adminDetails}>
                                        <div className={styles.adminName}>{admin.name}</div>
                                        <div className={styles.adminEmail}>{admin.email}</div>
                                        <div className={styles.adminMeta}>
                                            <span className={`${styles.roleBadge} ${roleColors[admin.role]}`}>
                                                {admin.role.replace('_', ' ')}
                                            </span>
                                            <span className={styles.lastActive}>
                                                Last active: {admin.lastActive}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.adminActions}>
                                    <button className={styles.iconBtn} title="View Details">
                                        <Eye size={16} />
                                    </button>
                                    <button className={styles.iconBtn} title="Edit">
                                        <Edit2 size={16} />
                                    </button>
                                    {admin.role !== 'super_admin' && (
                                        <button className={`${styles.iconBtn} ${styles.danger}`} title="Remove">
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Permissions Matrix */}
                <Card padding="large" className={styles.permissionsCard}>
                    <h2 className={styles.sectionTitle}>Permissions Overview</h2>
                    <div className={styles.permissionsTable}>
                        <div className={styles.tableHeader}>
                            <div>Permission</div>
                            <div>Super Admin</div>
                            <div>Admin</div>
                            <div>Support</div>
                        </div>
                        {[
                            { name: 'User Management', super: true, admin: true, support: false },
                            { name: 'Transactions', super: true, admin: true, support: false },
                            { name: 'Wallet Operations', super: true, admin: false, support: false },
                            { name: 'Support Tickets', super: true, admin: true, support: true },
                            { name: 'Add Admins', super: true, admin: false, support: false },
                            { name: 'View Reports', super: true, admin: true, support: true },
                        ].map((perm, idx) => (
                            <div key={idx} className={styles.tableRow}>
                                <div className={styles.permName}>{perm.name}</div>
                                <div>{perm.super ? '✓' : '—'}</div>
                                <div>{perm.admin ? '✓' : '—'}</div>
                                <div>{perm.support ? '✓' : '—'}</div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Add Admin Modal */}
                {showAddAdmin && (
                    <div className={styles.modal}>
                        <Card padding="large" className={styles.modalCard}>
                            <h3 className={styles.modalTitle}>Add New Admin</h3>
                            <div className={styles.formGroup}>
                                <label>Full Name</label>
                                <Input placeholder="e.g. John Doe" />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Email Address</label>
                                <Input type="email" placeholder="john@opaycam.com" />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Role</label>
                                <select className={styles.select}>
                                    <option value="support">Support</option>
                                    <option value="admin">Admin</option>
                                    <option value="super_admin">Super Admin</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Initial Password</label>
                                <Input type="password" placeholder="Minimum 8 characters" />
                            </div>
                            <div className={styles.modalActions}>
                                <Button variant="outline" onClick={() => setShowAddAdmin(false)}>Cancel</Button>
                                <Button variant="primary">Add Admin</Button>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
