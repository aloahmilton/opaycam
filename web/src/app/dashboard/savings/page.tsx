'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { formatCurrency } from '@/lib/mockData';
import { Car, Home, Plus } from 'lucide-react';
import styles from './page.module.css';

export default function SavingsPage() {
    return (
        <DashboardLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.pageTitle}>Savings & Goals</h1>
                        <p className={styles.pageSubtitle}>Grow your money with up to 12% interest</p>
                    </div>
                    <Button variant="primary">+ New Goal</Button>
                </div>

                <div className={styles.overview}>
                    <Card className={styles.totalCard} padding="large">
                        <div className={styles.totalLabel}>Total Savings</div>
                        <div className={styles.totalAmount}>{formatCurrency(150000)}</div>
                        <div className={styles.totalInterest}>+ 1,250 XAF interest earned</div>
                    </Card>
                </div>

                <h2 className={styles.sectionTitle}>Your Goals</h2>
                <div className={styles.goalsGrid}>
                    <Card className={styles.goalCard} padding="large">
                        <div className={styles.goalIcon} style={{ background: '#e3f2fd', color: '#1976d2' }}><Car size={24} /></div>
                        <div className={styles.goalInfo}>
                            <h3 className={styles.goalName}>New Car</h3>
                            <div className={styles.goalProgress}>
                                <div className={styles.progressBar}>
                                    <div className={styles.progressFill} style={{ width: '45%' }}></div>
                                </div>
                                <div className={styles.progressText}>
                                    <span>{formatCurrency(450000)}</span>
                                    <span>Target: {formatCurrency(1000000)}</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className={styles.goalCard} padding="large">
                        <div className={styles.goalIcon} style={{ background: '#fce4ec', color: '#c2185b' }}><Home size={24} /></div>
                        <div className={styles.goalInfo}>
                            <h3 className={styles.goalName}>House Rent</h3>
                            <div className={styles.goalProgress}>
                                <div className={styles.progressBar}>
                                    <div className={styles.progressFill} style={{ width: '20%' }}></div>
                                </div>
                                <div className={styles.progressText}>
                                    <span>{formatCurrency(60000)}</span>
                                    <span>Target: {formatCurrency(300000)}</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className={`${styles.goalCard} ${styles.addGoal}`} padding="large">
                        <div className={styles.addIcon}><Plus size={24} /></div>
                        <div>Create New Savings Goal</div>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
