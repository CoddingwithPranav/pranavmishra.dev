import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
  // Prettier configuration
  ...compat.config({
    extends: ['plugin:prettier/recommended'],
  }),
  {
    // Ensure Prettier rules are applied to all relevant files
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    rules: {
      'prettier/prettier': 'error',
    },
  },
];

export default eslintConfig;
