// Transaction types
export interface Transaction {
    id: string;
    type: 'send' | 'receive' | 'bill' | 'airtime' | 'savings';
    amount: number;
    currency: string;
    recipient?: string;
    sender?: string;
    description: string;
    status: 'pending' | 'completed' | 'failed' | 'cancelled';
    date: string;
    reference: string;
    fee?: number;
}

// Dashboard stats
export interface DashboardStats {
    balance: number;
    totalSent: number;
    totalReceived: number;
    pendingTransactions: number;
}

// Admin types
export interface AdminUser {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    balance: number;
    status: 'active' | 'blocked' | 'suspended';
    verified: boolean;
    registrationDate: string;
    lastLogin: string;
    totalTransactions: number;
}

export interface AdminStats {
    totalUsers: number;
    activeUsers: number;
    totalTransactions: number;
    totalRevenue: number;
    pendingTransactions: number;
    todayRevenue: number;
}

export interface ChartData {
    label: string;
    value: number;
}
