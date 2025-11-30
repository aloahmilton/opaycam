'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
    LayoutDashboard,
    Users,
    CreditCard,
    ShieldAlert,
    Settings,
    LogOut,
    Activity,
    FileText,
    HelpCircle,
    Server,
    Wallet,
    UserCog,
    Smartphone,
    Key
} from 'lucide-react';
import styles from './AdminLayout.module.css';

interface NavItem {
    icon: ReactNode;
    label: string;
    href: string;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const { logout } = useAuth();

    const navItems: NavItem[] = [
        { icon: <LayoutDashboard size={20} />, label: 'Overview', href: '/admin' },
        { icon: <Users size={20} />, label: 'User Management', href: '/admin/users' },
        { icon: <CreditCard size={20} />, label: 'Transactions', href: '/admin/transactions' },
        { icon: <Wallet size={20} />, label: 'Admin Wallet', href: '/admin/wallet' },
        { icon: <Wallet size={20} />, label: 'Treasury & Funds', href: '/admin/treasury' },
        { icon: <ShieldAlert size={20} />, label: 'Security Center', href: '/admin/security' },
        { icon: <HelpCircle size={20} />, label: 'Support Tickets', href: '/admin/support' },
        { icon: <UserCog size={20} />, label: 'Team Management', href: '/admin/team' },
        { icon: <FileText size={20} />, label: 'Reports & Logs', href: '/admin/reports' },
        { icon: <Server size={20} />, label: 'System Health', href: '/admin/system' },
        { icon: <Settings size={20} />, label: 'Configuration', href: '/admin/settings' },
        { icon: <Key size={20} />, label: 'API Keys', href: '/admin/settings/api-keys' },
        { icon: <Smartphone size={20} />, label: 'Mobile App', href: '/admin/mobile' },
    ];

    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.logo}>
                        <img src="/logo.png" alt="OpayCam" className={styles.logoImage} />
                    </div>
                </div>

                <div className={styles.navScroll}>
                    <nav className={styles.nav}>
                        <div className={styles.navLabel}>MAIN MENU</div>
                        {navItems.slice(0, 5).map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
                            >
                                <span className={styles.navIcon}>{item.icon}</span>
                                <span className={styles.navLabel}>{item.label}</span>
                            </Link>
                        ))}

                        <div className={styles.navLabel}>MANAGEMENT</div>
                        {navItems.slice(5).map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
                            >
                                <span className={styles.navIcon}>{item.icon}</span>
                                <span className={styles.navLabel}>{item.label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className={styles.sidebarFooter}>
                    <button onClick={logout} className={styles.logoutBtn}>
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            <main className={styles.main}>
                <header className={styles.header}>
                    <h2 className={styles.pageTitle}>
                        {navItems.find(i => i.href === pathname)?.label || 'Dashboard'}
                    </h2>
                    <div className={styles.headerActions}>
                        <div className={styles.statusIndicator}>
                            <span className={styles.statusDot}></span>
                            System Operational
                        </div>
                        <Link href="/admin/profile" className={styles.adminProfileLink}>
                            <div className={styles.adminProfile}>
                                <div className={styles.avatar}>AD</div>
                                <div className={styles.adminInfo}>
                                    <span className={styles.adminName}>Super Admin</span>
                                    <span className={styles.adminRole}>Root Access</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </header>
                <div className={styles.content}>
                    {children}
                </div>
            </main>
        </div>
    );
}
