import { configs } from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig(configs.recommended, prettierConfig, {
  files: ['**/*.ts', '**/*.tsx'],
  ignores: ['.next/', 'node_modules/'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: './tsconfig.json',
      sourceType: 'module',
    },
  },
  rules: {
    curly: 'error',
    'no-console': ['warn'],

    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
});
