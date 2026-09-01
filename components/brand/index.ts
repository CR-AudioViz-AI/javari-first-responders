/**
 * CR AudioViz AI Brand System
 * 
 * Export all brand components and configurations.
 * Usage: import { BrandedHeader, ThemeProvider } from '@/components/brand';
 */

// Configuration
export { default as brandConfig, BRAND_COLORS, THEME_CONFIG, TYPOGRAPHY, SPACING, LOGO_SPECS, CREDITS_CONFIG, APP_LOGO_STATUS } from './brand-config';

// Theme
export { ThemeProvider, useTheme } from './ThemeProvider';
export { ThemeToggle } from './ThemeToggle';

// Components
export { BrandedHeader } from './BrandedHeader';
export { BrandedFooter } from './BrandedFooter';
export { CreditsBar } from './CreditsBar';
export { AuthButtons } from './AuthButtons';

// Tailwind config extension
// 2026-09-01: REMOVED — './tailwind.brand.config' does not exist in this repo.
// Fourth repo with this line; the brand folder was copied and the file it names was
// not. Nothing imports tailwindBrandConfig.
