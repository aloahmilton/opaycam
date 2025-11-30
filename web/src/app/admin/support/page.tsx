'use client';

import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { MessageSquare, Users, CheckCircle, Clock, AlertTriangle, Plus } from 'lucide-react';
import styles from './page.module.css';

type TicketStatus = 'open' | 'in_progress' | 'resolved';
type TicketPriority = 'low' | 'medium' | 'high';

interface Ticket {
    id: string;
    subject: string;
    user: string;
    status: TicketStatus;
    priority: TicketPriority;
    assignedTo: string;
    createdAt: string;
    lastUpdated: string;
}

export default function AdminSupportPage() {
    const [showNewTicket, setShowNewTicket] = useState(false);
    const [filterStatus, setFilterStatus] = useState<TicketStatus | 'all'>('all');

    const mockTickets: Ticket[] = [
        {
            id: 'TKT-001',
            subject: 'Unable to withdraw funds',
            user: 'John Doe (6XXXXXXXX)',
            status: 'open',
            priority: 'high',
            assignedTo: 'Unassigned',
            createdAt: '2 hours ago',
            lastUpdated: '2 hours ago',
        },
        {
            id: 'TKT-002',
            subject: 'KYC verification delay',
            user: 'Sarah Connor (6YYYYYYY)',
            status: 'in_progress',
            priority: 'medium',
            assignedTo: 'Admin Sarah',
            createdAt: '5 hours ago',
            lastUpdated: '1 hour ago',
        },
        {
            id: 'TKT-003',
            subject: 'Transaction failed but money deducted',
            user: 'Mike Smith (6ZZZZZZZ)',
            status: 'resolved',
            priority: 'high',
            assignedTo: 'Super Admin',
            createdAt: '1 day ago',
            lastUpdated: '6 hours ago',
        },
    ];

    const filteredTickets = filterStatus === 'all'
        ? mockTickets
        : mockTickets.filter(t => t.status === filterStatus);

    const statusCounts = {
        open: mockTickets.filter(t => t.status === 'open').length,
        in_progress: mockTickets.filter(t => t.status === 'in_progress').length,
        resolved: mockTickets.filter(t => t.status === 'resolved').length,
    };

    return (
        <AdminLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.pageTitle}>Support Center</h1>
                        <p className={styles.pageSubtitle}>Manage user support tickets and inquiries</p>
                    </div>
                    <Button variant="primary" onClick={() => setShowNewTicket(true)}>
                        <Plus size={18} /> New Ticket
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className={styles.statsGrid}>
                    <Card padding="medium" className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.open}`}>
                            <AlertTriangle size={20} />
                        </div>
                        <div className={styles.statContent}>
                            <span className={styles.statValue}>{statusCounts.open}</span>
                            <span className={styles.statLabel}>Open Tickets</span>
                        </div>
                    </Card>

                    <Card padding="medium" className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.progress}`}>
                            <Clock size={20} />
                        </div>
                        <div className={styles.statContent}>
                            <span className={styles.statValue}>{statusCounts.in_progress}</span>
                            <span className={styles.statLabel}>In Progress</span>
                        </div>
                    </Card>

                    <Card padding="medium" className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.resolved}`}>
                            <CheckCircle size={20} />
                        </div>
                        <div className={styles.statContent}>
                            <span className={styles.statValue}>{statusCounts.resolved}</span>
                            <span className={styles.statLabel}>Resolved</span>
                        </div>
                    </Card>
                </div>

                {/* Filter Tabs */}
                <div className={styles.filters}>
                    <button
                        className={`${styles.filterTab} ${filterStatus === 'all' ? styles.active : ''}`}
                        onClick={() => setFilterStatus('all')}
                    >
                        All Tickets
                    </button>
                    <button
                        className={`${styles.filterTab} ${filterStatus === 'open' ? styles.active : ''}`}
                        onClick={() => setFilterStatus('open')}
                    >
                        Open
                    </button>
                    <button
                        className={`${styles.filterTab} ${filterStatus === 'in_progress' ? styles.active : ''}`}
                        onClick={() => setFilterStatus('in_progress')}
                    >
                        In Progress
                    </button>
                    <button
                        className={`${styles.filterTab} ${filterStatus === 'resolved' ? styles.active : ''}`}
                        onClick={() => setFilterStatus('resolved')}
                    >
                        Resolved
                    </button>
                </div>

                {/* Tickets List */}
                <div className={styles.ticketsList}>
                    {filteredTickets.map((ticket) => (
                        <Card key={ticket.id} padding="medium" className={styles.ticketCard} hover>
                            <div className={styles.ticketHeader}>
                                <div className={styles.ticketInfo}>
                                    <span className={styles.ticketId}>{ticket.id}</span>
                                    <span className={styles.ticketSubject}>{ticket.subject}</span>
                                </div>
                                <span className={`${styles.statusBadge} ${styles[ticket.status]}`}>
                                    {ticket.status.replace('_', ' ')}
                                </span>
                            </div>

                            <div className={styles.ticketMeta}>
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>User:</span>
                                    <span className={styles.metaValue}>{ticket.user}</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>Priority:</span>
                                    <span className={`${styles.priorityBadge} ${styles[ticket.priority]}`}>
                                        {ticket.priority}
                                    </span>
                                </div>
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>Assigned:</span>
                                    <span className={styles.metaValue}>{ticket.assignedTo}</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>Updated:</span>
                                    <span className={styles.metaValue}>{ticket.lastUpdated}</span>
                                </div>
                            </div>

                            <div className={styles.ticketActions}>
                                <Button variant="outline" size="small">View Details</Button>
                                {ticket.status !== 'resolved' && (
                                    <Button variant="primary" size="small">Update Status</Button>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>

                {/* New Ticket Form */}
                {showNewTicket && (
                    <div className={styles.modal}>
                        <Card padding="large" className={styles.modalCard}>
                            <h3 className={styles.modalTitle}>Create New Ticket</h3>
                            <div className={styles.formGroup}>
                                <label>User ID or Phone</label>
                                <Input placeholder="e.g. USER123 or 6XXXXXXXX" />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Subject</label>
                                <Input placeholder="Brief description of the issue" />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Priority</label>
                                <select className={styles.select}>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Description</label>
                                <textarea className={styles.textarea} rows={4} placeholder="Full details of the issue..." />
                            </div>
                            <div className={styles.modalActions}>
                                <Button variant="outline" onClick={() => setShowNewTicket(false)}>Cancel</Button>
                                <Button variant="primary">Create Ticket</Button>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
