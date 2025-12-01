/**
 * OpayCam Typography System
 * Font family: Inter (with system font fallbacks)
 */

export const typography = {
    // Font Families
    fontFamily: {
        regular: 'Inter-Regular',
        medium: 'Inter-Medium',
        semiBold: 'Inter-SemiBold',
        bold: 'Inter-Bold',
    },

    // Font Sizes
    fontSize: {
        h1: 32,
        h2: 24,
        h3: 20,
        h4: 18,
        bodyLarge: 18,
        body: 16,
        bodySmall: 14,
        caption: 12,
        tiny: 10,
    },

    // Font Weights
    fontWeight: {
        regular: '400' as const,
        medium: '500' as const,
        semiBold: '600' as const,
        bold: '700' as const,
    },

    // Line Heights
    lineHeight: {
        h1: 40,
        h2: 32,
        h3: 28,
        h4: 26,
        bodyLarge: 26,
        body: 24,
        bodySmall: 20,
        caption: 16,
        tiny: 14,
    },

    // Text Variants (common combinations)
    variants: {
        h1: {
            fontSize: 32,
            lineHeight: 40,
            fontWeight: '700' as const,
        },
        h2: {
            fontSize: 24,
            lineHeight: 32,
            fontWeight: '700' as const,
        },
        h3: {
            fontSize: 20,
            lineHeight: 28,
            fontWeight: '600' as const,
        },
        h4: {
            fontSize: 18,
            lineHeight: 26,
            fontWeight: '600' as const,
        },
        bodyLarge: {
            fontSize: 18,
            lineHeight: 26,
            fontWeight: '400' as const,
        },
        body: {
            fontSize: 16,
            lineHeight: 24,
            fontWeight: '400' as const,
        },
        bodySmall: {
            fontSize: 14,
            lineHeight: 20,
            fontWeight: '400' as const,
        },
        caption: {
            fontSize: 12,
            lineHeight: 16,
            fontWeight: '400' as const,
        },
        button: {
            fontSize: 16,
            lineHeight: 24,
            fontWeight: '600' as const,
        },
    },
} as const;

export type TypographyVariant = keyof typeof typography.variants;
