'use client';

import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/common/Card';
import { Smartphone, Globe, Zap, Droplets, Tv, GraduationCap, Landmark, Plane } from 'lucide-react';
import styles from './page.module.css';

const billCategories = [
    { id: 'airtime', icon: <Smartphone size={32} />, name: 'Airtime', desc: 'MTN, Orange, Camtel' },
    { id: 'data', icon: <Globe size={32} />, name: 'Internet Data', desc: 'Data bundles' },
    { id: 'electricity', icon: <Zap size={32} />, name: 'Electricity', desc: 'ENEO Prepaid & Postpaid' },
    { id: 'water', icon: <Droplets size={32} />, name: 'Water', desc: 'Camwater bills' },
    { id: 'tv', icon: <Tv size={32} />, name: 'TV Subscription', desc: 'Canal+, Startimes' },
    { id: 'education', icon: <GraduationCap size={32} />, name: 'Education', desc: 'School & Exam fees' },
    { id: 'taxes', icon: <Landmark size={32} />, name: 'Taxes', desc: 'Government payments' },
    { id: 'transport', icon: <Plane size={32} />, name: 'Transport', desc: 'Flight & Bus tickets' },
];

export default function BillsPage() {
    return (
        <DashboardLayout>
            <div className={styles.container}>
                <h1 className={styles.pageTitle}>Pay Bills</h1>
                <p className={styles.pageSubtitle}>Select a service to pay for</p>

                <div className={styles.grid}>
                    {billCategories.map((category) => (
                        <Link key={category.id} href={`/dashboard/bills/${category.id}`} style={{ textDecoration: 'none' }}>
                            <Card className={styles.card} padding="large" hover>
                                <div className={styles.iconWrapper}>{category.icon}</div>
                                <h3 className={styles.categoryName}>{category.name}</h3>
                                <p className={styles.categoryDesc}>{category.desc}</p>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
