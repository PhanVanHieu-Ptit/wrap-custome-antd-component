import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'storybook-static', 'node_modules'] },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/consistent-type-imports': 'error',
      'no-restricted-exports': ['error', { restrictDefaultExports: { direct: true } }],
    },
  },
  // Storybook meta files must default-export.
  { files: ['**/*.stories.tsx', '.storybook/*', '*.config.{ts,js}'], rules: { 'no-restricted-exports': 'off' } },
);
