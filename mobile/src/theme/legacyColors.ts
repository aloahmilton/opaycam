import { ThemeColors } from './theme';
import { colors as baseColors } from './colors';

/**
 * Extends the base ThemeColors with legacy colour keys used throughout the codebase.
 * This allows existing components that reference `colors.white`, `colors.gray400`, etc.
 * to continue working while still pulling values from the current theme.
 */
export interface LegacyThemeColors extends ThemeColors {
    // Basic colors
    white: string;
    black: string;

    // Gray scale
    gray50: string;
    gray100: string;
    gray200: string;
    gray300: string;
    gray400: string;
    gray500: string;
    gray600: string;
    gray700: string;
    gray800: string;
    gray900: string;

    // Light variations for semantic colors
    successLight: string;
    errorLight: string;
    warningLight: string;
    infoLight: string;

    // Primary variations
    primaryLight: string;
    primaryDark: string;

    // Secondary variations
    secondaryLight: string;
    secondaryDark: string;
}

/**
 * Maps legacy colour keys to the appropriate values from the supplied theme.
 */
export const legacyColors = (theme: ThemeColors): LegacyThemeColors => ({
    ...theme,

    // Basic colors - use base colors as they're theme-agnostic
    white: baseColors.white,
    black: baseColors.black,

    // Gray scale - use base colors directly
    gray50: baseColors.gray50,
    gray100: baseColors.gray100,
    gray200: baseColors.gray200,
    gray300: baseColors.gray300,
    gray400: baseColors.gray400,
    gray500: baseColors.gray500,
    gray600: baseColors.gray600,
    gray700: baseColors.gray700,
    gray800: baseColors.gray800,
    gray900: baseColors.gray900,

    // Light variations for semantic colors
    successLight: baseColors.successLight,
    errorLight: baseColors.errorLight,
    warningLight: baseColors.warningLight,
    infoLight: baseColors.infoLight,

    // Primary variations
    primaryLight: baseColors.primaryLight,
    primaryDark: baseColors.primaryDark,

    // Secondary variations
    secondaryLight: baseColors.secondaryLight,
    secondaryDark: baseColors.secondaryDark,
});
