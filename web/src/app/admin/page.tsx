'use client';

import AdminLayout from '@/components/layout/AdminLayout';
import Card from '@/components/common/Card';
import { formatCurrency } from '@/lib/mockData';
import {
    Users,
    DollarSign,
    Activity,
    ShieldCheck,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    Clock
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';
import styles from './page.module.css';

// Real Chart Data
const volumeData = [
    { name: '00:00', value: 4000 },
    { name: '04:00', value: 3000 },
    { name: '08:00', value: 12000 },
    { name: '12:00', value: 25000 },
    { name: '16:00', value: 35000 },
    { name: '20:00', value: 28000 },
    { name: '23:59', value: 15000 },
];

const userGrowthData = [
    { name: 'Mon', users: 120 },
    { name: 'Tue', users: 150 },
    { name: 'Wed', users: 180 },
    { name: 'Thu', users: 220 },
    { name: 'Fri', users: 300 },
    { name: 'Sat', users: 280 },
    { name: 'Sun', users: 250 },
];

export default function AdminDashboard() {
    return (
        <AdminLayout>
            <div className={styles.dashboard}>
                {/* KPI Cards */}
                <div className={styles.grid}>
                    <Card className={styles.kpiCard} padding="small">
                        <div className={styles.kpiHeader}>
                            <div className={`${styles.iconBox} ${styles.blue}`}>
                                <Users size={20} />
                            </div>
                            <span className={`${styles.badge} ${styles.success}`}>
                                <TrendingUp size={12} /> +12.5%
                            </span>
                        </div>
                        <div className={styles.kpiContent}>
                            <div className={styles.kpiValue}>12,543</div>
                            <div className={styles.kpiLabel}>Total Registered Users</div>
                        </div>
                    </Card>

                    <Card className={styles.kpiCard} padding="small">
                        <div className={styles.kpiHeader}>
                            <div className={`${styles.iconBox} ${styles.green}`}>
                                <DollarSign size={20} />
                            </div>
                            <span className={`${styles.badge} ${styles.success}`}>
                                <TrendingUp size={12} /> +8.2%
                            </span>
                        </div>
                        <div className={styles.kpiContent}>
                            <div className={styles.kpiValue}>{formatCurrency(45000000)}</div>
                            <div className={styles.kpiLabel}>Total Transaction Volume</div>
                        </div>
                    </Card>

                    <Card className={styles.kpiCard} padding="small">
                        <div className={styles.kpiHeader}>
                            <div className={`${styles.iconBox} ${styles.orange}`}>
                                <Activity size={20} />
                            </div>
                            <span className={styles.badge}>
                                <Clock size={12} /> Real-time
                            </span>
                        </div>
                        <div className={styles.kpiContent}>
                            <div className={styles.kpiValue}>843</div>
                            <div className={styles.kpiLabel}>Active Sessions Now</div>
                        </div>
                    </Card>

                    <Card className={styles.kpiCard} padding="small">
                        <div className={styles.kpiHeader}>
                            <div className={`${styles.iconBox} ${styles.red}`}>
                                <ShieldCheck size={20} />
                            </div>
                            <span className={`${styles.badge} ${styles.warning}`}>
                                3 Alerts
                            </span>
                        </div>
                        <div className={styles.kpiContent}>
                            <div className={styles.kpiValue}>99.9%</div>
                            <div className={styles.kpiLabel}>System Health Score</div>
                        </div>
                    </Card>
                </div>

                {/* Charts Section */}
                <div className={styles.chartsGrid}>
                    <Card className={styles.chartCard} padding="large">
                        <div className={styles.chartHeader}>
                            <h3 className={styles.cardTitle}>Transaction Volume (24h)</h3>
                            <button className={styles.chartAction}>View Report</button>
                        </div>
                        <div className={styles.chartContainer}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={volumeData}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <Card className={styles.chartCard} padding="large">
                        <div className={styles.chartHeader}>
                            <h3 className={styles.cardTitle}>User Growth (7 Days)</h3>
                            <button className={styles.chartAction}>Details</button>
                        </div>
                        <div className={styles.chartContainer}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={userGrowthData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <Tooltip
                                        cursor={{ fill: '#f1f5f9' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="users" fill="#10b981" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                {/* Live Activity Feed */}
                <Card className={styles.activityCard} padding="large">
                    <div className={styles.chartHeader}>
                        <h3 className={styles.cardTitle}>System Activity Log</h3>
                        <button className={styles.chartAction}>View All Logs</button>
                    </div>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Event Type</th>
                                    <th>Description</th>
                                    <th>User</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><span className={styles.eventType}><Users size={14} /> Registration</span></td>
                                    <td>New user account created</td>
                                    <td className={styles.userCell}>John Doe</td>
                                    <td className={styles.timeCell}>2 mins ago</td>
                                    <td><span className={`${styles.statusBadge} ${styles.success}`}>Success</span></td>
                                </tr>
                                <tr>
                                    <td><span className={styles.eventType}><DollarSign size={14} /> Transfer</span></td>
                                    <td>High value transfer processed</td>
                                    <td className={styles.userCell}>Sarah Connor</td>
                                    <td className={styles.timeCell}>5 mins ago</td>
                                    <td><span className={`${styles.statusBadge} ${styles.success}`}>Completed</span></td>
                                </tr>
                                <tr>
                                    <td><span className={styles.eventType}><ShieldCheck size={14} /> Security</span></td>
                                    <td>Failed login attempt (IP Blocked)</td>
                                    <td className={styles.userCell}>Unknown</td>
                                    <td className={styles.timeCell}>12 mins ago</td>
                                    <td><span className={`${styles.statusBadge} ${styles.danger}`}>Blocked</span></td>
                                </tr>
                                <tr>
                                    <td><span className={styles.eventType}><Activity size={14} /> System</span></td>
                                    <td>Database backup completed</td>
                                    <td className={styles.userCell}>System</td>
                                    <td className={styles.timeCell}>1 hour ago</td>
                                    <td><span className={`${styles.statusBadge} ${styles.info}`}>Done</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </AdminLayout>
    );
}
