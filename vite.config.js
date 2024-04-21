/* eslint-env node */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
// https://vitejs.dev/config/

const { VITE_PORT, VITE_AUTH_ENDPOINT, VITE_PREDICT_ENDPOINT, VITE_LESSON_ENDPOINT } = process.env;

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
  define: {
    'import.meta.env.VITE_PORT': JSON.stringify(VITE_PORT),
    'import.meta.env.VITE_AUTH_ENDPOINT': JSON.stringify(VITE_AUTH_ENDPOINT),
    'import.meta.env.VITE_PREDICT_ENDPOINT': JSON.stringify(VITE_PREDICT_ENDPOINT),
    'import.meta.env.VITE_LESSON_ENDPOINT': JSON.stringify(VITE_LESSON_ENDPOINT),
  },
  optimizeDeps: {
    include: ['dotenv']
  }
});
