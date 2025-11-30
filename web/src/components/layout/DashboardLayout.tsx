'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './DashboardLayout.module.css';

interface NavItem {
    icon: string;
    label: string;
    href: string;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const { t } = useLanguage();

    const navItems: NavItem[] = [
        { icon: '🏠', label: 'Dashboard', href: '/dashboard' },
        { icon: '💸', label: t.sendMoney, href: '/dashboard/send' },
        { icon: '📱', label: t.payBills, href: '/dashboard/bills' },
        { icon: '📊', label: 'Transactions', href: '/dashboard/transactions' },
        { icon: '💰', label: t.savings, href: '/dashboard/savings' },
        { icon: '⚙️', label: t.settings, href: '/dashboard/settings' },
    ];

    return (
        <div className={styles.layout}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.logo}>
                        <span className={styles.logoText}>OpayC</span>
                        <span className={styles.logoAccent}>am</span>
                    </div>
                </div>

                <nav className={styles.nav}>
                    {navItems.map((item) => (
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

                <div className={styles.sidebarFooter}>
                    <div className={styles.userCard}>
                        <div className={styles.userAvatar}>
                            {user?.fullName?.charAt(0) || 'U'}
                        </div>
                        <div className={styles.userInfo}>
                            <div className={styles.userName}>{user?.fullName}</div>
                            <div className={styles.userEmail}>{user?.email}</div>
                        </div>
                    </div>
                    <button onClick={logout} className={styles.logoutBtn}>
                        🚪 {t.logOut}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.main}>
                <div className={styles.content}>
                    {children}
                </div>
            </main>
        </div>
    );
}
