'use client';

import AdminLayout from '@/components/layout/AdminLayout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import {
    User,
    Shield,
    Key,
    Lock,
    History,
    CheckCircle2,
    AlertTriangle,
    Fingerprint,
    Mail,
    Smartphone,
    Globe
} from 'lucide-react';
import styles from './page.module.css';

// Mock Admin Data
const adminProfile = {
    name: 'Super Admin',
    email: 'admin@opaycam.com',
    role: 'ROOT_ADMIN',
    id: 'ADM-001',
    phone: '+237 600 000 000',
    lastLogin: '2024-03-15 09:30 AM',
    location: 'Douala, Cameroon',
    ip: '197.23.45.12'
};

// Mock Abilities/Permissions
const adminAbilities = [
    { category: 'User Management', items: ['Create Users', 'Block/Ban Users', 'View KYC Data', 'Edit User Profiles'], level: 'Full Access' },
    { category: 'Financial Control', items: ['Approve Refunds', 'View Master Wallet', 'Set Transaction Limits', 'Manage Fees'], level: 'Full Access' },
    { category: 'System Config', items: ['Manage API Keys', 'Server Maintenance', 'View Audit Logs', 'Manage Admins'], level: 'Root Access' },
    { category: 'Security', items: ['IP Whitelisting', 'Force Password Reset', 'Manage 2FA Rules'], level: 'Full Access' },
];

// Mock Activity Log
const activityLog = [
    { action: 'System Configuration Updated', detail: 'Changed global transaction limit to 5M XAF', time: '2 hours ago', type: 'critical' },
    { action: 'User Blocked', detail: 'Blocked user USR-992 due to suspicious activity', time: '5 hours ago', type: 'warning' },
    { action: 'Admin Login', detail: 'Successful login from IP 197.23.45.12', time: 'Today, 09:30 AM', type: 'info' },
    { action: 'Report Generated', detail: 'Monthly Revenue Report - Feb 2024', time: 'Yesterday', type: 'info' },
];

export default function AdminProfilePage() {
    return (
        <AdminLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.pageTitle}>Admin Profile & Capabilities</h1>
                    <div className={styles.headerActions}>
                        <span className={styles.lastLogin}>Last login: {adminProfile.lastLogin}</span>
                        <Button variant="outline" size="small">Edit Profile</Button>
                    </div>
                </div>

                <div className={styles.grid}>
                    {/* Left Column: Profile & Security */}
                    <div className={styles.leftColumn}>
                        {/* Profile Card */}
                        <Card padding="large" className={styles.profileCard}>
                            <div className={styles.profileHeader}>
                                <div className={styles.avatarLarge}>SA</div>
                                <div className={styles.profileInfo}>
                                    <h2 className={styles.adminName}>{adminProfile.name}</h2>
                                    <span className={styles.roleBadge}>
                                        <Shield size={14} /> {adminProfile.role}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.infoList}>
                                <div className={styles.infoItem}>
                                    <Mail size={16} className={styles.infoIcon} />
                                    <div className={styles.infoContent}>
                                        <span className={styles.label}>Email</span>
                                        <span className={styles.value}>{adminProfile.email}</span>
                                    </div>
                                </div>
                                <div className={styles.infoItem}>
                                    <Smartphone size={16} className={styles.infoIcon} />
                                    <div className={styles.infoContent}>
                                        <span className={styles.label}>Phone</span>
                                        <span className={styles.value}>{adminProfile.phone}</span>
                                    </div>
                                </div>
                                <div className={styles.infoItem}>
                                    <Globe size={16} className={styles.infoIcon} />
                                    <div className={styles.infoContent}>
                                        <span className={styles.label}>Location</span>
                                        <span className={styles.value}>{adminProfile.location}</span>
                                    </div>
                                </div>
                                <div className={styles.infoItem}>
                                    <Fingerprint size={16} className={styles.infoIcon} />
                                    <div className={styles.infoContent}>
                                        <span className={styles.label}>Admin ID</span>
                                        <span className={styles.value}>{adminProfile.id}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Security Settings */}
                        <Card padding="large" className={styles.securityCard}>
                            <h3 className={styles.cardTitle}>
                                <Lock size={20} /> Security Settings
                            </h3>

                            <div className={styles.securityItem}>
                                <div className={styles.secInfo}>
                                    <span className={styles.secTitle}>Two-Factor Auth</span>
                                    <span className={styles.secDesc}>Hardware key or Authenticator app</span>
                                </div>
                                <div className={styles.toggle}>
                                    <span className={styles.toggleActive}>ENABLED</span>
                                </div>
                            </div>

                            <div className={styles.securityItem}>
                                <div className={styles.secInfo}>
                                    <span className={styles.secTitle}>Session Timeout</span>
                                    <span className={styles.secDesc}>Auto-lock after 15 mins</span>
                                </div>
                                <div className={styles.toggle}>
                                    <span className={styles.toggleActive}>15 MIN</span>
                                </div>
                            </div>

                            <div className={styles.securityItem}>
                                <div className={styles.secInfo}>
                                    <span className={styles.secTitle}>Password</span>
                                    <span className={styles.secDesc}>Last changed 30 days ago</span>
                                </div>
                                <Button variant="ghost" size="small">Change</Button>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column: Abilities & Activity */}
                    <div className={styles.rightColumn}>
                        {/* Abilities Section */}
                        <Card padding="large" className={styles.abilitiesCard}>
                            <h3 className={styles.cardTitle}>
                                <Key size={20} /> Super Admin Abilities
                            </h3>
                            <p className={styles.cardDesc}>
                                You have <strong>Root Level</strong> access. This grants you the highest level of control over the OpayCam ecosystem.
                            </p>

                            <div className={styles.abilitiesGrid}>
                                {adminAbilities.map((ability, index) => (
                                    <div key={index} className={styles.abilityGroup}>
                                        <div className={styles.abilityHeader}>
                                            <span className={styles.abilityCategory}>{ability.category}</span>
                                            <span className={styles.accessLevel}>{ability.level}</span>
                                        </div>
                                        <ul className={styles.permissionList}>
                                            {ability.items.map((item, i) => (
                                                <li key={i} className={styles.permissionItem}>
                                                    <CheckCircle2 size={14} className={styles.checkIcon} />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Recent Activity */}
                        <Card padding="large" className={styles.activityCard}>
                            <h3 className={styles.cardTitle}>
                                <History size={20} /> Your Recent Activity
                            </h3>
                            <div className={styles.timeline}>
                                {activityLog.map((log, index) => (
                                    <div key={index} className={styles.timelineItem}>
                                        <div className={`${styles.timelineDot} ${styles[log.type]}`}></div>
                                        <div className={styles.timelineContent}>
                                            <div className={styles.logHeader}>
                                                <span className={styles.logAction}>{log.action}</span>
                                                <span className={styles.logTime}>{log.time}</span>
                                            </div>
                                            <p className={styles.logDetail}>{log.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="ghost" fullWidth className={styles.viewAllBtn}>View Full Audit Log</Button>
                        </Card>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
