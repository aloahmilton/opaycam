'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Brand Column */}
                    <div className={styles.brandCol}>
                        <Link href="/" className={styles.logo}>
                            <img src="/logo.png" alt="OpayCam" className={styles.logoImage} />
                        </Link>
                        <p className={styles.tagline}>
                            The most trusted mobile money platform in Cameroon. Fast, secure, and reliable financial services for everyone.
                        </p>
                        <div className={styles.socials}>
                            <a href="#" className={styles.socialLink}><Facebook size={20} /></a>
                            <a href="#" className={styles.socialLink}><Twitter size={20} /></a>
                            <a href="#" className={styles.socialLink}><Instagram size={20} /></a>
                            <a href="#" className={styles.socialLink}><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.linksCol}>
                        <h3 className={styles.colTitle}>Company</h3>
                        <ul className={styles.linkList}>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/careers">Careers</Link></li>
                            <li><Link href="/blog">Blog</Link></li>
                            <li><Link href="/press">Press</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className={styles.linksCol}>
                        <h3 className={styles.colTitle}>Legal</h3>
                        <ul className={styles.linkList}>
                            <li><Link href="/terms">Terms of Service</Link></li>
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                            <li><Link href="/security">Security</Link></li>
                            <li><Link href="/compliance">Compliance</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className={styles.linksCol}>
                        <h3 className={styles.colTitle}>Contact</h3>
                        <ul className={styles.contactList}>
                            <li>
                                <Mail size={16} />
                                <span>support@opaycam.com</span>
                            </li>
                            <li>
                                <Phone size={16} />
                                <span>+237 600 000 000</span>
                            </li>
                            <li>
                                <MapPin size={16} />
                                <span>Douala, Cameroon</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} OpayCam. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
