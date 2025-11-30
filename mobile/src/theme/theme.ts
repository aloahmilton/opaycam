import { colors as baseColors } from './colors';

export type ThemeType = 'light' | 'dark' | 'system';

export interface ThemeColors {
    // Base
    background: string;
    surface: string;
    surfaceHighlight: string;

    // Text
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    textInverse: string;

    // Brand
    primary: string;
    secondary: string;

    // Semantic
    success: string;
    error: string;
    warning: string;
    info: string;

    // UI
    border: string;
    divider: string;
    inputBackground: string;

    // Status Bar
    statusBar: 'light' | 'dark';
}

export const lightTheme: ThemeColors = {
    background: baseColors.gray50,
    surface: baseColors.white,
    surfaceHighlight: baseColors.gray100,

    textPrimary: baseColors.gray900,
    textSecondary: baseColors.gray600,
    textTertiary: baseColors.gray400,
    textInverse: baseColors.white,

    primary: baseColors.primary,
    secondary: baseColors.secondary,

    success: baseColors.success,
    error: baseColors.error,
    warning: baseColors.warning,
    info: baseColors.info,

    border: baseColors.gray200,
    divider: baseColors.gray100,
    inputBackground: baseColors.white,

    statusBar: 'dark',
};

export const darkTheme: ThemeColors = {
    background: baseColors.gray900, // #0f172a
    surface: baseColors.gray800,    // #1e293b
    surfaceHighlight: baseColors.gray700, // #334155

    textPrimary: baseColors.gray50, // #f8fafc
    textSecondary: baseColors.gray400, // #94a3b8
    textTertiary: baseColors.gray500, // #64748b
    textInverse: baseColors.gray900,

    primary: baseColors.primary, // Yellow stays yellow (good contrast on dark?) Maybe adjust
    secondary: baseColors.secondaryLight, // Lighter blue for dark mode visibility

    success: baseColors.successLight, // Lighter green
    error: baseColors.errorLight,     // Lighter red
    warning: baseColors.warningLight, // Lighter orange
    info: baseColors.infoLight,       // Lighter blue

    border: baseColors.gray700,
    divider: baseColors.gray800,
    inputBackground: baseColors.gray800,

    statusBar: 'light',
};
