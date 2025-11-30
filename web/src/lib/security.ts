// OTP Generation and Verification

export const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const hashPIN = async (pin: string): Promise<string> => {
    // In production, use bcrypt or argon2
    // For now, simple encoding (NOT SECURE - replace with bcrypt)
    const encoder = new TextEncoder();
    const data = encoder.encode(pin);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const verifyPIN = async (pin: string, hash: string): Promise<boolean> => {
    const pinHash = await hashPIN(pin);
    return pinHash === hash;
};

export const sendOTP = async (
    method: 'sms' | 'email',
    recipient: string,
    code: string
): Promise<boolean> => {
    // Mock implementation - In production, integrate with SMS/Email service
    console.log(`Sending OTP ${code} via ${method} to ${recipient}`);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Always succeed in mock
    return true;
};

export const validateOTP = (
    inputCode: string,
    storedCode: string,
    expiresAt: string
): { valid: boolean; reason?: string } => {
    const now = new Date();
    const expiry = new Date(expiresAt);

    if (now > expiry) {
        return { valid: false, reason: 'OTP has expired' };
    }

    if (inputCode !== storedCode) {
        return { valid: false, reason: 'Invalid OTP code' };
    }

    return { valid: true };
};

// Transaction risk assessment
export interface RiskAssessment {
    level: 'low' | 'medium' | 'high' | 'critical';
    score: number;
    factors: string[];
    requiresOTP: boolean;
    requiresPIN: boolean;
    requiresApproval: boolean;
}

export const assessTransactionRisk = (
    amount: number,
    userVerified: boolean,
    newDevice: boolean = false,
    unusualLocation: boolean = false
): RiskAssessment => {
    let score = 0;
    const factors: string[] = [];

    // Amount-based risk
    if (amount > 500000) {
        score += 40;
        factors.push('Very high amount');
    } else if (amount > 100000) {
        score += 25;
        factors.push('High amount');
    } else if (amount > 50000) {
        score += 15;
        factors.push('Medium amount');
    } else if (amount > 10000) {
        score += 5;
        factors.push('Low amount');
    }

    // User verification status
    if (!userVerified) {
        score += 20;
        factors.push('Unverified user');
    }

    // Device and location
    if (newDevice) {
        score += 15;
        factors.push('New device');
    }

    if (unusualLocation) {
        score += 10;
        factors.push('Unusual location');
    }

    // Determine risk level
    let level: RiskAssessment['level'];
    if (score >= 60) level = 'critical';
    else if (score >= 40) level = 'high';
    else if (score >= 20) level = 'medium';
    else level = 'low';

    // Security requirements based on risk
    const requiresOTP = score >= 20;
    const requiresPIN = amount > 50000;
    const requiresApproval = score >= 60;

    return {
        level,
        score,
        factors,
        requiresOTP,
        requiresPIN,
        requiresApproval,
    };
};

// Validate transaction limits
export interface TransactionLimits {
    dailyLimit: number;
    weeklyLimit: number;
    monthlyLimit: number;
    perTransactionLimit: number;
}

export const checkTransactionLimits = (
    amount: number,
    dailyTotal: number,
    weeklyTotal: number,
    monthlyTotal: number,
    limits: TransactionLimits
): { allowed: boolean; reason?: string } => {
    if (amount > limits.perTransactionLimit) {
        return {
            allowed: false,
            reason: `Transaction exceeds per-transaction limit of ${limits.perTransactionLimit} XAF`,
        };
    }

    if (dailyTotal + amount > limits.dailyLimit) {
        return {
            allowed: false,
            reason: `Would exceed daily limit of ${limits.dailyLimit} XAF`,
        };
    }

    if (weeklyTotal + amount > limits.weeklyLimit) {
        return {
            allowed: false,
            reason: `Would exceed weekly limit of ${limits.weeklyLimit} XAF`,
        };
    }

    if (monthlyTotal + amount > limits.monthlyLimit) {
        return {
            allowed: false,
            reason: `Would exceed monthly limit of ${limits.monthlyLimit} XAF`,
        };
    }

    return { allowed: true };
};

// Default limits
export const DEFAULT_LIMITS: {
    verified: TransactionLimits;
    unverified: TransactionLimits;
} = {
    verified: {
        dailyLimit: 500000,
        weeklyLimit: 2000000,
        monthlyLimit: 5000000,
        perTransactionLimit: 500000,
    },
    unverified: {
        dailyLimit: 50000,
        weeklyLimit: 200000,
        monthlyLimit: 500000,
        perTransactionLimit: 50000,
    },
};
