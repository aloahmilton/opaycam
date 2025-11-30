/**
 * OpayCam Typography System
 * Font family: Inter (via Google Fonts)
 * Ported from mobile app for web use
 */

export const typography = {
    // Font Families (web-compatible)
    fontFamily: {
        regular: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        medium: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        semiBold: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        bold: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },

    // Font Sizes (in pixels for web)
    fontSize: {
        h1: '32px',
        h2: '24px',
        h3: '20px',
        bodyLarge: '18px',
        body: '16px',
        bodySmall: '14px',
        caption: '12px',
        tiny: '10px',
    },

    // Font Weights
    fontWeight: {
        regular: 400,
        medium: 500,
        semiBold: 600,
        bold: 700,
    },

    // Line Heights (unitless for web)
    lineHeight: {
        h1: 1.25,    // 40px / 32px
        h2: 1.33,    // 32px / 24px
        h3: 1.4,     // 28px / 20px
        bodyLarge: 1.44, // 26px / 18px
        body: 1.5,   // 24px / 16px
        bodySmall: 1.43, // 20px / 14px
        caption: 1.33, // 16px / 12px
        tiny: 1.4,   // 14px / 10px
    },
} as const;

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'bodyLarge' | 'body' | 'bodySmall' | 'caption' | 'tiny';
