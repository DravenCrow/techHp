/// <reference types="vitest" />
import { defineConfig } from 'vite'
import {configDefaults} from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
    css: false,
    exclude: [...configDefaults.exclude, 'test-e2e']
  },
});
