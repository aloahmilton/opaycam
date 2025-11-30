/**
 * OpayCam Color Palette
 * Based on brand identity guidelines
 * Ported from mobile app for web use
 */

export const colors = {
    // Primary Colors
    primary: '#FFC107', // Darker Yellow (Amber)
    primaryLight: '#FFECB3',
    primaryDark: '#FFA000',

    // Secondary Colors
    secondary: '#003366', // Deep Corporate Blue
    secondaryLight: '#0066CC',
    secondaryDark: '#001F3F',

    // Semantic Colors
    success: '#28A745',
    successLight: '#D4EDDA',
    warning: '#FFA500',
    warningLight: '#FFF3CD',
    error: '#DC3545',
    errorLight: '#F8D7DA',
    info: '#17A2B8',
    infoLight: '#D1ECF1',

    // Neutral Colors
    white: '#FFFFFF',
    black: '#000000',

    // Grays
    gray50: '#F9F9F9',
    gray100: '#F5F5F5',
    gray200: '#EEEEEE',
    gray300: '#E0E0E0',
    gray400: '#BDBDBD',
    gray500: '#9E9E9E',
    gray600: '#757575',
    gray700: '#616161',
    gray800: '#424242',
    gray900: '#212121',

    // UI Element Colors
    background: '#F5F5F5',
    surface: '#FFFFFF',
    border: '#E0E0E0',
    divider: '#EEEEEE',

    // Text Colors
    textPrimary: '#003366',
    textSecondary: '#666666',
    textDisabled: '#BDBDBD',
    textOnPrimary: '#FFFFFF',
    textOnSecondary: '#FFFFFF',

    // Gradient Colors
    gradientStart: '#003366',
    gradientEnd: '#004488',
} as const;

export type ColorName = keyof typeof colors;
