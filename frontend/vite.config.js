import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { boneyardPlugin } from 'boneyard-js/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    boneyardPlugin({
      framework: 'react',
      out: './src/bones',
      routes: ['/', '/about', '/contact', '/cart', '/collection', '/login', '/orders', '/place-order', '/verify'],
    }),
  ],
  server : {port : 5173}
})
