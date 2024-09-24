

import { defineConfig } from 'vite';
import { resolve } from 'path';
import Vue from '@vitejs/plugin-vue'

const config = () => {
  return {
    base: './',
    build: {
      rollupOptions: {
        external: ['lodash-es', 'axios', '@vue/composition-api'],
        output: {
          globals: {
            vue: 'Vue'
          }
        }
      },
      lib: {
        entry: resolve(__dirname, './index.ts'), // Update this to your actual entry file
        name: 'VFabricCore',
        fileName: 'index',
      },
      outDir: resolve(__dirname, './dist'), // Adjust this to your desired output
    },
    plugins: [Vue()],
    optimizeDeps: {
      include: ['vue']
    }
  };
};

export default defineConfig(config);
