import { primitiveTokens } from './primitive';

export const semanticTokens = {
  light: {
    background: primitiveTokens.colors.white,
    foreground: primitiveTokens.colors.gray[900],
    muted: primitiveTokens.colors.gray[500],
    border: primitiveTokens.colors.gray[200],
    primary: primitiveTokens.colors.blue[600],
  },
  dark: {
    background: '#121212',
    foreground: primitiveTokens.colors.white,
    muted: primitiveTokens.colors.gray[500],
    border: '#333333',
    primary: '#4DA6FF',
  },
} as const;

export type SemanticTokens = typeof semanticTokens;
