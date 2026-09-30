// vite.config.js — настройки сборщика Vite.
import react from '@vitejs/plugin-react' // плагин, который учит Vite понимать JSX и включает быстрое обновление страницы (HMR)
import { defineConfig } from 'vite' // вспомогательная функция для подсказок в редакторе

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], // подключаем React-плагин
})
