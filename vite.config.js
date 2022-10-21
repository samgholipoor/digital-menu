import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  content: ["./src/**/*.{html,js,jsx}"],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  theme: {
    extend: {},
  },
  plugins: [react()]
})
