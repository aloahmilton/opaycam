'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthContextType, User, LoginCredentials, SignupData } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (credentials: LoginCredentials) => {
        setIsLoading(true);
        try {
            // TODO: Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock user data
            const mockUser: User = {
                id: '1',
                email: credentials.email,
                fullName: 'Demo User',
                isVerified: true,
                createdAt: new Date().toISOString(),
                role: 'customer',
                security: {
                    twoFactorEnabled: false,
                    pinEnabled: false,
                    trustedDevices: [],
                }
            };

            setUser(mockUser);
            localStorage.setItem('user', JSON.stringify(mockUser));
        } catch (error) {
            throw new Error('Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (data: SignupData) => {
        setIsLoading(true);
        try {
            // TODO: Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock user data
            const mockUser: User = {
                id: '1',
                email: data.email,
                fullName: data.fullName,
                phone: data.phone,
                isVerified: false,
                createdAt: new Date().toISOString(),
                role: 'customer',
                security: {
                    twoFactorEnabled: false,
                    pinEnabled: false,
                    trustedDevices: [],
                }
            };

            setUser(mockUser);
            localStorage.setItem('user', JSON.stringify(mockUser));
        } catch (error) {
            throw new Error('Signup failed');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                signup,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
