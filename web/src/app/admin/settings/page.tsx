'use client';

import AdminLayout from '@/components/layout/AdminLayout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { Settings as SettingsIcon, Bell, Lock, Globe, Database } from 'lucide-react';
import styles from './page.module.css';

export default function SettingsPage() {
    return (
        <AdminLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.pageTitle}>Platform Configuration</h1>
                    <p className={styles.pageSubtitle}>Manage system settings and preferences</p>
                </div>

                {/* Settings Sections */}
                <div className={styles.settingsGrid}>
                    <Card padding="large">
                        <div className={styles.settingSection}>
                            <div className={styles.sectionHeader}>
                                <Bell size={20} className={styles.sectionIcon} />
                                <h3 className={styles.sectionTitle}>Notifications</h3>
                            </div>
                            <div className={styles.settingItem}>
                                <label className={styles.settingLabel}>
                                    <input type="checkbox" defaultChecked />
                                    Email notifications for new transactions
                                </label>
                            </div>
                            <div className={styles.settingItem}>
                                <label className={styles.settingLabel}>
                                    <input type="checkbox" defaultChecked />
                                    SMS alerts for security events
                                </label>
                            </div>
                        </div>
                    </Card>

                    <Card padding="large">
                        <div className={styles.settingSection}>
                            <div className={styles.sectionHeader}>
                                <Lock size={20} className={styles.sectionIcon} />
                                <h3 className={styles.sectionTitle}>Security</h3>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Session Timeout (minutes)</label>
                                <Input type="number" defaultValue="30" />
                            </div>
                            <div className={styles.settingItem}>
                                <label className={styles.settingLabel}>
                                    <input type="checkbox" defaultChecked />
                                    Require 2FA for admin actions
                                </label>
                            </div>
                        </div>
                    </Card>

                    <Card padding="large">
                        <div className={styles.settingSection}>
                            <div className={styles.sectionHeader}>
                                <Globe size={20} className={styles.sectionIcon} />
                                <h3 className={styles.sectionTitle}>Regional</h3>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Default Language</label>
                                <select className={styles.select}>
                                    <option>English</option>
                                    <option>French</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Currency</label>
                                <select className={styles.select}>
                                    <option>XAF (Cameroon)</option>
                                    <option>XOF (Niger)</option>
                                </select>
                            </div>
                        </div>
                    </Card>

                    <Card padding="large">
                        <div className={styles.settingSection}>
                            <div className={styles.sectionHeader}>
                                <Database size={20} className={styles.sectionIcon} />
                                <h3 className={styles.sectionTitle}>Data & Backup</h3>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Automatic Backup Frequency</label>
                                <select className={styles.select}>
                                    <option>Daily</option>
                                    <option>Weekly</option>
                                    <option>Monthly</option>
                                </select>
                            </div>
                            <Button variant="outline">Backup Now</Button>
                        </div>
                    </Card>
                </div>

                {/* Save Button */}
                <div className={styles.footer}>
                    <Button variant="primary" size="large">Save All Settings</Button>
                </div>
            </div>
        </AdminLayout>
    );
}
