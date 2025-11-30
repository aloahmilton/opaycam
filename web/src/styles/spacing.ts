/**
 * OpayCam Spacing System
 * Based on 8px grid system
 * Ported from mobile app for web use
 */

export const spacing = {
    xxs: '4px',
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '48px',
    xxl: '64px',
} as const;

/**
 * Border Radius values
 */
export const borderRadius = {
    small: '8px',
    medium: '12px',
    large: '16px',
    xl: '20px',
    xxl: '24px',
    round: '9999px',
} as const;

/**
 * Shadow/Elevation values (CSS box-shadow)
 */
export const shadows = {
    none: 'none',
    small: '0 2px 3px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.15)',
    large: '0 8px 10px rgba(0, 0, 0, 0.2)',
} as const;

/**
 * Common sizes for UI elements
 */
export const sizes = {
    touchTarget: '44px', // Minimum touch target size
    iconSmall: '16px',
    iconMedium: '24px',
    iconLarge: '32px',
    iconXL: '40px',
    avatarSmall: '32px',
    avatarMedium: '40px',
    avatarLarge: '64px',
    buttonHeight: '48px',
    inputHeight: '48px',
    tabBarHeight: '60px',
} as const;

export type SpacingKey = keyof typeof spacing;
export type BorderRadiusKey = keyof typeof borderRadius;
export type ShadowKey = keyof typeof shadows;
