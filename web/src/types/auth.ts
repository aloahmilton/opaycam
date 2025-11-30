// Security types
export interface TransactionPIN {
    hash: string;
    createdAt: string;
    lastUsed?: string;
    failedAttempts: number;
    lockedUntil?: string;
}

export interface OTPData {
    code: string;
    expiresAt: string;
    attempts: number;
    method: 'sms' | 'email';
    verified: boolean;
}

export interface SecuritySettings {
    twoFactorEnabled: boolean;
    twoFactorMethod?: 'sms' | 'email' | 'authenticator';
    pinEnabled: boolean;
    trustedDevices: string[];
    lastPasswordChange?: string;
}

// Update User type to include security
export interface User {
    id: string;
    email: string;
    fullName: string;
    phone?: string;
    isVerified: boolean;
    createdAt: string;
    pin?: TransactionPIN;
    security: SecuritySettings;
    role: 'customer' | 'agent' | 'admin' | 'super_admin';
}

export interface LoginCredentials {
    email: string;
    password?: string;
    pin?: string;
}

export interface SignupData {
    fullName: string;
    email: string;
    phone: string;
    password?: string;
    pin?: string;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    signup: (data: SignupData) => Promise<void>;
    logout: () => void;
}
