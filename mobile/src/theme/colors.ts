/**
 * OpayCam Color Palette
 * Enterprise-grade professional theme
 * Synced with Web Dashboard
 */

export const colors = {
  // Primary Colors (MTN MoMo Yellow)
  primary: '#FFCC00',
  primaryLight: '#FFD633',
  primaryDark: '#E6B800',

  // Secondary Colors (MTN Dark Blue)
  secondary: '#004F71',
  secondaryLight: '#006691',
  secondaryDark: '#003852',

  // Semantic Colors
  success: '#059669',
  successLight: '#6ee7b7',
  warning: '#d97706',
  warningLight: '#fcd34d',
  error: '#dc2626',
  errorLight: '#fca5a5',
  info: '#0891b2',
  infoLight: '#67e8f9',

  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',

  // Grays (Slate Scale)
  gray50: '#f8fafc',
  gray100: '#f1f5f9',
  gray200: '#e2e8f0',
  gray300: '#cbd5e1',
  gray400: '#94a3b8',
  gray500: '#64748b',
  gray600: '#475569',
  gray700: '#334155',
  gray800: '#1e293b',
  gray900: '#0f172a',

  // UI Element Colors
  background: '#f8fafc',
  surface: '#FFFFFF',
  border: '#e2e8f0',
  divider: '#f1f5f9',

  // Text Colors
  textPrimary: '#0f172a',
  textSecondary: '#64748b',
  textDisabled: '#cbd5e1',
  textOnPrimary: '#000000', // Black text on Yellow background
  textOnSecondary: '#FFFFFF',

  // Gradient Colors (Yellow to Warm Yellow)
  gradientStart: '#FFCC00',
  gradientEnd: '#FDB913',
} as const;

export type ColorName = keyof typeof colors;
