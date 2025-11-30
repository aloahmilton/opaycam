import { SignupData, LoginCredentials } from '@/types/auth';

export const validateEmail = (email: string): string | null => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email';
    return null;
};

export const validatePassword = (password: string): string | null => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return null;
};

export const validatePhone = (phone: string): string | null => {
    if (!phone) return 'Phone number is required';
    const phoneRegex = /^[0-9]{9,15}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        return 'Please enter a valid phone number';
    }
    return null;
};

export const validateFullName = (name: string): string | null => {
    if (!name) return 'Full name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    return null;
};

export const validateLoginForm = (credentials: LoginCredentials): Record<string, string> => {
    const errors: Record<string, string> = {};

    const emailError = validateEmail(credentials.email);
    if (emailError) errors.email = emailError;

    const passwordError = validatePassword(credentials.password);
    if (passwordError) errors.password = passwordError;

    return errors;
};

export const validateSignupForm = (data: SignupData): Record<string, string> => {
    const errors: Record<string, string> = {};

    const nameError = validateFullName(data.fullName);
    if (nameError) errors.fullName = nameError;

    const emailError = validateEmail(data.email);
    if (emailError) errors.email = emailError;

    const phoneError = validatePhone(data.phone);
    if (phoneError) errors.phone = phoneError;

    const passwordError = validatePassword(data.password);
    if (passwordError) errors.password = passwordError;

    if (!data.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
    } else if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
};
