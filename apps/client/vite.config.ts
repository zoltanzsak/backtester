import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

export default defineConfig({
  plugins: [
    //@ts-ignore - TODO
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    //@ts-ignore - TODO
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
});
