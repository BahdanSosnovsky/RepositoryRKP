import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      // Разрешаем синтаксис JSX
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },
  {
    // server/ работает в Node.js, а не в браузере
    files: ['server/**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
])
