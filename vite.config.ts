import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/Devpost-AI-Lingo/",
  server: {
    host: '127.0.0.1',
    // port: 5185, // let Vite choose a free port
    hmr: false,
  },
})
