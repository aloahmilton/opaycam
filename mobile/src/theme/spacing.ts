/**
 * OpayCam Spacing System
 * Based on 8px grid system
 */

export const spacing = {
    xxs: 4,
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
    xxl: 64,
} as const;

/**
 * Border Radius values
 */
export const borderRadius = {
    small: 8,
    medium: 12,
    large: 16,
    xl: 20,
    xxl: 24,
    round: 9999,
} as const;

/**
 * Shadow/Elevation values
 */
export const shadows = {
    none: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },
    small: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    medium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
    },
    large: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 8,
    },
} as const;

/**
 * Common sizes for UI elements
 */
export const sizes = {
    touchTarget: 44, // Minimum touch target size
    iconSmall: 16,
    iconMedium: 24,
    iconLarge: 32,
    iconXL: 40,
    avatarSmall: 32,
    avatarMedium: 40,
    avatarLarge: 64,
    buttonHeight: 48,
    inputHeight: 48,
    tabBarHeight: 60,
} as const;

export type SpacingKey = keyof typeof spacing;
export type BorderRadiusKey = keyof typeof borderRadius;
export type ShadowKey = keyof typeof shadows;
