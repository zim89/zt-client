import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'
import { defineConfig, globalIgnores } from 'eslint/config'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // Base rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: false,
          args: 'after-used',
        },
      ],
      'no-console': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'error',

      // TypeScript strict rules
      '@typescript-eslint/no-explicit-any': 'error',

      // React best practices
      'react/jsx-key': 'error',

      // Code quality
      'prefer-const': 'error',
    },
  },
  // Override default ignores of eslint-config-next
  globalIgnores([
    'node_modules/**',
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
