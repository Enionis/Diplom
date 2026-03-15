import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    // Оптимизация размера бандла
    rollupOptions: {
      output: {
        manualChunks: {
          // Выносим React в отдельный чанк
          'react-vendor': ['react', 'react-dom'],
          // Выносим роутер в отдельный чанк
          'router-vendor': ['react-router-dom'],
          // Выносим иконки в отдельный чанк
          'icons-vendor': ['lucide-react'],
        },
      },
    },
    // Увеличиваем лимит предупреждения о размере чанка
    chunkSizeWarningLimit: 1000,
    // Минификация
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Убираем console.log в продакшене
        drop_debugger: true,
      },
    },
    // Оптимизация CSS
    cssMinify: true,
  },
  // Оптимизация для продакшена
  define: {
    __DEV__: false,
  },
});
