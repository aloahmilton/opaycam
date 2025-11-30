'use client';

import AdminLayout from '@/components/layout/AdminLayout';
import Card from '@/components/common/Card';
import { Server, Cpu, HardDrive, Activity, Wifi, AlertTriangle, CheckCircle } from 'lucide-react';
import styles from './page.module.css';

export default function SystemPage() {
    const systemMetrics = [
        { label: 'API Response Time', value: '127ms', status: 'good', icon: <Activity size={20} /> },
        { label: 'Server Uptime', value: '99.9%', status: 'good', icon: <Server size={20} /> },
        { label: 'CPU Usage', value: '42%', status: 'good', icon: <Cpu size={20} /> },
        { label: 'Memory Usage', value: '68%', status: 'warning', icon: <HardDrive size={20} /> },
        { label: 'Network Status', value: 'Stable', status: 'good', icon: <Wifi size={20} /> },
    ];

    return (
        <AdminLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.pageTitle}>System Health</h1>
                    <p className={styles.pageSubtitle}>Monitor platform infrastructure and performance</p>
                </div>

                {/* Overall Status */}
                <Card padding="large" className={styles.statusCard}>
                    <div className={styles.statusHeader}>
                        <CheckCircle size={48} className={styles.statusIcon} />
                        <div>
                            <h2 className={styles.statusTitle}>All Systems Operational</h2>
                            <p className={styles.statusDesc}>All services are running smoothly</p>
                        </div>
                    </div>
                </Card>

                {/* System Metrics */}
                <div className={styles.metricsGrid}>
                    {systemMetrics.map((metric, idx) => (
                        <Card key={idx} padding="medium">
                            <div className={styles.metricCard}>
                                <div className={`${styles.metricIcon} ${styles[metric.status]}`}>
                                    {metric.icon}
                                </div>
                                <div className={styles.metricContent}>
                                    <div className={styles.metricLabel}>{metric.label}</div>
                                    <div className={styles.metricValue}>{metric.value}</div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Automation Settings */}
                <Card padding="large" className={styles.automationCard}>
                    <h3 className={styles.sectionTitle}>System Automation</h3>
                    <div className={styles.togglesList}>
                        {[
                            { label: 'Auto-Approve Withdrawals (< 50k XAF)', desc: 'Automatically process small withdrawals without manual review.', active: true },
                            { label: 'Fraud Detection System', desc: 'Block suspicious transactions automatically.', active: true },
                            { label: 'Maintenance Mode', desc: 'Disable user access for system updates.', active: false },
                            { label: 'Auto-Backup Database', desc: 'Perform daily backups at 00:00 UTC.', active: true },
                        ].map((toggle, idx) => (
                            <div key={idx} className={styles.toggleItem}>
                                <div className={styles.toggleInfo}>
                                    <h4 className={styles.toggleLabel}>{toggle.label}</h4>
                                    <p className={styles.toggleDesc}>{toggle.desc}</p>
                                </div>
                                <label className={styles.switch}>
                                    <input type="checkbox" defaultChecked={toggle.active} />
                                    <span className={styles.slider}></span>
                                </label>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Recent Events */}
                <Card padding="large">
                    <h3 className={styles.sectionTitle}>Recent System Events</h3>
                    <div className={styles.eventsList}>
                        {[
                            { type: 'info', message: 'System backup completed successfully', time: '2 hours ago' },
                            { type: 'warning', message: 'High memory usage detected', time: '5 hours ago' },
                            { type: 'info', message: 'Security patch applied', time: '1 day ago' },
                        ].map((event, idx) => (
                            <div key={idx} className={styles.eventItem}>
                                <div className={`${styles.eventIcon} ${styles[event.type]}`}>
                                    {event.type === 'warning' ? <AlertTriangle size={16} /> : <CheckCircle size={16} />}
                                </div>
                                <div className={styles.eventContent}>
                                    <div className={styles.eventMessage}>{event.message}</div>
                                    <div className={styles.eventTime}>{event.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </AdminLayout>
    );
}
