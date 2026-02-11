import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import unusedImports from 'eslint-plugin-unused-imports'
import perfectionist from 'eslint-plugin-perfectionist'
import { defineConfig } from 'eslint/config'
import prettier from 'eslint-config-prettier'

export default defineConfig([
  {
    files: ['**/*.{ts,tsx}'],

    plugins: {
      import: importPlugin,
      'unused-imports': unusedImports,
      perfectionist: perfectionist,
    },

    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettier,
    ],

    rules: {
      'unused-imports/no-unused-imports': 'error',

      'import/order': [
        'warn',
        { 'newlines-between': 'always' },
      ],

      'perfectionist/sort-imports': [
        'warn',
        { type: 'natural', order: 'asc' },
      ],
    },
  },
])
