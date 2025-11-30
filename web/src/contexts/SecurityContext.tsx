'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { hashPIN, verifyPIN, generateOTP, sendOTP, validateOTP } from '@/lib/security';

interface SecurityContextType {
    isPinSet: boolean;
    setupPIN: (pin: string) => Promise<void>;
    verifyTransactionPIN: (pin: string) => Promise<boolean>;
    initiate2FA: (method: 'sms' | 'email') => Promise<string>; // Returns verification ID (mock)
    verify2FA: (code: string) => Promise<boolean>;
    setupVoiceID: () => Promise<void>;
    securitySettings: {
        twoFactorEnabled: boolean;
        biometricEnabled: boolean;
        voiceIdEnabled: boolean;
    };
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export function SecurityProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [storedPinHash, setStoredPinHash] = useState<string | null>(null); // In real app, this comes from backend
    const [currentOTP, setCurrentOTP] = useState<string | null>(null);
    const [otpExpiry, setOtpExpiry] = useState<Date | null>(null);

    const isPinSet = !!storedPinHash;

    const setupPIN = async (pin: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const hash = await hashPIN(pin);
        setStoredPinHash(hash);
        console.log('PIN set successfully');
    };

    const verifyTransactionPIN = async (pin: string): Promise<boolean> => {
        if (!storedPinHash) return false;
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        return verifyPIN(pin, storedPinHash);
    };

    const initiate2FA = async (method: 'sms' | 'email'): Promise<string> => {
        const code = generateOTP();
        const expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + 5); // 5 min expiry

        setCurrentOTP(code);
        setOtpExpiry(expiry);

        // Mock sending
        const recipient = method === 'sms' ? user?.phone || '+237...' : user?.email || 'user@example.com';
        await sendOTP(method, recipient, code);

        // In dev mode, log the OTP for testing
        console.log(`[MOCK SECURITY] Generated OTP: ${code}`);

        return 'mock-verification-id';
    };

    const verify2FA = async (code: string): Promise<boolean> => {
        if (!currentOTP || !otpExpiry) return false;

        const result = validateOTP(code, currentOTP, otpExpiry.toISOString());
        if (result.valid) {
            setCurrentOTP(null);
            setOtpExpiry(null);
            return true;
        }
        return false;
    };

    const [voiceIdEnabled, setVoiceIdEnabled] = useState(false);

    const setupVoiceID = async () => {
        // Simulate API call for voice enrollment
        await new Promise(resolve => setTimeout(resolve, 2000));
        setVoiceIdEnabled(true);
        console.log('Voice ID enrolled successfully');
    };

    const value = {
        isPinSet,
        setupPIN,
        verifyTransactionPIN,
        initiate2FA,
        verify2FA,
        setupVoiceID,
        securitySettings: {
            twoFactorEnabled: true,
            biometricEnabled: false,
            voiceIdEnabled,
        },
    };

    return (
        <SecurityContext.Provider value={value}>
            {children}
        </SecurityContext.Provider>
    );
}

export function useSecurity() {
    const context = useContext(SecurityContext);
    if (context === undefined) {
        throw new Error('useSecurity must be used within a SecurityProvider');
    }
    return context;
}
