'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle2 } from 'lucide-react';
import styles from './page.module.css';

export default function SettingsPage() {
    const { user } = useAuth();

    return (
        <DashboardLayout>
            <div className={styles.container}>
                <h1 className={styles.pageTitle}>Settings</h1>

                <div className={styles.grid}>
                    {/* Profile Section */}
                    <Card className={styles.section} padding="large">
                        <h2 className={styles.sectionTitle}>Profile Information</h2>
                        <div className={styles.profileHeader}>
                            <div className={styles.avatar}>{user?.fullName?.charAt(0)}</div>
                            <div>
                                <div className={styles.userName}>{user?.fullName}</div>
                                <div className={styles.userEmail}>{user?.email}</div>
                                <div className={styles.verifiedBadge}>
                                    Verified Account <CheckCircle2 size={14} style={{ display: 'inline', verticalAlign: 'text-bottom' }} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Phone Number</label>
                            <input type="text" value={user?.phone || '+237 6XX XXX XXX'} disabled className={styles.input} />
                        </div>
                        <Button variant="outline" size="small">Edit Profile</Button>
                    </Card>

                    {/* Security Section */}
                    <Card className={styles.section} padding="large">
                        <h2 className={styles.sectionTitle}>Security</h2>
                        <div className={styles.settingItem}>
                            <div>
                                <div className={styles.settingLabel}>Transaction PIN</div>
                                <div className={styles.settingDesc}>Used for authorizing payments</div>
                            </div>
                            <Button variant="ghost" size="small">Change PIN</Button>
                        </div>
                        <div className={styles.settingItem}>
                            <div>
                                <div className={styles.settingLabel}>Two-Factor Authentication</div>
                                <div className={styles.settingDesc}>Extra security for login</div>
                            </div>
                            <div className={styles.toggle}>ON</div>
                        </div>
                        <div className={styles.settingItem}>
                            <div>
                                <div className={styles.settingLabel}>Biometric Login</div>
                                <div className={styles.settingDesc}>Use fingerprint/face ID</div>
                            </div>
                            <div className={styles.toggle}>OFF</div>
                        </div>
                        <div className={styles.settingItem}>
                            <div>
                                <div className={styles.settingLabel}>Voice ID</div>
                                <div className={styles.settingDesc}>Authorize with your voice</div>
                            </div>
                            <Button variant="ghost" size="small" onClick={() => window.location.href = '/dashboard/security/voice-setup'}>
                                Setup
                            </Button>
                        </div>
                    </Card>

                    {/* Preferences */}
                    <Card className={styles.section} padding="large">
                        <h2 className={styles.sectionTitle}>Preferences</h2>
                        <div className={styles.settingItem}>
                            <div>
                                <div className={styles.settingLabel}>Notifications</div>
                                <div className={styles.settingDesc}>Email and push alerts</div>
                            </div>
                            <Button variant="ghost" size="small">Manage</Button>
                        </div>
                        <div className={styles.settingItem}>
                            <div>
                                <div className={styles.settingLabel}>Language</div>
                                <div className={styles.settingDesc}>English (US)</div>
                            </div>
                            <Button variant="ghost" size="small">Change</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
