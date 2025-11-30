'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import Button from '../common/Button';
import styles from './Header.module.css';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const { language, setLanguage, t } = useLanguage();
    const { isAuthenticated, user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleLanguage = () => {
        setLanguage(language === 'EN' ? 'FR' : 'EN');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <img src="/logo.png" alt="OpayCam" className={styles.logoImage} />
                </Link>

                {/* Desktop Nav */}
                <nav className={styles.desktopNav}>
                    <Link href="/about" className={styles.navLink}>About</Link>

                    <div className={styles.dropdown}>
                        <button className={styles.dropdownTrigger}>
                            Services <ChevronDown size={14} />
                        </button>
                        <div className={styles.dropdownContent}>
                            <Link href="/send-money" className={styles.dropdownItem}>Send Money</Link>
                            <Link href="/bills" className={styles.dropdownItem}>Bill Payments</Link>
                            <Link href="/cards" className={styles.dropdownItem}>Virtual Cards</Link>
                            <Link href="/savings" className={styles.dropdownItem}>Savings</Link>
                        </div>
                    </div>

                    <div className={styles.dropdown}>
                        <button className={styles.dropdownTrigger}>
                            Contact Us <ChevronDown size={14} />
                        </button>
                        <div className={styles.dropdownContent}>
                            <Link href="/contact" className={styles.dropdownItem}>Support</Link>
                            <Link href="/sales" className={styles.dropdownItem}>Sales</Link>
                            <Link href="/press" className={styles.dropdownItem}>Press</Link>
                        </div>
                    </div>

                    <Link href="/pricing" className={styles.navLink}>Pricing</Link>
                    <Link href="/faq" className={styles.navLink}>FAQ</Link>
                </nav>

                <div className={styles.actions}>
                    <button
                        onClick={toggleLanguage}
                        className={styles.langButton}
                        aria-label="Toggle language"
                    >
                        {language}
                    </button>

                    {isAuthenticated ? (
                        <div className={styles.authGroup}>
                            <Link href="/dashboard">
                                <Button variant="primary" size="small">
                                    Dashboard
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className={styles.authGroup}>
                            <Link href="/login" className={styles.loginLink}>
                                {t.login}
                            </Link>
                            <Link href="/signup">
                                <Button variant="primary" size="small">
                                    {t.signUp}
                                </Button>
                            </Link>
                        </div>
                    )}

                    <button className={styles.menuBtn} onClick={toggleMenu}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className={styles.mobileMenu}>
                    <Link href="/about" className={styles.mobileLink} onClick={toggleMenu}>About</Link>
                    <Link href="/pricing" className={styles.mobileLink} onClick={toggleMenu}>Pricing</Link>
                    <Link href="/faq" className={styles.mobileLink} onClick={toggleMenu}>FAQ</Link>

                    <div className={styles.mobileSection}>
                        <div className={styles.mobileSectionTitle}>Services</div>
                        <Link href="/send-money" className={styles.mobileSubLink} onClick={toggleMenu}>Send Money</Link>
                        <Link href="/bills" className={styles.mobileSubLink} onClick={toggleMenu}>Bill Payments</Link>
                        <Link href="/cards" className={styles.mobileSubLink} onClick={toggleMenu}>Virtual Cards</Link>
                    </div>

                    <div className={styles.mobileSection}>
                        <div className={styles.mobileSectionTitle}>Contact</div>
                        <Link href="/contact" className={styles.mobileSubLink} onClick={toggleMenu}>Support</Link>
                        <Link href="/sales" className={styles.mobileSubLink} onClick={toggleMenu}>Sales</Link>
                    </div>

                    <div className={styles.mobileAuth}>
                        {!isAuthenticated && (
                            <>
                                <Link href="/login" onClick={toggleMenu}>
                                    <Button variant="outline" size="large" fullWidth>Login</Button>
                                </Link>
                                <Link href="/signup" onClick={toggleMenu}>
                                    <Button variant="primary" size="large" fullWidth>Sign Up</Button>
                                </Link>
                            </>
                        )}
                        {isAuthenticated && (
                            <Link href="/dashboard" onClick={toggleMenu}>
                                <Button variant="primary" size="large" fullWidth>Dashboard</Button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
