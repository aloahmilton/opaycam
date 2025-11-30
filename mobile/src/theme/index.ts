/**
 * OpayCam Theme
 * Central export for all theme tokens
 */

import { colors } from './colors';
import { typography } from './typography';
import { spacing, borderRadius, shadows, sizes } from './spacing';

export const theme = {
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
    sizes,
} as const;

export type Theme = typeof theme;

// Re-export individual modules for convenience
export { colors, typography, spacing, borderRadius, shadows, sizes };
export * from './colors';
export * from './typography';
export * from './spacing';
