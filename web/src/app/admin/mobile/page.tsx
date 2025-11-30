'use client';

import { useState } from 'react';
import {
    Smartphone,
    Rocket,
    Bell,
    Plus,
    Edit2,
    Trash2,
    Send,
    CheckCircle,
    Clock
} from 'lucide-react';
import styles from './mobile.module.css';

// Mock Data for Features
const INITIAL_FEATURES = [
    {
        id: '1',
        title: 'Virtual Card',
        description: 'Create virtual debit cards for secure online shopping.',
        status: 'In Development',
        eta: 'Q1 2026',
        color: '#004F71'
    },
    {
        id: '2',
        title: 'Crypto Exchange',
        description: 'Buy, sell, and swap cryptocurrencies.',
        status: 'Planned',
        eta: 'Q2 2026',
        color: '#F7931A'
    }
];

// Mock Data for Notifications History
const NOTIFICATION_HISTORY = [
    {
        id: '1',
        title: 'System Maintenance',
        message: 'Scheduled maintenance on Dec 5th...',
        type: 'Alert',
        sentAt: '2025-11-29 10:00 AM',
        audience: 'All Users'
    },
    {
        id: '2',
        title: 'Welcome to Rewards',
        message: 'Earn points on every transaction!',
        type: 'Promo',
        sentAt: '2025-11-30 09:00 AM',
        audience: 'Active Users'
    }
];

export default function MobileAppManagement() {
    const [activeTab, setActiveTab] = useState<'roadmap' | 'notifications'>('roadmap');
    const [features, setFeatures] = useState(INITIAL_FEATURES);

    // Notification Form State
    const [notifTitle, setNotifTitle] = useState('');
    const [notifMessage, setNotifMessage] = useState('');
    const [notifType, setNotifType] = useState('Info');

    const handleSendNotification = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Notification Broadcasted!\nTitle: ${notifTitle}\nMessage: ${notifMessage}`);
        setNotifTitle('');
        setNotifMessage('');
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerIcon}>
                    <Smartphone size={32} color="#004F71" />
                </div>
                <div>
                    <h1 className={styles.title}>Mobile App Management</h1>
                    <p className={styles.subtitle}>Manage features, roadmap, and push notifications.</p>
                </div>
            </div>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'roadmap' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('roadmap')}
                >
                    <Rocket size={18} />
                    Feature Roadmap
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'notifications' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('notifications')}
                >
                    <Bell size={18} />
                    Notification Center
                </button>
            </div>

            <div className={styles.content}>
                {activeTab === 'roadmap' ? (
                    <div className={styles.roadmapSection}>
                        <div className={styles.sectionHeader}>
                            <h2>Active Roadmap</h2>
                            <button className={styles.primaryButton}>
                                <Plus size={18} />
                                Add Feature
                            </button>
                        </div>

                        <div className={styles.featuresGrid}>
                            {features.map(feature => (
                                <div key={feature.id} className={styles.featureCard}>
                                    <div className={styles.featureHeader}>
                                        <span className={styles.statusBadge} data-status={feature.status}>
                                            {feature.status}
                                        </span>
                                        <div className={styles.featureActions}>
                                            <button className={styles.iconButton}><Edit2 size={16} /></button>
                                            <button className={styles.iconButton}><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                                    <p className={styles.featureDesc}>{feature.description}</p>
                                    <div className={styles.featureMeta}>
                                        <Clock size={14} />
                                        <span>ETA: {feature.eta}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className={styles.notificationsSection}>
                        <div className={styles.composeCard}>
                            <h3>Compose Broadcast</h3>
                            <form onSubmit={handleSendNotification}>
                                <div className={styles.formGroup}>
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        value={notifTitle}
                                        onChange={(e) => setNotifTitle(e.target.value)}
                                        placeholder="e.g., New Feature Alert!"
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Message</label>
                                    <textarea
                                        value={notifMessage}
                                        onChange={(e) => setNotifMessage(e.target.value)}
                                        placeholder="Type your message here..."
                                        rows={3}
                                        required
                                    />
                                </div>
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label>Type</label>
                                        <select value={notifType} onChange={(e) => setNotifType(e.target.value)}>
                                            <option>Info</option>
                                            <option>Promo</option>
                                            <option>Alert</option>
                                            <option>System</option>
                                        </select>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Audience</label>
                                        <select disabled>
                                            <option>All Users</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className={styles.sendButton}>
                                    <Send size={18} />
                                    Send Broadcast
                                </button>
                            </form>
                        </div>

                        <div className={styles.historyCard}>
                            <h3>Recent Broadcasts</h3>
                            <div className={styles.historyList}>
                                {NOTIFICATION_HISTORY.map(item => (
                                    <div key={item.id} className={styles.historyItem}>
                                        <div className={styles.historyIcon}>
                                            <CheckCircle size={20} color="#22c55e" />
                                        </div>
                                        <div className={styles.historyContent}>
                                            <h4>{item.title}</h4>
                                            <p>{item.message}</p>
                                            <span className={styles.historyMeta}>
                                                {item.type} • {item.audience} • {item.sentAt}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
