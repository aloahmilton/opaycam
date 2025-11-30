import { Transaction, DashboardStats } from '@/types/dashboard';

// Mock transaction data
export const mockTransactions: Transaction[] = [
    {
        id: 'TXN001',
        type: 'send',
        amount: 15000,
        currency: 'XAF',
        recipient: 'John Kamga',
        description: 'Payment for services',
        status: 'completed',
        date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        reference: 'REF-2024-001',
        fee: 0,
    },
    {
        id: 'TXN002',
        type: 'receive',
        amount: 25000,
        currency: 'XAF',
        sender: 'Marie Nsang',
        description: 'Refund',
        status: 'completed',
        date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        reference: 'REF-2024-002',
    },
    {
        id: 'TXN003',
        type: 'bill',
        amount: 5000,
        currency: 'XAF',
        recipient: 'ENEO',
        description: 'Electricity bill payment',
        status: 'completed',
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        reference: 'REF-2024-003',
        fee: 100,
    },
    {
        id: 'TXN004',
        type: 'airtime',
        amount: 2000,
        currency: 'XAF',
        recipient: 'MTN (+237 6XX XXX XXX)',
        description: 'Airtime recharge',
        status: 'completed',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        reference: 'REF-2024-004',
        fee: 0,
    },
    {
        id: 'TXN005',
        type: 'send',
        amount: 10000,
        currency: 'XAF',
        recipient: 'Paul Biya',
        description: 'Birthday gift',
        status: 'pending',
        date: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        reference: 'REF-2024-005',
        fee: 0,
    },
];

export const mockDashboardStats: DashboardStats = {
    balance: 45000,
    totalSent: 125000,
    totalReceived: 170000,
    pendingTransactions: 1,
};

// Format currency
export const formatCurrency = (amount: number, currency: string = 'XAF'): string => {
    return new Intl.NumberFormat('fr-CM', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
    }).format(amount);
};

// Format date
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
        return `${diffMins} min ago`;
    } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString('fr-CM', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }
};

// getTransactionIcon removed - use Lucide icons in components instead

// Get status color
export const getStatusColor = (status: Transaction['status']): string => {
    switch (status) {
        case 'completed': return 'var(--color-success)';
        case 'pending': return 'var(--color-warning)';
        case 'failed': return 'var(--color-error)';
        case 'cancelled': return 'var(--color-text-disabled)';
        default: return 'var(--color-text-primary)';
    }
};
